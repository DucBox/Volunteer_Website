# Phân Tích Bảo Mật & Khả Năng Chịu Tải — Dự Án Cho EM

> Ngày phân tích: 2026-05-10  
> Phiên bản codebase: commit `94277b2`  
> Stack: Vanilla JS (Vercel) + FastAPI/ChromaDB (Railway)

---

## Mục Lục

1. [Tổng Quan Kiến Trúc](#1-tổng-quan-kiến-trúc)
2. [Phân Tích Bảo Mật](#2-phân-tích-bảo-mật)
3. [Phân Tích Khả Năng Chịu Tải](#3-phân-tích-khả-năng-chịu-tải)
4. [Kết Luận Tổng Thể](#4-kết-luận-tổng-thể)
5. [Lộ Trình Nếu Phục Vụ Tổ Chức Lớn](#5-lộ-trình-nếu-phục-vụ-tổ-chức-lớn)
6. [Khuyến Nghị: Cloudflare vs Vercel](#6-khuyến-nghị-cloudflare-vs-vercel)

---

## 1. Tổng Quan Kiến Trúc

```
Người dùng
    │
    ▼
[Vercel CDN]
Frontend (Static HTML/JS/CSS)
volunteer-website-self.vercel.app
    │
    │ CORS allowlisted
    ▼
[Railway — Single Container]
FastAPI + ChromaDB (on-disk)
volunteerwebsite-production.up.railway.app
    │
    ├─► OpenAI API (embedding + LLM)
    └─► ChromaDB (local disk)

[Vercel CDN — Separate]
Admin Dashboard
admin-dashboard-em-lilac.vercel.app
```

**Thành phần chính:**
| Layer | Công nghệ | Hosting | Ghi chú |
|-------|-----------|---------|---------|
| Frontend | Vanilla JS ES6 Modules | Vercel (free) | Static, không có framework |
| Backend | Python 3.11, FastAPI | Railway (free tier) | Single instance |
| Vector DB | ChromaDB 0.5.11 | Railway (on-disk) | Lưu trữ tạm thời |
| LLM | OpenAI GPT-4o-mini | OpenAI API | Pay-per-use |
| Embedding | text-embedding-3-small | OpenAI API | Pay-per-use |
| Admin | Vanilla JS | Vercel (free) | Header key auth |

---

## 2. Phân Tích Bảo Mật

### 2.1 Điểm Mạnh Hiện Tại ✅

#### CORS Allowlisting — Tốt
```python
# backend/app/main.py
allow_origins=[
    "https://volunteer-website-self.vercel.app",
    "https://admin-dashboard-em-lilac.vercel.app",
]
```
Chỉ cho phép 2 origin cụ thể. Không dùng wildcard `"*"` — đúng.

#### Security Headers trên Backend — Tốt
```
X-Content-Type-Options: nosniff          → Ngăn MIME sniffing
X-Frame-Options: DENY                   → Ngăn clickjacking
Strict-Transport-Security: 31536000     → Force HTTPS 1 năm
Referrer-Policy: strict-origin-when-cross-origin
```

#### Rate Limiting — Tốt
```python
@limiter.limit("20/minute")   # Chat: 20 req/phút/IP
@limiter.limit("5/minute")    # Upload: 5 req/phút/IP
@limiter.limit("10/minute")   # Delete: 10 req/phút/IP
```

#### Input Validation — Tốt
- Pydantic schema: câu hỏi 1–2000 ký tự, prompt 0–20.000 ký tự
- File upload: chỉ nhận `.pdf`, `.docx`, `.txt`, giới hạn 10MB
- MIME type validation độc lập với extension

#### XSS Protection trên Frontend — Tốt
```javascript
// ChatWidget.js
DOMPurify.sanitize(marked.parse(content))  // sanitize trước khi render
this.escapeHtml(content)                    // escape user input
```

#### Secrets không trong Git — Tốt
`.env` nằm trong `.gitignore`. API key không bị commit.

---

### 2.2 Điểm Yếu & Rủi Ro ⚠️

#### [MEDIUM] Thiếu Content Security Policy (CSP) trên Frontend

Frontend không có CSP header hoặc meta tag. Không có `vercel.json` để set security headers. Điều này có nghĩa:
- Trình duyệt cho phép load script từ bất kỳ nguồn nào
- Nếu có XSS (dù đã có DOMPurify), attacker có thể inject script từ CDN khác
- Không có bảo vệ chống inline script injection

**Tác động:** Trung bình — DOMPurify đã giảm thiểu phần lớn nguy cơ XSS  
**Fix:** Thêm `vercel.json` với security headers

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://volunteerwebsite-production.up.railway.app;"
        }
      ]
    }
  ]
}
```

---

#### [MEDIUM] Admin Key Lưu Trong `sessionStorage`

```javascript
// admin/script.js
sessionStorage.setItem('adminKey', key);  // Lưu plain text
```

`sessionStorage` có thể bị đọc bởi bất kỳ JavaScript nào chạy trên cùng origin. Nếu có XSS, admin key bị lộ.

**Tác động:** Trung bình — đã có DOMPurify bảo vệ; admin dashboard là separate domain  
**Fix ngắn hạn:** Không lưu key, yêu cầu nhập mỗi lần dùng  
**Fix dài hạn:** Dùng JWT với expiry, hoặc passkey-based auth

---

#### [MEDIUM] Backend URL Hardcoded trong JS Frontend

```javascript
// ChatWidget.js
apiUrl: 'https://volunteerwebsite-production.up.railway.app/api/chat'
```

URL backend public và hiển thị trong source code. Bất kỳ ai inspect source đều thấy Railway URL. Dù không phải lỗ hổng trực tiếp (API endpoint là public), nó:
- Tạo điểm để gọi API trực tiếp bypass rate limit (dùng nhiều IP)
- Lộ stack: biết dùng Railway

**Fix:** Không có fix hoàn hảo cho static site. Proxy qua Vercel rewrites hoặc Cloudflare Worker để ẩn URL backend thực.

---

#### [LOW] Thiếu `X-Permitted-Cross-Domain-Policies` và `Permissions-Policy`

Headers phụ nhưng nên có:
```
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-Permitted-Cross-Domain-Policies: none
```

---

#### [LOW] Admin Authentication Đơn Giản — Static Key, Không Có Expiry

`X-Admin-Key` là một static string. Không có:
- Expiry / rotation tự động
- Audit log ai dùng key
- Brute force protection (chỉ dựa vào rate limit)
- 2FA

Với tổ chức nhỏ, đây là chấp nhận được. Nhưng nếu scale lên, cần JWT hoặc OAuth.

---

#### [INFO] `console.log` trong Production

```javascript
console.log('[ChatWidget] Message added. Total messages:', this.messages.length);
```

Rò rỉ metadata về hoạt động người dùng ra browser console. Không critical nhưng nên xóa khi production.

---

### 2.3 Bảng Tổng Kết Bảo Mật

| Hạng mục | Trạng thái | Mức độ |
|----------|-----------|--------|
| CORS allowlisting | ✅ Đã làm đúng | — |
| HTTPS everywhere | ✅ Vercel + Railway enforce | — |
| Rate limiting | ✅ Đã có | — |
| Input validation | ✅ Pydantic + frontend | — |
| XSS protection (chat) | ✅ DOMPurify | — |
| SQL Injection | ✅ Không dùng SQL | — |
| Secrets trong Git | ✅ .gitignore đúng | — |
| Security headers (backend) | ✅ Đủ 4 headers quan trọng | — |
| Content Security Policy | ❌ Chưa có | MEDIUM |
| Security headers (frontend) | ❌ Không có vercel.json | MEDIUM |
| Admin key storage | ⚠️ sessionStorage | MEDIUM |
| Backend URL ẩn | ⚠️ Lộ trong JS | LOW |
| Admin 2FA / JWT | ❌ Chưa có | LOW |
| Audit logging | ❌ Chưa có | LOW |
| Permissions-Policy | ❌ Chưa có | INFO |

**Điểm bảo mật tổng thể: 7/10** — Tốt cho dự án volunteer nhỏ. Các lỗ hổng MEDIUM cần fix trước khi scale.

---

## 3. Phân Tích Khả Năng Chịu Tải

### 3.1 Frontend (Vercel) — Rất Tốt ✅

Vercel là CDN toàn cầu cho static files. Khả năng chịu tải của frontend:

| Metric | Ước tính | Lý do |
|--------|---------|-------|
| Concurrent users | Không giới hạn thực tế | Vercel CDN edge, static files |
| Requests/ngày | ~100GB bandwidth free | Vercel Hobby: 100GB/tháng |
| Latency (VN) | ~50-150ms | Cloudflare PoP tại Singapore/HK |
| Uptime | 99.99% | Vercel SLA |

**Bottleneck duy nhất:** 9.4MB ảnh chưa được optimize. Không có image compression, WebP conversion, hay responsive images. Mỗi page load full-size images.

---

### 3.2 Backend (Railway) — Điểm Yếu Nhất ⚠️

Railway free tier cung cấp:
- **$5/tháng credit** (hết credit thì down)
- **512MB RAM**, shared CPU
- **Single container** — không auto-scale
- **Cold start**: Container ngủ sau 30 phút không có request → cold start 5-15 giây

#### Ước tính capacity thực tế

**Một chat request bao gồm:**
1. OpenAI embedding call: ~200-500ms
2. ChromaDB vector search: ~50-100ms  
3. OpenAI LLM call (GPT-4o-mini): ~1-3 giây
4. **Tổng: ~1.5-4 giây/request**

**Với rate limit hiện tại (20 req/phút/IP):**
- 1 người dùng: tối đa 20 req/phút
- Nhiều người cùng lúc: tất cả chia sẻ 1 FastAPI process

**Concurrent users chịu được:**
- **5-10 concurrent chat users**: Ổn, response time ~2-5s
- **20-30 concurrent**: Bắt đầu queue, timeout có thể xảy ra
- **50+ concurrent**: Rất có thể OOM (512MB RAM) hoặc timeout

**Lý do không scale được:**
1. **Single process**: FastAPI async nhưng chỉ 1 instance
2. **ChromaDB on-disk**: Gắn với container volume, không thể horizontal scale
3. **Không có queue**: Requests đến cùng lúc xử lý song song đến giới hạn RAM
4. **Không có caching**: Câu hỏi giống nhau → gọi OpenAI lại từ đầu

---

### 3.3 ChromaDB — Điểm Rủi Ro Cao 🔴

ChromaDB lưu dữ liệu trong container Railway. Điều này có nghĩa:

- **Dữ liệu bị mất nếu container restart** (Railway có thể restart bất kỳ lúc nào)
- **Không có backup tự động**
- **Không replica** — nếu container down, mọi query đều fail
- **Volume bị xóa nếu deploy lại** trên Railway free tier (không có persistent volume)

Đây là rủi ro lớn nhất về reliability, không phải security.

---

### 3.4 OpenAI API — Chi Phí Tuyến Tính

| Model | Chi phí |
|-------|---------|
| text-embedding-3-small | $0.02/1M tokens |
| gpt-4o-mini input | $0.15/1M tokens |
| gpt-4o-mini output | $0.60/1M tokens |

**Ước tính chi phí với 1,000 chat sessions/tháng:**
- Mỗi session ~3 turns, ~500 tokens/turn
- Embedding: 1,000 × 3 × 500 × $0.02/1M ≈ **$0.03**
- LLM: 1,000 × 3 × 800 tokens × ($0.15+$0.60)/2M ≈ **$1.80**
- **Tổng: ~$2/tháng** cho 1,000 sessions — rất rẻ

Với 10,000 sessions/tháng: ~$20/tháng. Vẫn manageable.

---

### 3.5 Bảng Tổng Kết Khả Năng Chịu Tải

| Thành phần | Capacity hiện tại | Bottleneck | Rủi ro |
|-----------|------------------|-----------|--------|
| Frontend (Vercel) | Rất cao | Ảnh chưa optimize | Thấp |
| Backend (Railway) | 10-30 concurrent users | Single instance, 512MB RAM | Cao |
| ChromaDB | Không scale được | On-disk, no replica | Rất cao |
| Rate limiting | 20 req/phút/IP | Bypass bằng nhiều IP | Trung bình |
| OpenAI API | Scale tốt | Chi phí tăng tuyến tính | Thấp |
| Uptime | Không guarantee | Railway free tier, cold start | Cao |

---

## 4. Kết Luận Tổng Thể

### Phù Hợp Với Hiện Tại

Dự án hiện tại **phù hợp với quy mô volunteer nhỏ**:
- Traffic thấp (<100 concurrent users/ngày)
- Không có SLA requirement
- Budget gần như bằng 0
- Dữ liệu không nhạy cảm (không có PII, không có thanh toán online)

### Không Phù Hợp Nếu

- Traffic tăng lên >50 concurrent users
- Cần uptime guarantee (99.9%+)
- Dữ liệu ChromaDB quan trọng và không thể mất
- Cần audit trail cho admin actions
- Phục vụ tổ chức với yêu cầu compliance

---

## 5. Lộ Trình Nếu Phục Vụ Tổ Chức Lớn

### Phase 1 — Quick Wins (Có thể làm ngay, chi phí thấp)

**5.1 Thêm `vercel.json` với Security Headers**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; connect-src 'self' https://volunteerwebsite-production.up.railway.app" }
      ]
    }
  ]
}
```

**5.2 Optimize hình ảnh**
- Convert tất cả JPG sang WebP (tiết kiệm 25-35% size)
- Thêm `width` và `height` attribute cho mỗi `<img>` để tránh layout shift
- Dùng `srcset` cho responsive images

**5.3 Thêm response caching cho Chat**
```python
# Đơn giản nhất: dùng dict in-memory cache
cache = {}

async def chat(...):
    cache_key = hash(question)
    if cache_key in cache:
        return cache[cache_key]
    result = await rag.query(...)
    cache[cache_key] = result
    return result
```

**5.4 Fix ChromaDB persistence trên Railway**
- Dùng Railway Volume (persistent disk) thay vì container filesystem
- Hoặc export và re-import ChromaDB mỗi lần deploy

---

### Phase 2 — Kiến Trúc Tốt Hơn (Chi phí thấp, cần config)

**5.5 Tách ChromaDB ra dịch vụ riêng**

Thay ChromaDB on-disk bằng một trong:
- **Qdrant Cloud** (free tier: 1GB, 1 node) — hosted vector DB
- **Pinecone** (free tier: 2M vectors) — managed vector DB
- **Weaviate Cloud** (free sandbox)

```python
# Thay đổi vector_store.py để dùng Qdrant cloud
from qdrant_client import QdrantClient
client = QdrantClient(url="https://xxx.qdrant.io", api_key="...")
```

**5.6 Thêm queue/worker pattern**

Với traffic cao, cần queue để tránh overload:
```
User → API Gateway → Queue (Redis/BullMQ) → Worker Pool → OpenAI
```

Đơn giản nhất: dùng Celery + Redis (hoặc Cloudflare Queue).

**5.7 Upgrade Railway plan hoặc chuyển sang Fly.io**
- Railway Starter: $5/tháng → 1GB RAM, không cold start, persistent volume
- Fly.io free tier: 3 shared VMs, 256MB RAM mỗi VM, có thể scale
- Render free tier: tương tự Railway, 512MB RAM

---

### Phase 3 — Enterprise-Ready (Chi phí đáng kể hơn)

**5.8 Admin Authentication**
- Thay `X-Admin-Key` bằng JWT với expiry 8h
- Thêm Google OAuth (miễn phí) để đăng nhập bằng email tổ chức
- Audit log tất cả admin actions

**5.9 Monitoring và Alerting**
- Sentry (free tier) cho error tracking
- Better Uptime (free) cho uptime monitoring
- Grafana Cloud (free) cho metrics

**5.10 Backup tự động ChromaDB**
```bash
# Cron job mỗi ngày
tar -czf chroma_backup_$(date +%Y%m%d).tar.gz /workspace/data/chroma_db
# Upload lên Cloudflare R2 (free 10GB)
```

---

## 6. Khuyến Nghị: Cloudflare vs Vercel

### 6.1 Tùy Chọn Có Thể Xem Xét

#### Option A — Giữ Vercel + Thêm Cloudflare Proxy (Khuyến Nghị cho budget thấp)

```
Cloudflare (free)
    │ WAF, DDoS, CDN, custom domain
    ▼
Vercel (frontend)
    │ Static files
    ▼
Railway/Fly.io (backend)
```

**Cách làm:**
1. Mua domain (`.com` ~$10/năm hoặc `.vn` tại Mắt Bão ~$20-32/năm)
2. Đăng ký Cloudflare free — transfer nameserver
3. Thêm CNAME record: `duanchoem.com` → `volunteer-website-self.vercel.app`
4. Bật Cloudflare proxy (orange cloud)

**Lợi ích:**
- WAF miễn phí (chặn bad bots, SQL injection attempts)
- DDoS protection layer 3/4 miễn phí
- **Cloudflare có PoP tại Hà Nội, TP. HCM, Đà Nẵng** — latency cho người dùng Việt Nam giảm từ ~80-150ms (qua Singapore) xuống ~5-30ms
- Custom domain có SSL tự động
- Analytics traffic miễn phí
- Ẩn Vercel/Railway URL thực
- Vercel vẫn serve static files nhưng Cloudflare cache lại → bandwidth Vercel sử dụng giảm từ 100GB xuống còn 5-15GB thực tế

**Chi phí:** ~$10-32/năm (chỉ tiền domain)

---

#### Option B — Full Cloudflare Ecosystem

```
Cloudflare Pages (frontend)
    │ Static site
    ▼
Cloudflare Workers (API proxy/logic)
    │ Edge compute
    ▼
Cloudflare D1 (SQLite DB) hoặc R2 (file storage)
```

**Lưu ý quan trọng về Workers:**
- Workers KHÔNG chạy Python — chỉ JavaScript/TypeScript/WebAssembly
- FastAPI không thể deploy thẳng lên Workers
- Cần viết lại backend bằng JS hoặc dùng Workers làm proxy

**Cloudflare Workers AI** có thể thay OpenAI cho embedding/LLM nhưng:
- Model selection hạn chế hơn
- `@cf/baai/bge-small-en-v1.5` cho embedding (tiếng Anh tốt hơn tiếng Việt)
- Latency thấp hơn (edge compute)
- Free tier: 10,000 neurons/ngày

**Giới hạn Free Tier Workers:**
| Resource | Free Limit |
|----------|-----------|
| Requests/ngày | 100,000 |
| CPU/request | 10ms |
| Memory | 128MB |
| Workers KV reads | 100,000/ngày |
| R2 storage | 10GB/tháng |

**CPU limit 10ms** là vấn đề lớn cho RAG pipeline (cần 1-4 giây). Cần Workers Paid ($5/tháng) để có 30 giây CPU/request.

---

#### Option C — Hybrid (Thực tế nhất cho scale)

```
Cloudflare (free/pro)
    │ DNS, WAF, CDN, DDoS protection
    ├── Pages (static frontend)
    └── Worker (API gateway, rate limiting, caching)
              │
              ▼
         Railway/Fly.io
         FastAPI + Python backend
              │
              ▼
         Qdrant Cloud
         Managed vector DB
```

Cloudflare Worker làm API gateway:
- Cache các câu hỏi phổ biến (tránh gọi OpenAI lặp lại)
- Rate limit thêm 1 layer trước backend
- Ẩn backend URL hoàn toàn
- Địa lý hóa traffic (serve cached ở edge)

---

### 6.2 So Sánh Chi Phí Theo Quy Mô

| Quy mô | Setup | Chi phí/tháng |
|--------|-------|--------------|
| **Hiện tại** (< 100 users/ngày) | Vercel + Railway free | $0 (+ OpenAI ~$2) |
| **Tổ chức vừa** (1,000 users/ngày) | Option A + Railway Starter | $15 (domain $1 + Railway $5 + OpenAI $9) |
| **Tổ chức lớn** (10,000 users/ngày) | Option C + Fly.io scale | $50-80/tháng |
| **Full Cloudflare** | Option B + Workers Paid | $5 + OpenAI costs |

---

### 6.3 Khuyến Nghị Cụ Thể

**Nếu budget = 0 (tiếp tục hiện tại):**
- Thêm `vercel.json` với security headers
- Fix ChromaDB persistence
- Không cần thay đổi thêm

**Nếu budget = $15/tháng (tổ chức vừa):**
1. Mua domain `duanchoem.vn` (~5$/năm tại [Tên Miền Việt](https://www.tenmien.vn))  
   hoặc `duanchoem.com` (~12$/năm)
2. Đăng ký Cloudflare free, point nameserver
3. Upgrade Railway Starter ($5/tháng) → persistent volume, no cold start
4. Chuyển ChromaDB sang Qdrant Cloud free tier

**Nếu budget = $50/tháng (tổ chức lớn, traffic ổn định):**
1. Cloudflare Pro ($20/tháng) — advanced WAF, image optimization, analytics
2. Fly.io Machines (2 instances, 1GB RAM each) ~$15-20
3. Qdrant Cloud Starter (~$10)
4. Custom domain + SSL
5. Sentry free cho error monitoring

---

### 6.4 Quyết Định Về Custom Domain

**Nên mua domain nếu:**
- Có kế hoạch dài hạn (>1 năm)
- Muốn chuyên nghiệp (email `info@duanchoem.vn`)
- Muốn dùng Cloudflare proxy để ẩn Vercel URL

**Domain `.vn` vs `.com`:**
| | `.vn` | `.com` |
|--|------|--------|
| Giá/năm | ~100,000 VND (~$4) | ~$12-15 |
| Uy tín tại VN | Cao hơn | Quốc tế hơn |
| Thủ tục | Cần giấy tờ tổ chức | Không cần |
| Nhà đăng ký | VinaHost, Tên Miền Việt | Namecheap, Porkbun |

**Khuyến nghị:** Đăng ký `duanchoem.com` tại Cloudflare Registrar ($8.57/năm, không markup) — đơn giản nhất khi đã dùng Cloudflare.

---

## Phụ Lục: Checklist Hành Động

### Ngay Bây Giờ (30 phút)
- [ ] Thêm `vercel.json` với security headers vào `frontend/website/`
- [ ] Thêm `vercel.json` vào `frontend/admin/`
- [ ] Xóa `console.log` debug trong ChatWidget.js

### Ngắn Hạn (1-2 tuần)
- [ ] Fix ChromaDB persistence: dùng Railway Volume hoặc export/import script
- [ ] Thêm simple response cache cho chat (dict hoặc Redis)
- [ ] Optimize images: convert sang WebP
- [ ] Thêm uptime monitor (Better Uptime free)

### Trung Hạn (1-3 tháng, nếu scale)
- [ ] Mua custom domain
- [ ] Setup Cloudflare free với custom domain
- [ ] Chuyển ChromaDB → Qdrant Cloud
- [ ] Upgrade Railway Starter ($5/tháng)
- [ ] Thêm Sentry error tracking

### Dài Hạn (nếu phục vụ tổ chức lớn)
- [ ] Cloudflare Worker làm API gateway với caching
- [ ] JWT authentication cho admin
- [ ] Audit logging
- [ ] Automated backup ChromaDB → R2
- [ ] Load testing (k6 hoặc Locust)

---

*Báo cáo này được tạo từ phân tích tĩnh codebase tại `/Users/ngoquangduc/Desktop/EM`. Các con số capacity là ước tính dựa trên thông số kỹ thuật đã biết của các dịch vụ liên quan.*
