# Báo Cáo Kiểm Tra Toàn Diện – Dự Án Cho EM
**Ngày kiểm tra:** 2026-06-09  
**Người kiểm tra:** Claude Code (Sonnet 4.6)  
**Phạm vi:** Toàn bộ hệ thống – Frontend Website, Admin Panel, Backend API  
**Trạng thái:** Chỉ phân tích – chưa sửa code

---

## Tổng Quan Hệ Thống

| Thành phần | Công nghệ | Trạng thái |
|---|---|---|
| Website chính | Vanilla JS (ES Modules), HTML, CSS | Hoạt động |
| Admin Dashboard | Vanilla JS, HTML | Hoạt động |
| Backend API | FastAPI (Python), ChromaDB, OpenAI | Hoạt động |
| Hosting Frontend | Vercel | Hoạt động |
| Hosting Backend | Railway | Hoạt động |
| Content Storage | GitHub (via API) | Hoạt động |

**Số file đã kiểm tra:** 50+ files (4 HTML, 21 CSS, 19+ JS components, 15 Python files, configs)

---

## Mục Lục

1. [🔐 Bảo Mật (Security)](#1-bảo-mật-security)
2. [🎨 UI/UX](#2-uiux)
3. [📱 Responsive / Mobile](#3-responsive--mobile)
4. [🌙 Dark Mode](#4-dark-mode)
5. [🎨 Màu Sắc & Design System](#5-màu-sắc--design-system)
6. [♿ Accessibility (A11y)](#6-accessibility-a11y)
7. [⚡ Performance](#7-performance)
8. [🔍 SEO](#8-seo)
9. [🧹 Code Quality](#9-code-quality)
10. [🏗️ Infrastructure & Backend](#10-infrastructure--backend)
11. [📋 Tóm Tắt Ưu Tiên](#11-tóm-tắt-ưu-tiên)

---

## 1. 🔐 Bảo Mật (Security)

### 🔴 CRITICAL

#### SEC-01: Chat API public tạo bề mặt abuse chi phí OpenAI trực tiếp
**Files:** `backend/app/api/routes/chat.py:15-19`, `backend/app/schemas/chat.py:4-7`, `frontend/website/app.js:58`, `frontend/website/components/ChatWidget.js:195-203`  
`POST /api/chat` là endpoint public thực sự: không auth, URL backend bị gọi trực tiếp từ frontend public, và request body cho phép caller tự điều khiển `formatted_prompt` (tới 20.000 ký tự) cùng `top_k` (tới 50). Điều này cho phép attacker không chỉ spam số lượng request mà còn cố tình đẩy chi phí/token usage trên mỗi request.
```python
@router.post("", response_model=ChatResponse)
@limiter.limit("20/minute")
async def chat(request: Request, chat_request: ChatRequest):
    result = rag.query(question=chat_request.question, top_k=chat_request.top_k, formatted_prompt=chat_request.formatted_prompt)
```
**Kết luận:** Mục này đúng bản chất và nên giữ ở `critical`, nhưng nên mô tả là **abuse/cost exposure** chứ không phải “thiếu auth” theo nghĩa truyền thống. Với chatbot public, không thể chỉ thêm một API key tĩnh ở frontend là xong.  
**Đề xuất:** Thêm lớp chống abuse phía edge/server như Turnstile, signed nonce, per-session quota, hạ trần `top_k`, và rate limit theo fingerprint/session thay vì chỉ IP.

#### SEC-02: Brute-force admin key có thể thực hiện trực tiếp ở backend, không chỉ qua UI
**Files:** `backend/app/api/routes/documents.py:80-82`, `backend/app/api/routes/content.py:69-78`, `frontend/admin/script.js:51-60`  
Vấn đề thật không nằm ở chuyện form login chưa lockout client-side, mà ở chỗ attacker có thể gọi thẳng các endpoint xác thực bằng `X-Admin-Key` để dò key. Hai endpoint dùng làm “probe” là `GET /api/documents` và `GET /api/content` đều yêu cầu admin key nhưng **không có rate limit**.
```python
@router.get("", response_model=list[DocumentInfo], dependencies=[Depends(verify_admin_key)])
async def list_documents():
    return rag.list_documents()

@router.get("", dependencies=[Depends(verify_admin_key)])
async def get_content():
    ...
```
**Kết luận:** Mục “không có brute-force protection” là đúng, nhưng report cũ gắn nhầm vào `frontend/admin/script.js`. Severity `critical` là hợp lý hơn nếu admin key là shared static secret dùng cho toàn bộ CMS.  
**Đề xuất:** Rate-limit ngay trên các endpoint auth probe, thêm delay/backoff server-side, logging số lần 401, và cân nhắc thay static key bằng short-lived credential.

#### SEC-03: CMS content được render bằng `innerHTML` trên site public, mở cửa cho stored XSS
**Files:** `frontend/website/components/ContentApplier.js:16,36,70-72,84-99,110-119,142-153`, `frontend/website/components/Mission.js:175-184`, `frontend/website/ungho-vat-chat.html:561-589`, `frontend/website/mua-banh.html:1036`, `frontend/website/vercel.json:11-12`  
Nhiều field từ `content.json` và `supportPages` được inject thẳng vào DOM bằng `innerHTML` mà không qua sanitization. Đồng thời CSP của website vẫn cho `script-src 'unsafe-inline'`, nên payload kiểu inline event handler có thể chạy nếu content bị cấy payload.
```javascript
if (subtitle) subtitle.innerHTML = `<strong>${hero.subtitle}</strong>`;
benefitsList.innerHTML = vol.benefits.map(b => `<li>${b}</li>`).join('');
document.getElementById('missionModalBody').innerHTML = data.sections.map(s => `
    <h4>${s.heading}</h4>
    ${s.content || ''}
`).join('');
```
**Kết luận:** Đây là lỗ hổng lớn mà report cũ bỏ sót. Nó cần được ưu tiên cao hơn SRI/CORS vì ảnh hưởng trực tiếp tới người dùng public nếu content source hoặc admin key bị lộ/abuse.  
**Đề xuất:** Chuyển các field text sang `textContent`; chỉ whitelist một số field cần rich text và sanitize bằng DOMPurify trước khi render.

### 🟡 HIGH

#### SEC-04: `dest_path` trong upload-image cho phép ghi file tùy ý vào repo
**File:** `backend/app/api/routes/content.py:100-136`  
`dest_path` được nhận trực tiếp từ form và truyền sang GitHub Contents API, không whitelist prefix/path. Đây không phải local path traversal, nhưng là **arbitrary repo write** trong branch deploy nếu attacker có admin key.
```python
async def upload_image(
    request: Request,
    file: UploadFile = File(...),
    dest_path: str = Form(...),
    image_type: str = Form("gallery"),
):
    sha = await get_file_sha(dest_path)
    await github_put_file(path=dest_path, ...)
```
**Tác động:** Có thể overwrite gần như mọi file trong repo bằng dữ liệu ảnh nén, gây deface/break production build.  
**Đề xuất:** Chỉ cho phép prefix `frontend/website/assets/images/` và validate extension đích tương ứng.

#### SEC-05: GitHub token backend có blast radius quá rộng
**File:** `backend/app/api/routes/content.py:17-20`  
```python
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")
GITHUB_REPO  = os.getenv("GITHUB_REPO", "")
GITHUB_BRANCH = os.getenv("GITHUB_BRANCH", "master")
```
Token GitHub đang được dùng để ghi trực tiếp lên branch deploy. Nếu Railway runtime hoặc admin path bị compromise, attacker có thể chỉnh nội dung production ở mức repo.  
**Đề xuất:** Dùng token scope tối thiểu, repo riêng cho content/assets, hoặc tách content storage khỏi source repo.

#### SEC-06: SRI bị thiếu không chỉ ở trang phụ mà cả admin dependencies
**Files:** `frontend/website/mua-banh.html:26`, `frontend/website/ungho-vat-chat.html:26`, `frontend/admin/index.html:9-15`  
Trang chủ có SRI cho Font Awesome/Marked/DOMPurify, nhưng hai support pages và admin dashboard vẫn load CDN assets mà không có `integrity`.  
**Kết luận:** Đây là vấn đề thật nhưng **không nên xếp critical**. Mức phù hợp hơn là `high` hoặc `medium` tùy threat model.  
**Đề xuất:** Đồng bộ SRI cho mọi CDN assets hoặc self-host các dependency này.

#### SEC-07: Admin key lưu trong JavaScript memory (in-memory)
**File:** `frontend/admin/script.js:19`  
```javascript
let _adminKey = '';
```
Admin key được lưu trong biến global JavaScript. Bất kỳ extension hoặc script nào chạy trong cùng tab đều có thể đọc `window._adminKey` (nếu bị expose) hoặc intercept qua DevTools.  
**Đề xuất:** Đây là acceptable nếu không expose ra window. Hiện tại code ok nhưng cần đảm bảo không có `window._adminKey = _adminKey`.

#### SEC-08: CORS `allow_methods` rộng hơn nhu cầu nhưng không phải lỗ hổng trọng yếu
**File:** `backend/app/main.py:20`  
```python
allow_methods=["GET", "POST", "PUT", "DELETE"],
```
Cả 4 HTTP methods đều được allow từ frontend origins. Website công khai không cần DELETE/PUT.  
**Kết luận:** Đây nên xem là hardening/information issue, không phải high-severity độc lập.  
**Đề xuất:** Giới hạn public chat CORS chỉ cho `POST`; DELETE/PUT chỉ từ admin domain nếu muốn giảm bề mặt tấn công.

### 🟢 OK (đã làm tốt)

- ✅ DOMPurify XSS sanitization trên chat widget (`ChatWidget.js:241`)
- ✅ Marked.js + DOMPurify trên admin chat (`script.js:532`)
- ✅ `verify_admin_key` dependency đúng cách trên tất cả document/content routes
- ✅ Security headers: `X-Content-Type-Options`, `X-Frame-Options`, `HSTS`, `Referrer-Policy` (`main.py:29-35`)
- ✅ File type validation (extension + MIME type) khi upload documents (`documents.py:43-47`)
- ✅ UUID randomize tên file upload để tránh path guessing (`documents.py:53`)
- ✅ Rate limiting 20 req/min cho chat, 5/min cho upload, 10/min cho delete
- ✅ File size limit 10MB enforced
- ✅ `.env` đã có trong `.gitignore`
- ✅ Input validation: `question` max 2000 chars, `formatted_prompt` max 20000 chars (`chat.py`)
- ✅ `escapeHtml()` cho user messages trước khi render DOM
- ✅ `rel="noopener noreferrer"` trên tất cả `target="_blank"` links

---

## 2. UI/UX

### 🟡 Cần Cải Thiện

#### UX-01: Chat widget auto-open gây phiền nhiễu
**File:** `frontend/website/app.js` + `components/ChatWidget.js:35`  
```javascript
autoOpen: config.autoOpen !== undefined ? config.autoOpen : true,
// → setTimeout(() => this.openChat(), 500);
```
Chat tự mở sau 500ms trên **mọi thiết bị > 768px**. Đối với người dùng mới, đây là trải nghiệm xâm phạm — nhiều website mất 20-30% bounce rate vì popup auto-open.  
**Đề xuất:** Chỉ auto-open nếu user đã visit trước đó (`localStorage.getItem('chatOpened')`) hoặc tắt hoàn toàn auto-open.

#### UX-02: Hero stats hardcode trong HTML không đồng bộ với content.json
**File:** `frontend/website/index.html:102-118`  
Stats trong HTML (`20+`, `2+`, `200+`, `2+`) được hardcode cứng, trong khi `content.json` cũng có field stats. Nếu admin update content.json, hero stats vẫn không đổi.  
**Đề xuất:** Để ContentApplier.js inject hero stats từ content.json.

#### UX-03: Donation section và Partner section hardcode trong HTML
**Files:** `index.html:318-433`  
Thông tin tài khoản ngân hàng, đối tác đều hardcode trong HTML — không quản lý được qua Admin Dashboard.  
**Đề xuất:** Đưa vào content.json để admin có thể cập nhật.

#### UX-04: Không có trang 404 tùy chỉnh
Vercel sẽ hiển thị trang 404 mặc định của mình. Chưa có `404.html` tùy chỉnh phù hợp với brand.  
**Đề xuất:** Tạo `404.html` với style đồng nhất, link về trang chủ.

#### UX-05: Không có loading skeleton cho section đầu tiên
Trang dùng `visibility: hidden` cho đến khi JS chạy. Nếu JS lỗi hoặc load chậm, toàn trang vô hình.  
**File:** `index.html:41`  
**Đề xuất:** Thêm timeout fallback: nếu sau 3 giây mà JS chưa restore visibility, tự động show trang.

#### UX-06: Copyright năm sẽ lỗi thời
**File:** `index.html:468`  
```html
<p>&copy; 2026 EM Volunteer Project. All rights reserved.</p>
```
Hardcode năm 2026. Năm sau sẽ lỗi thời.  
**Đề xuất:** Dùng JavaScript: `new Date().getFullYear()` hoặc lấy từ content.json.

#### UX-07: Social icons là file JPEG không scale tốt
**Files:** `index.html:445-450` — `facebook.jpg`, `tiktok.jpg`  
Social icons dùng JPEG thay vì SVG/PNG. JPEG không có background trong suốt, sẽ thấy viền trắng/đen không khớp khi theme đổi.  
**Đề xuất:** Dùng SVG icon hoặc Font Awesome icon (đã có trong dependencies) thay vì ảnh JPEG.

#### UX-08: Admin panel thiếu dark mode
Admin panel (`frontend/admin/`) sử dụng màu purple gradient cứng (`#667eea → #764ba2`) không đồng nhất với brand xanh dương của website, và không có dark mode.

#### UX-09: project.html quá bare, thiếu nội dung placeholder
**File:** `frontend/website/project.html`  
Trang chi tiết dự án chỉ có container rỗng, phụ thuộc hoàn toàn vào URL params và JS. Nếu JS lỗi hoặc params sai, trang trắng trơn.

---

## 3. 📱 Responsive / Mobile

### 🟡 Cần Kiểm Tra / Cải Thiện

#### RESP-01: mua-banh.html header max-width không nhất quán
**File:** `frontend/website/mua-banh.html:59`  
```css
max-width: 960px;  /* mua-banh header */
```
```css
max-width: 1100px;  /* ungho-vat-chat header */
```
Hai trang phụ có max-width header khác nhau (960px vs 1100px), gây bố cục lệch nhau.

#### RESP-02: Gallery CSS có fixed height trên mobile
**File:** `frontend/website/styles/gallery.css:16-17`  
```css
.gallery-carousel { height: 500px; }
.carousel-item { width: 400px; height: 300px; }
```
Fixed dimensions có thể overflow trên màn hình nhỏ. Cần kiểm tra breakpoint.

#### RESP-03: Timeline backdrop phức tạp trên mobile
Timeline section có SVG backdrop với trees, mountain, road, bus animation. Trên màn hình nhỏ, các element có thể overlap hoặc render sai.

#### RESP-04: Volunteer section dùng 2-column grid
**File:** `frontend/website/styles/forms.css:10`  
```css
grid-template-columns: 1fr 1fr;
```
Cần confirm breakpoint cho 1-column trên mobile. Không thấy media query override trong forms.css.

#### RESP-05: Chat widget position trên mobile
**File:** `components/ChatWidget.js` + `styles/chatWidget.css`  
Cần kiểm tra vị trí floating của chat widget khi bàn phím mobile bật lên. iOS Safari thay đổi `100vh` khi bàn phím xuất hiện có thể làm chat widget bị che.

#### RESP-06: Hero CTA buttons 3 nút có thể wrap xấu trên mobile nhỏ
**File:** `index.html:96-100`  
Ba nút ("Đăng Ký Tình Nguyện", "Quyên Góp Ngay", "Tìm Hiểu Thêm") trên một row. Trên iPhone SE (375px) hoặc nhỏ hơn, layout cần kiểm tra.

### ✅ Responsive Tốt

- ✅ Navbar hamburger menu hoạt động ở `max-width: 768px`
- ✅ `container-padding: clamp(16px, 4vw, 24px)` linh hoạt
- ✅ `font-size: clamp(28px, 4vw, 34px)` cho section titles
- ✅ navbar-offset giảm 72px → 68px trên mobile 480px

---

## 4. 🌙 Dark Mode

### ✅ Dark Mode Đã Làm Tốt (Website chính)

- ✅ Anti-FOUC script đọc `localStorage('theme')` trước khi render — không flash màu
- ✅ Đầy đủ CSS variable overrides trong `[data-theme="dark"]` block
- ✅ Glassmorphism dark mode (`--glass-bg: rgba(26, 26, 31, 0.55)`)
- ✅ Màu primary sáng hơn trong dark mode (`#42A5F5` thay vì `#2196F3`)
- ✅ Shadows sâu hơn trong dark mode
- ✅ mua-banh.html và ungho-vat-chat.html có Anti-FOUC script

### 🟡 Cần Kiểm Tra

#### DM-01: Gallery carousel border gradient trong dark mode
**File:** `styles/gallery.css:44-47`  
```css
background:
  linear-gradient(white, white) padding-box,
  linear-gradient(135deg, #42a5f5, #90caf9...) border-box;
```
`white` hardcode — trong dark mode, background của carousel item sẽ vẫn trắng, không khớp với dark surface.

#### DM-02: Support pages (mua-banh, ungho-vat-chat) có inline styles hardcode màu
Trong `<style>` inline của hai trang phụ có nhiều CSS values cứng không dùng CSS variables, có thể không responsive với dark mode.

#### DM-03: Admin panel không có dark mode
`frontend/admin/style.css` và `main.css` sử dụng màu hardcode, không có `[data-theme="dark"]` block.

---

## 5. 🎨 Màu Sắc & Design System

### ✅ Design System Mạnh

- ✅ CSS variables đầy đủ, nhất quán trong `variables.css`
- ✅ Brand color nhất quán: `#2196F3` (primary), `#29B6F6` (secondary)
- ✅ Spacing scale từ 4px đến 80px
- ✅ Shadow system với tinted shadows (brand color)
- ✅ Border radius nhất quán: 8px, 10px, 12px
- ✅ Typography: 'Be Vietnam Pro' xuyên suốt

### 🟡 Vấn Đề

#### COLOR-01: Admin panel brand màu không nhất quán
**File:** `frontend/admin/style.css:11`  
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
Admin dùng màu purple/indigo (`#667eea`, `#764ba2`) trong khi toàn bộ website dùng sky blue (`#2196F3`). Tạo cảm giác đây là hai sản phẩm khác nhau.

#### COLOR-02: Một số hard-coded color values không dùng variables
Rải rác trong CSS có những values như `rgba(0,0,0,0.07)`, `rgba(0,0,0,0.2)` thay vì dùng shadow variables. Nhỏ nhưng làm khó maintain.

#### COLOR-03: Contrast ratio cần kiểm tra
`--color-text-secondary: #626C71` trên nền trắng `#FAFCFF` có contrast ratio ~4.2:1 — **dưới** WCAG AA (4.5:1) cho normal text. Cần tăng lên ~`#5A6369`.

---

## 6. ♿ Accessibility (A11y)

### 🟡 Cần Cải Thiện

#### A11Y-01: `visibility: hidden` anti-FOUC không có timeout fallback
**File:** `index.html:41`, `mua-banh.html:19`, `ungho-vat-chat.html:19`  
```javascript
document.documentElement.style.visibility = 'hidden';
```
Nếu JS bị block hoặc lỗi, toàn trang vô hình với user. Không có fallback `setTimeout` để restore visibility.

#### A11Y-02: Không có `prefers-reduced-motion` cho phần lớn animations
**Phát hiện:** Chỉ `bookExperience.css` có `@media (prefers-reduced-motion: reduce)` — toàn bộ các animation khác (Timeline bus, mission card flip, gallery carousel, ImpactCounter counting animation, floating animations) không respect reduced motion preference.  
**Tác động:** Người dùng nhạy cảm với animation (vestibular disorders) có thể bị ảnh hưởng.

#### A11Y-03: Mission card flip — screen reader không handle tốt
Mission cards có front/back face với `backface-visibility: hidden`. Screen reader đọc cả hai face cùng lúc, tạo ra nội dung bị trùng lặp hoặc không có nghĩa.  
**Đề xuất:** Thêm `aria-hidden="true"` trên back face khi chưa flip, và toggle khi flip.

#### A11Y-04: Contrast ratio của secondary text (xem COLOR-03)

#### A11Y-05: Missing `lang` attribute context cho mixed content
Một số văn bản tiếng Anh trong trang tiếng Việt không được đánh dấu. Minor nhưng ảnh hưởng screen reader pronunciation.

#### A11Y-06: Chat widget — không thông báo khi bot trả lời
`ChatWidget.js` không có `aria-live="polite"` region cho messages container. Screen reader sẽ không tự động đọc tin nhắn mới của bot.  
**Đề xuất:** Thêm `aria-live="polite"` vào `#chatMessages`.

### ✅ Accessibility Tốt

- ✅ `lang="vi"` trên `<html>` element
- ✅ `.sr-only` utility class trong variables.css
- ✅ `:focus-visible` outline cho keyboard navigation
- ✅ `aria-label` trên QR lightbox close button, social links
- ✅ Semantic HTML: `<nav>`, `<main>` (page-wrapper), `<footer>`, `<section>`
- ✅ `rel="noopener noreferrer"` trên external links
- ✅ `loading="lazy"` trên images

---

## 7. ⚡ Performance

### 🟡 Cần Cải Thiện

#### PERF-01: 21 CSS files không được bundle/minify
Trang load 21 file CSS riêng biệt. Mỗi file = 1 HTTP request. Tổng cộng ~21 requests chỉ cho CSS.  
**Đề xuất:** Concat + minify CSS (Vite, Rollup, hoặc đơn giản là dùng Vercel Build step).

#### PERF-02: Không có WebP/AVIF image format
Toàn bộ ảnh là JPG/JPEG/PNG. WebP thường nhỏ hơn 30-50%.  
**Đề xuất:** Dùng `<picture>` element với WebP fallback, hoặc dùng Vercel Image Optimization.

#### PERF-03: Font Awesome đầy đủ (~75KB CSS + webfonts)
Chỉ dùng một phần nhỏ icons nhưng load toàn bộ Font Awesome kit.  
**Đề xuất:** Chỉ include icon classes cần dùng (subsetting), hoặc dùng SVG icons riêng lẻ.

#### PERF-04: Google Fonts blocking render
```html
<link rel="preload" href="https://fonts.googleapis.com/..." as="style">
<link href="https://fonts.googleapis.com/..." rel="stylesheet">
```
Có preload nhưng vẫn là render-blocking. Thêm `font-display: swap` đã được set qua URL params `&display=swap` — tốt. Tuy nhiên, xem xét host font locally để tránh extra DNS lookup.

#### PERF-05: Console.log trong production code
**Files tìm thấy:**
- `ChatWidget.js:270` — `console.log('[ChatWidget] Message added...')`
- `Testimonials.js:49,69,77,93,110,236` — 6 console.log statements
- `ScrolltoTop.js:17` — `console.log('[ScrollToTop] ✓ Initialized')`
Tổng: **8 console.log** trong production frontend. Có thể lộ thông tin nội bộ và ảnh hưởng performance nhẹ.

#### PERF-06: Không có browser caching headers rõ ràng cho static assets
Vercel tự handle nhưng nên verify `Cache-Control` headers cho images và JS.

### ✅ Performance Tốt

- ✅ `loading="lazy"` trên hầu hết images
- ✅ ContentLoader singleton — content.json chỉ fetch 1 lần
- ✅ IntersectionObserver cho lazy animation (không dùng scroll event)
- ✅ `scrollRestoration = 'manual'` — tránh double-scroll restore
- ✅ `app.js?v=20260511d` cache busting version string
- ✅ Gzip/compression qua Vercel

---

## 8. 🔍 SEO

### 🟡 Cần Cải Thiện

#### SEO-01: Thiếu Open Graph tags trên trang phụ
**Files:** `mua-banh.html`, `ungho-vat-chat.html`, `project.html`  
Chỉ có `index.html` có đầy đủ OG tags. Ba trang phụ thiếu `og:image`, `og:title`, `og:description`, `twitter:card`.  
**Tác động:** Link share trên Facebook/Zalo sẽ không có preview image.

#### SEO-02: Thiếu `<link rel="canonical">`
Không có canonical URL trên bất kỳ trang nào. Nếu trang được crawl qua nhiều URLs (www vs non-www, http vs https), có thể bị duplicate content penalty.

#### SEO-03: Thiếu `sitemap.xml`
Không có sitemap. Search engine crawl sẽ kém hiệu quả hơn, đặc biệt khi `project.html` được render bởi JS (dynamic params).

#### SEO-04: Thiếu `<meta name="robots">`
Không kiểm soát index/follow behavior. Admin dashboard có thể bị index nếu có external link trỏ đến.

#### SEO-05: project.html — nội dung được render bằng JS
Search engine có thể không crawl được nội dung trang dự án vì toàn bộ nội dung inject qua JavaScript.

#### SEO-06: Thiếu structured data (Schema.org)
Volunteer organization không có `Organization` schema markup. Có thể tăng rich snippet trên Google.

### ✅ SEO Tốt

- ✅ `index.html` có đầy đủ OG + Twitter Card tags
- ✅ `lang="vi"` trên HTML
- ✅ Favicon đầy đủ: `.ico`, `.png 32x32`, `apple-touch-icon`
- ✅ Meta description có ý nghĩa, dưới 160 chars
- ✅ Heading hierarchy: `h1` → `h2` → `h3` nhất quán
- ✅ Alt text trên phần lớn images

---

## 9. 🧹 Code Quality

### 🔴 Bug Thực Sự

#### BUG-01: Model name `"gpt-5-mini"` không tồn tại
**File:** `backend/app/config.py:7`  
```python
LLM_MODEL: str = "gpt-5-mini"
```
`gpt-5-mini` không phải model name hợp lệ. Đây có thể là typo của `gpt-4o-mini` hoặc `gpt-4-mini`. Nếu biến env không override, LLM calls sẽ fail.

#### BUG-02: `UPLOAD_DIR` hardcode đường dẫn Railway-specific
**File:** `backend/app/api/routes/documents.py:17`  
```python
UPLOAD_DIR = "/workspace/backend/data/uploads"
```
Path `/workspace/...` chỉ đúng trên Railway. Nếu chạy local hay Docker khác, sẽ fail.  
**Đề xuất:** 
```python
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./data/uploads")
```

#### BUG-03: Hai `RAGEngine()` instances được tạo độc lập
**Files:** `chat.py:12`, `documents.py:16`  
```python
# chat.py
rag = RAGEngine()

# documents.py  
rag = RAGEngine()
```
Hai module tạo hai instance riêng biệt ở module level. ChromaDB là file-based DB, nhưng concurrent writes từ hai instances có thể gây data inconsistency.

### 🟡 Code Smells

#### CODE-01: 8 console.log trong production (xem PERF-05)

#### CODE-02: Inline `<style>` blocks lớn trong trang phụ
`mua-banh.html` và `ungho-vat-chat.html` mỗi file có 200+ dòng CSS inline trong `<head>` thay vì file CSS riêng. Gây khó maintain và duplicate.

#### CODE-03: Member image files có tên tiếng Việt
**Files:** `assets/images/members/thảo.jpg`, `assets/images/members/thư.jpg`  
Tên file với ký tự Unicode có thể gây vấn đề trên một số hệ thống files (Windows, một số Linux config).

#### CODE-04: Utility scripts tại root level không cần thiết trong repo
Files `change_to_jpg.py`, `compress_img.py`, `rename_image.py`, `resize.py` là dev utilities nhưng commit vào repo chính. Gây noise.

#### CODE-05: `backend/app/api/dependencies.py` rỗng (1 dòng)
File `dependencies.py` chỉ có 1 dòng rỗng — `verify_admin_key` logic được duplicate trong cả `documents.py` và `content.py` thay vì dùng shared dependency.

---

## 10. 🏗️ Infrastructure & Backend

### 🟡 Cần Cải Thiện

#### INFRA-01: Health check quá đơn giản
**File:** `backend/app/main.py:43`  
```python
@app.get("/health")
async def health_check():
    return {"status": "ok"}
```
Không kiểm tra ChromaDB connection, không kiểm tra OpenAI API key validity.  
**Đề xuất:** Thêm check cơ bản: ChromaDB accessible, OPENAI_API_KEY set.

#### INFRA-02: Không có API versioning
Routes tại `/api/chat`, `/api/documents`, `/api/content` không có version prefix. Breaking changes sẽ cần update tất cả clients.  
**Đề xuất:** `/api/v1/chat`, `/api/v1/documents`...

#### INFRA-03: Không có logging configuration tập trung
Mỗi module dùng `logging.getLogger(__name__)` nhưng không có centralized logging setup trong `main.py`. Log level, format, và handler chưa được config.

#### INFRA-04: ChromaDB persist path relative
**File:** `backend/app/config.py:8`  
```python
CHROMA_PERSIST_DIR: str = "./data/chroma_db"
```
Relative path phụ thuộc vào working directory khi app start. Nếu restart từ thư mục khác, DB có thể bị "mất".

#### INFRA-05: Dockerfile có thể chưa production-ready
**File:** `Dockerfile` (chỉ 5 dòng)  
Cần kiểm tra: non-root user, health check instruction, multi-stage build để giảm image size.

### ✅ Infrastructure Tốt

- ✅ SlowAPI rate limiting implemented
- ✅ CORS whitelist (chỉ accept từ known origins)
- ✅ Security headers middleware
- ✅ pydantic-settings cho config type safety
- ✅ `os.makedirs(UPLOAD_DIR, exist_ok=True)` an toàn
- ✅ File cleanup sau upload (`finally: os.remove(file_path)`)

---

## 11. 📋 Tóm Tắt Ưu Tiên

### 🔴 Critical (Fix ngay)

| ID | Vấn đề | File |
|---|---|---|
| SEC-01 | Chat API public cho phép abuse chi phí OpenAI và caller tự tăng cost/request | `routes/chat.py`, `schemas/chat.py` |
| SEC-02 | Admin key có thể bị brute-force trực tiếp qua backend vì auth probe endpoints không rate-limit | `routes/documents.py`, `routes/content.py` |
| SEC-03 | CMS content render bằng `innerHTML` trên site public, có stored XSS surface | `ContentApplier.js`, `Mission.js`, `ungho-vat-chat.html` |
| BUG-01 | `gpt-5-mini` model name sai | `config.py` |
| BUG-02 | UPLOAD_DIR hardcode Railway path | `routes/documents.py` |
| A11Y-01 | visibility:hidden không có timeout fallback | `index.html` |

### 🟡 High (Sprint tới)

| ID | Vấn đề | File |
|---|---|---|
| SEC-04 | `dest_path` cho phép arbitrary repo write trong branch deploy | `routes/content.py` |
| SEC-05 | GitHub token backend có quyền ghi quá rộng lên repo deploy | `routes/content.py` |
| SEC-06 | Thiếu SRI trên support pages và admin CDN assets | `mua-banh.html`, `ungho-vat-chat.html`, `admin/index.html` |
| UX-01 | Chat widget auto-open gây phiền | `ChatWidget.js` |
| UX-02 | Hero stats hardcode không sync với CMS | `index.html` |
| PERF-05 | 8 console.log trong production | nhiều files |
| CODE-01 | Model name `gpt-5-mini` (duplicate BUG-01) | `config.py` |
| DM-01 | Gallery background trắng trong dark mode | `gallery.css` |
| A11Y-02 | Thiếu prefers-reduced-motion trên animations | nhiều CSS files |
| A11Y-06 | Chat widget không có aria-live | `ChatWidget.js` |
| COLOR-03 | Secondary text contrast ratio thấp | `variables.css` |
| SEO-01 | Thiếu OG tags trên trang phụ | 3 HTML files |

### 🟢 Medium / Nice-to-have

| ID | Vấn đề |
|---|---|
| SEC-08 | CORS allow_methods rộng hơn nhu cầu thực tế |
| PERF-01 | Bundle/minify CSS |
| PERF-02 | WebP image format |
| PERF-03 | Font Awesome subsetting |
| UX-04 | Custom 404 page |
| UX-07 | Social icons JPEG → SVG |
| UX-08 | Admin dark mode |
| SEO-02 | Canonical tags |
| SEO-03 | sitemap.xml |
| INFRA-02 | API versioning |
| CODE-03 | Rename Vietnamese member image files |
| CODE-05 | Tập trung `verify_admin_key` vào `dependencies.py` |

---

## Phụ Lục: Danh Sách Files Đã Kiểm Tra

### Frontend Website (25 files)
- `index.html`, `mua-banh.html`, `ungho-vat-chat.html`, `project.html`
- `app.js`, `project.js`
- `components/`: NavBar, Activities, Animations, ChatWidget, ContentApplier, Cursor, FAQ, Forms, Gallery, ImpactCounter, Members, Mission, ProjectDetail, ScrolltoTop, Testimonials, Timeline, Toast
- `data/`: ContentLoader.js, activities.js, content.json
- `styles/`: variables.css, main.css, navbar.css, sections.css, footer.css, forms.css, gallery.css, chatWidget.css, activities.css, members.css, timeline.css, support-pages.css, projectDetail.css, skeleton.css, testimonials.css, faq.css, backgrounds.css, bookExperience.css, toast.css, scrolltotop.css, cursor.css

### Admin Panel (6 files)
- `index.html`, `style.css`, `script.js`, `content-manager.js`, `init-content-manager.js`, `vercel.json`

### Backend (15 files)
- `main.py`, `config.py`
- `api/routes/`: chat.py, documents.py, content.py
- `api/dependencies.py`
- `services/`: llm.py, rag_engine.py, vector_store.py, embedding.py, chunking.py
- `schemas/`: chat.py, document.py
- `.env.example`, `Dockerfile`

---

*Báo cáo này chỉ phân tích — chưa có thay đổi code nào được thực hiện.*  
*Bước tiếp theo: Ưu tiên theo nhóm Critical → High → Medium và tạo PR fixes theo từng nhóm.*
