# Full Source Audit Report

Date: 2026-06-08  
Reviewer: Codex static audit  
Repository root: `/Users/ngoquangduc/Desktop/EM`

## 1. Executive Summary

This repository is a two-part system:

- A `FastAPI` backend for document ingestion, vector search, and chat.
- A static `Vanilla JS` frontend for the public website and a separate admin dashboard.

The codebase is readable and modular enough for an MVP, but it is not yet hardened as a production-grade system for sensitive content or steady admin operations.

Top conclusions:

- Security posture is acceptable for a prototype, but there are important gaps around public data exposure, admin authentication, and prompt-injection resilience.
- Data integrity and operational resilience are weaker than security. The current RAG persistence model, lack of rollback semantics, and near-zero automated coverage make regressions or partial failures likely.
- UI quality is generally strong on the public site, especially in overall visual direction and theming intent, but dark mode consistency and accessibility are uneven.
- Documentation, environment contracts, and dependency hygiene have started to drift away from the actual implementation.

Overall maturity scores:

| Area | Score | Notes |
|---|---:|---|
| Security | 6/10 | Reasonable basics, but important architectural gaps remain |
| Data integrity / reliability | 4.5/10 | Highest-risk area after public data exposure |
| UI / UX | 7/10 | Public site is polished; admin and dark-mode consistency lag |
| Accessibility | 5.5/10 | Some ARIA work exists, but custom cursor and motion choices hurt usability |
| Maintainability | 6/10 | Good modularization, but drift, dead code, and missing tests reduce confidence |
| Operational readiness | 4.5/10 | Minimal observability, unclear persistence guarantees, stale setup docs |

## 2. Scope And Coverage

This audit reviewed all text source files currently present in the repository, including:

- Backend application code under `backend/app`
- Backend tests under `backend/tests`
- Frontend public website code under `frontend/website`
- Frontend admin dashboard code under `frontend/admin`
- Top-level build/runtime config such as `Dockerfile`, `requirements.txt`, `.gitignore`
- Existing repository docs under `docs/`

What was not fully audited:

- Binary image assets were reviewed by filenames, placement, and source references, not by visual/pixel analysis.
- No runtime penetration test, load test, or browser-based visual regression was performed in this pass.
- No external infrastructure settings on Railway/Vercel were inspected directly.

## 3. Methodology

This report is based on static source review, config review, dependency review, and code-path inspection.

Primary review lenses:

- Security
- Data integrity and consistency
- Error handling and resilience
- UI/UX and dark mode consistency
- Accessibility
- Maintainability and dead code
- Deployment and operational readiness

## 4. System Overview

### 4.1 Backend

Key implementation points:

- App entry and middleware: `backend/app/main.py`
- Document ingestion and admin-only operations: `backend/app/api/routes/documents.py`
- Public chat endpoint: `backend/app/api/routes/chat.py`
- RAG orchestration: `backend/app/services/rag_engine.py`
- Vector storage: `backend/app/services/vector_store.py`
- LLM integration: `backend/app/services/llm.py`
- Embeddings: `backend/app/services/embedding.py`
- File processors: `backend/app/processors/*`

Important architectural properties:

- Public chat is open; document management is guarded by a shared admin key.
- ChromaDB uses local persistent storage from `CHROMA_PERSIST_DIR`.
- OpenAI is called directly for embeddings and final answer generation.

### 4.2 Frontend

Public website:

- Static HTML entry: `frontend/website/index.html`
- App bootstrap: `frontend/website/app.js`
- Components: `frontend/website/components/*`
- Theme tokens: `frontend/website/styles/variables.css`

Admin dashboard:

- Static HTML entry: `frontend/admin/index.html`
- Logic: `frontend/admin/script.js`
- Styling: `frontend/admin/style.css`

Important architectural properties:

- Public site uses a custom dark mode and multiple interactive components.
- Admin dashboard stores the admin key in session storage and talks directly to the backend API.
- Both frontends load third-party assets from CDNs.

## 5. Findings Summary

### Severity counts

| Severity | Count |
|---|---:|
| High | 3 |
| Medium | 10 |
| Low | 8 |
| Info | 5 |

### Highest-priority items

1. Public chat endpoint leaks retrieved source chunks to any caller.
2. Retrieved documents are injected into LLM context without clear prompt-injection defenses.
3. Ingestion has no rollback boundary, so partial document writes are possible.
4. Admin authentication is only a shared static key, and that key is cached in browser session storage.
5. Persistence, setup docs, and environment contracts are inconsistent enough to threaten reliability.

## 6. Detailed Findings

### F-01: Public Chat API Can Be Used To Extract Uploaded Documents

- Severity: `High`
- Category: `Security / Privacy / Data exposure`

Evidence:

- `backend/app/api/routes/chat.py:15-18`
- `backend/app/services/rag_engine.py:47-60`
- `backend/app/services/vector_store.py:22-35`
- `backend/app/schemas/chat.py:15-17`

What is happening:

- The public chat endpoint returns both the generated answer and the raw retrieved source chunks.
- Those source chunks include chunk text from uploaded documents.
- Any unauthenticated caller can repeatedly probe the API and accumulate document content over time.

Why this matters:

- This is the single largest confidentiality risk in the current design.
- Even if the LLM answer were safe, the `sources` field itself becomes a document exfiltration channel.

Recommendation:

- Do not return raw chunk text to public clients.
- If source attribution is needed, return document IDs and sanitized excerpts only.
- Consider a server-side policy layer that strips sensitive chunks or disables `sources` in public mode.

### F-02: Retrieved Documents Are Trusted Too Much Inside The Prompt

- Severity: `High`
- Category: `LLM security / Prompt injection`

Evidence:

- `backend/app/services/rag_engine.py:49-55`
- `backend/app/services/llm.py:14-83`
- `frontend/website/components/ChatWidget.js:142-203`

What is happening:

- Retrieved chunk text is concatenated directly into the prompt context.
- The system prompt does not strongly instruct the model to ignore instructions embedded in retrieved documents.
- The frontend also forwards formatted conversation history, which increases prompt complexity and attack surface.

Why this matters:

- A malicious uploaded document can inject instructions such as overriding answer policy, fabricating contact details, or biasing outputs.
- In a RAG system, prompt injection is not hypothetical; it is a standard threat model.

Recommendation:

- Add explicit system-level instructions that retrieved text is untrusted reference material, not instructions.
- Separate user question, system policy, and retrieved context with stronger structured delimiters.
- Consider content scanning or allowlisting for admin-uploaded documents.

### F-03: Ingestion Is Non-Atomic And Can Leave Partial Documents Behind

- Severity: `High`
- Category: `Data integrity`

Evidence:

- `backend/app/services/rag_engine.py:15-39`
- `backend/app/services/vector_store.py:12-20`

What is happening:

- Ingestion loops chunk-by-chunk and upserts each chunk individually.
- If embedding or Chroma insertion fails midway, earlier chunks remain stored.
- There is no compensating delete or rollback behavior tied to `doc_id`.

Why this matters:

- A failed upload can still create a logically corrupted document with only some chunks present.
- Search results may later include incomplete or misleading content that looks valid.

Recommendation:

- Stage all chunk work first, then commit as one logical unit where possible.
- On failure, delete all chunks written for the current `doc_id`.
- Record ingest status explicitly so only fully-complete documents are visible to users.

### F-04: Admin Authentication Is A Single Shared Secret

- Severity: `Medium`
- Category: `Security / Access control`

Evidence:

- `backend/app/api/routes/documents.py:29-32`
- `frontend/admin/index.html:202-219`
- `frontend/admin/script.js:19-25`

What is happening:

- Admin operations are protected only by one static `X-Admin-Key`.
- There is no per-user identity, no session expiry, no audit log, and no rotation strategy visible in code.

Why this matters:

- Once the key leaks, every admin-capable action is compromised.
- There is no attribution for who uploaded, viewed, or deleted documents.

Recommendation:

- Replace with real authentication: JWT session, OAuth, or at minimum a signed short-lived admin token.
- Add per-user identity and server-side audit logging for admin actions.

### F-05: Admin Key Is Cached In `sessionStorage`

- Severity: `Medium`
- Category: `Security / Frontend secret handling`

Evidence:

- `frontend/admin/script.js:19-25`
- `frontend/admin/script.js:61`
- `frontend/admin/script.js:69-73`

What is happening:

- The admin key is stored in clear text in `sessionStorage`.

Why this matters:

- Any JavaScript that runs on the same origin can read it.
- If the admin site ever suffers XSS or third-party script compromise, the key is exposed immediately.

Recommendation:

- Avoid storing the raw admin secret in browser storage.
- Prefer server-issued short-lived tokens after successful auth.

### F-06: Frontend Security Headers And CSP Are Missing

- Severity: `Medium`
- Category: `Security hardening`

Evidence:

- Public site loads inline scripts in `frontend/website/index.html:18-37` and `frontend/website/index.html:506-521`
- Admin site loads CDN assets in `frontend/admin/index.html:8-18`
- No `vercel.json` or equivalent frontend header config exists in the repo root

What is happening:

- Backend sends some useful headers, but the static frontends have no visible CSP or frontend-specific header policy in versioned config.
- Admin also loads third-party assets with weaker integrity guarantees than the public site.

Why this matters:

- CSP is one of the most valuable browser-side defenses once a site grows interactive complexity.
- Current inline scripting also makes future CSP rollout harder.

Recommendation:

- Add explicit frontend header config with CSP, `Permissions-Policy`, and related security headers.
- Remove or minimize inline scripts and inline event handlers to make CSP practical.

### F-07: Persistence Guarantees Are Weak And Possibly Environment-Dependent

- Severity: `Medium`
- Category: `Data integrity / Operations`

Evidence:

- `backend/app/config.py:4-13`
- `backend/app/services/vector_store.py:7-10`
- `.gitignore:4`

What is happening:

- Chroma persists to `./data/chroma_db`.
- The code assumes filesystem persistence, but repository code alone does not prove a durable mounted volume exists in deployment.

Why this matters:

- Container recreation, misconfigured volume mounts, or accidental cleanup may wipe the vector store.
- The system has no backup, restore, or migration story visible in code.

Recommendation:

- Confirm mounted durable storage in deployment.
- Add backup/export routines and a restore playbook.
- Consider a more explicit persistence layer for production usage.

### F-08: Environment Contract And Setup Docs Are Out Of Sync

- Severity: `Medium`
- Category: `Reliability / Maintainability`

Evidence:

- `backend/.env.example:1-4`
- `backend/app/config.py:4-13`
- `backend/README.md:3-10`

What is happening:

- `.env.example` uses `CHROMA_PATH`, while application code reads `CHROMA_PERSIST_DIR`.
- `README` references `docker-compose up`, but there is no `docker-compose.yml`.
- `README` also lists `/api/v1/*` endpoints while real routes are `/api/*`.

Why this matters:

- New developers or deployers can boot a wrong environment or silently lose persistence.
- Drift between docs and reality is an operational risk, not just a documentation nit.

Recommendation:

- Update docs and examples to exactly match code.
- Add a startup validation check for required environment variables and known deprecated ones.

### F-09: Automated Test Coverage Is Essentially Missing

- Severity: `Medium`
- Category: `Quality / Reliability`

Evidence:

- `backend/tests/test_api.py` is empty
- `backend/tests/test_services.py` is empty
- `backend/tests/test_processors.py` is empty
- `backend/tests/test_rag_flow.py:1-35` is a script without assertions

What is happening:

- There is no meaningful automated verification for routes, processors, vector store behavior, or error handling.

Why this matters:

- Changes to chunking, prompt construction, upload validation, or deletion behavior can regress silently.
- High-confidence refactors are not realistic in the current state.

Recommendation:

- Add unit tests for processors, chunking, and prompt building.
- Add route tests for upload, list, content fetch, and delete.
- Add failure-path tests for partial ingest and OpenAI/Chroma exceptions.

### F-10: Upload Path Handles Entire File In Memory And Lacks Deep Validation

- Severity: `Medium`
- Category: `Security / Reliability`

Evidence:

- `backend/app/api/routes/documents.py:42-58`
- `backend/app/processors/pdf_processor.py:10-15`
- `backend/app/processors/docx_processor.py:10-12`

What is happening:

- Upload content is read fully into memory before size enforcement concludes.
- File validation is based on extension and MIME type only.
- Extractors parse untrusted files directly with no timeout, resource guard, or malware scanning.

Why this matters:

- Malformed PDFs/DOCX files can create expensive parsing behavior or processing failures.
- This is especially important for public-facing or semi-public admin surfaces.

Recommendation:

- Stream-check file size where possible.
- Add parser exception classification and timeout/circuit-breaking strategy.
- Consider antivirus or file-scanning if the admin surface expands beyond a tightly controlled group.

### F-11: LLM And Embedding Calls Lack Explicit Resilience Controls

- Severity: `Medium`
- Category: `Operations / Cost / Reliability`

Evidence:

- `backend/app/services/llm.py:76-83`
- `backend/app/services/embedding.py:10-23`
- `requirements.txt:1-15`

What is happening:

- OpenAI calls are made directly with no visible timeout, retry, cost cap, concurrency guard, or fallback behavior.

Why this matters:

- The system is vulnerable to slow upstream responses, noisy failures, and unpredictable cost spikes if traffic grows.

Recommendation:

- Add explicit request timeout and bounded retry policy.
- Add structured logging around latency and failure causes.
- Consider request budgeting, caching, or queued ingestion for larger documents.

### F-12: Public Chat Widget Dark Mode Is Visually Inconsistent

- Severity: `Medium`
- Category: `UI / UX / Dark mode`

Evidence:

- Theme tokens are defined in `frontend/website/styles/variables.css:15-134`
- Chat widget still hardcodes surfaces in `frontend/website/styles/chatWidget.css:274-340`
- Chat widget bootstrap is in `frontend/website/app.js:53-60`

What is happening:

- The site has a real theme token system, but the chat widget uses several hardcoded white backgrounds and gray text values.
- Assistant message bubbles, typing state, input area, and scrollbars remain light-themed even in dark mode.

Why this matters:

- The widget feels visually detached from the rest of the site.
- Some text, timestamp, and divider states become weak or inconsistent under dark mode expectations.

Recommendation:

- Refactor chat widget styles to consume the same theme variables as the rest of the website.
- Add dark-mode overrides for all hardcoded white and gray states.

### F-13: Admin Dashboard Has No Dark Mode Strategy

- Severity: `Medium`
- Category: `UI / UX`

Evidence:

- `frontend/admin/style.css:1-220`
- `frontend/admin/index.html:1-223`

What is happening:

- The admin dashboard is a separate design surface with no theme support.
- If dark mode is a product requirement, the admin experience currently does not participate at all.

Why this matters:

- Visual consistency across public/admin surfaces is broken.
- If admins work long sessions, the current bright dashboard may be a UX concern.

Recommendation:

- Decide whether admin should support dark mode.
- If yes, extract tokens and align its component styling strategy with the public site.

### F-14: Custom Cursor Degrades Accessibility And Expected Desktop Behavior

- Severity: `Medium`
- Category: `Accessibility`

Evidence:

- `frontend/website/styles/cursor.css:5-11`
- `frontend/website/components/Cursor.js:1-64`
- `frontend/website/app.js:50-51`

What is happening:

- The default cursor is hidden on desktop-sized layouts and replaced with a custom cursor/ring.
- There is no visible opt-out tied to accessibility preferences.

Why this matters:

- Custom cursors often reduce precision, familiarity, and usability.
- This may conflict with assistive workflows, screen magnification, or user preference expectations.

Recommendation:

- Make the custom cursor opt-in or disable it by default.
- At minimum, disable it for reduced-motion or accessibility preference cases.

### F-15: Inline Scripts And Inline Handlers Make Hardening Harder

- Severity: `Low`
- Category: `Security hardening / Maintainability`

Evidence:

- `frontend/website/index.html:18-37`
- `frontend/website/index.html:507-521`
- `frontend/admin/index.html:210-215`
- `frontend/website/components/Members.js:123-124`

What is happening:

- The repo uses inline scripts and inline event handlers in multiple places.

Why this matters:

- This is not a vulnerability by itself, but it complicates CSP rollout and makes behavior more distributed.

Recommendation:

- Move inline scripts and inline handlers into module JS.
- Keep HTML declarative and behavior centralized.

### F-16: Dead Or Drifted Frontend Code Exists

- Severity: `Low`
- Category: `Maintainability`

Evidence:

- `frontend/website/app.js:15,41`
- `frontend/website/components/Forms.js:14-97`
- Search review found no active `volunteerForm`, `newsletterForm`, `donateBtn`, `customAmount`, or `.amount-option` elements in current public HTML
- `frontend/website/components/BookExperience.js` exists but is not initialized from the public app bootstrap

What is happening:

- `Forms.js` is instantiated, but the corresponding DOM it expects is not present in the current public page.
- `BookExperience.js` exists as a large component but is not part of the boot sequence.

Why this matters:

- Dead code increases cognitive load and false confidence.
- It can also hide dormant security or UX issues that resurface later.

Recommendation:

- Remove, archive, or clearly fence unfinished/dead components.
- If they are intentionally staged for later, mark them as such in docs.

### F-17: Toast Rendering Is An XSS Footgun If Reused Incorrectly

- Severity: `Low`
- Category: `Security / Maintainability`

Evidence:

- `frontend/website/components/Toast.js:16-32`
- `frontend/website/components/Forms.js:49-78`

What is happening:

- Toast messages are injected with `innerHTML`.
- Current inputs mostly come from local code, and the form wiring is currently stale, so this is not an active exploit path today.

Why this matters:

- If future product code starts passing user-controlled strings into toast messages, this becomes an easy XSS path.

Recommendation:

- Render toast message text with `textContent`, or only allow sanitized/explicitly trusted HTML.

### F-18: Static Member Data References Missing Images And Placeholder People

- Severity: `Low`
- Category: `Content integrity / UX`

Evidence:

- `frontend/website/components/Members.js:39-54`
- Existing image inventory does not include `member5.jpg` or `member6.jpg`

What is happening:

- Two member entries point to files that do not exist and appear to be placeholder identities.

Why this matters:

- Broken or fake member content hurts trust and presentation quality.

Recommendation:

- Remove placeholders or replace them with final approved content and assets.

### F-19: Dependency Set Appears Broader Than Actual Usage

- Severity: `Low`
- Category: `Dependency hygiene`

Evidence:

- `requirements.txt:4-7`

What is happening:

- `langchain`, `langchain-community`, `langchain-groq`, and `langchain-openai` are present, but the current backend code path uses direct OpenAI SDK calls and a simple custom service layer.

Why this matters:

- Unused dependencies increase attack surface, build time, and maintenance burden.

Recommendation:

- Trim unused dependencies after verifying runtime needs.
- Pin only what the app actually uses.

### F-20: Dockerfile Contains Debug Build Steps

- Severity: `Info`
- Category: `Operations / Image hygiene`

Evidence:

- `Dockerfile:10-11`

What is happening:

- Build layers print workspace contents and app contents.

Why this matters:

- Not dangerous by itself, but unnecessary in stable production images.

Recommendation:

- Remove debug-only image build steps after deployment is stable.

## 7. Positive Observations

These are worth preserving:

- Backend uses explicit route separation and service layering.
- CORS is allowlisted rather than wildcarded in `backend/app/main.py:16-25`.
- Useful backend security headers are added in `backend/app/main.py:28-35`.
- Upload route enforces extension, MIME type, and max size in `backend/app/api/routes/documents.py:42-51`.
- Public site uses a coherent theme-token system in `frontend/website/styles/variables.css`.
- Public chat and admin chat both sanitize rendered markdown output with DOMPurify.
- Several interactive components include meaningful ARIA labels and keyboard escape handling.

## 8. UI / UX Deep Notes

### 8.1 Public website

Strengths:

- Strong visual identity and non-generic layout choices.
- Good use of theme tokens and component-based JS.
- Navigation, hero, cards, timeline, and detail pages show intentional design work.

Weaknesses:

- Dark mode coverage is incomplete.
- Custom cursor and aggressive motion choices will not work well for all users.
- Chat widget feels like a separate visual system instead of part of the site.

### 8.2 Admin dashboard

Strengths:

- Task flow is simple and understandable.
- Document upload, list, inspect, and chat are easy to discover.

Weaknesses:

- No dark mode support.
- Authentication UX is purely a key prompt with no trust signals beyond a modal.
- Security posture is hidden behind a simple UI, which may encourage risky operational assumptions.

### 8.3 Accessibility notes

Good:

- Multiple controls use `aria-label`.
- FAQ buttons expose `aria-expanded`.
- Several modals/lightboxes handle `Escape`.

Needs work:

- Native cursor suppression on desktop
- No obvious global reduced-motion strategy despite heavy animation use
- Chat widget contrast and timestamp legibility in theme variants

## 9. Data Integrity Deep Notes

This is the area that most needs structural improvement.

Primary concerns:

- Partial writes during ingest
- Unclear durable persistence guarantees
- No test-backed confidence in ingest/search/delete behavior
- No visible backup or recovery story
- No admin action audit log

Operationally, this means the system could appear to work while accumulating subtle inconsistencies.

## 10. Recommended Remediation Roadmap

### Phase 1: Immediate

- Remove raw source chunk text from public chat responses.
- Add stronger prompt-injection boundaries around retrieved context.
- Fix `.env.example` and `README` to match actual code.
- Add rollback/cleanup for failed ingests.
- Stop storing the raw admin key in `sessionStorage`.

### Phase 2: Short-term

- Add route tests and ingest failure-path tests.
- Add frontend CSP/header config.
- Add timeout/retry/logging wrappers around OpenAI calls.
- Normalize chat widget styles to theme tokens.
- Remove or quarantine dead code and placeholder member data.

### Phase 3: Medium-term

- Replace static admin key auth with real admin sessions.
- Add audit logs for upload/delete/view actions.
- Add backup/restore procedures for vector data.
- Revisit custom cursor and global motion behavior from an accessibility standpoint.

## 11. Coverage Appendix

Reviewed backend source:

- `backend/app/main.py`
- `backend/app/config.py`
- `backend/app/api/routes/chat.py`
- `backend/app/api/routes/documents.py`
- `backend/app/services/rag_engine.py`
- `backend/app/services/vector_store.py`
- `backend/app/services/llm.py`
- `backend/app/services/embedding.py`
- `backend/app/services/chunking.py`
- `backend/app/processors/*`
- `backend/app/schemas/*`

Reviewed backend support files:

- `backend/README.md`
- `backend/.env.example`
- `backend/tests/*`
- `requirements.txt`
- `Dockerfile`
- `.gitignore`

Reviewed frontend public site:

- `frontend/website/index.html`
- `frontend/website/project.html`
- `frontend/website/app.js`
- `frontend/website/project.js`
- `frontend/website/components/*`
- `frontend/website/styles/*`
- `frontend/website/data/activities.js`

Reviewed frontend admin:

- `frontend/admin/index.html`
- `frontend/admin/script.js`
- `frontend/admin/style.css`

Existing internal reference reviewed:

- `docs/security-and-scalability-analysis.md`

## 12. Final Assessment

This codebase is not careless. It shows clear effort, decent structure, and real product taste on the public-facing UI. The main issue is not “bad code everywhere”; it is that the project has crossed from prototype territory into a stage where architectural trust boundaries now matter.

If the next goal is safe production use, the most important upgrades are:

- tighten public data exposure,
- strengthen admin auth,
- harden ingestion consistency,
- restore documentation accuracy,
- and add enough automated coverage that future changes become trustworthy.
