# Brainstorm — Cải thiện Website EM

> Ngày: 2026-05-07  
> Trạng thái: Ý tưởng, chưa implement

---

## 1. UX / Trải nghiệm người dùng

### 1.1 Multi-step Form đăng ký tình nguyện
- Form hiện tại là 1 bước duy nhất, dễ gây overwhelm
- Chia thành 3 bước: **Thông tin cá nhân → Kinh nghiệm & kỳ vọng → Xác nhận & gửi**
- Thêm progress bar ở đầu form
- Lợi ích: tăng tỉ lệ hoàn thành form, trải nghiệm mượt hơn

### 1.2 Dark Mode Toggle
- CSS đã có sẵn `[data-theme="dark"]` nhưng chưa có nút bật/tắt cho người dùng
- Lưu preference vào `localStorage`
- Tự động theo system preference (`prefers-color-scheme`)

### 1.3 Skeleton Loading
- Gallery và Members hiện load ảnh trắng tinh trước khi hiển thị
- Thay bằng skeleton placeholder (shimmer effect) trong lúc chờ
- Cải thiện perceived performance đáng kể

### 1.4 Micro-interactions
- Nút CTA rung nhẹ khi hover
- Toast notification sau khi submit form thành công
- Smooth reveal animation cho từng card khi scroll đến

---

## 2. Tính năng mới

### 2.1 Impact Counter (Bộ đếm tác động)
- Hiển thị các con số nổi bật: **Số tình nguyện viên**, **Số trẻ em được hỗ trợ**, **Số chuyến đi**, **Số tỉnh thành**
- Animate (đếm từ 0 lên) khi section scroll vào viewport
- Đặt ngay sau Hero section để tạo ấn tượng đầu tiên mạnh

### 2.2 Timeline hành trình
- Hiển thị lịch sử các chuyến tình nguyện theo năm (2022 → 2023 → 2024 → 2025...)
- Layout zigzag trái-phải trên desktop, dọc trên mobile
- Mỗi mốc: ảnh đại diện, địa điểm, số người tham gia, 1-2 câu mô tả
- Visual hơn và kể được "câu chuyện lớn" của tổ chức

### 2.3 Lịch sự kiện / Upcoming Trips
- Calendar hoặc card list hiển thị các chuyến sắp tới
- Mỗi sự kiện: tên chuyến, địa điểm, ngày, số slot còn lại, nút "Đăng ký"
- Tạo urgency (VD: "Còn 3 chỗ") để tăng conversion

### 2.4 Blog / Nhật ký chuyến đi
- Các bài viết kể chuyện từ góc nhìn tình nguyện viên
- Tăng engagement, SEO, và giữ chân người dùng quay lại
- Có thể dùng markdown files + static rendering, không cần CMS phức tạp

### 2.5 Donate / Gây quỹ
- Section hoặc trang riêng để nhận đóng góp vật chất / tài chính
- Hiển thị minh bạch: tiền dùng vào đâu, % phân bổ
- Tích hợp QR code chuyển khoản hoặc link PayOS / MoMo

### 2.6 FAQ Section
- Trả lời các câu hỏi phổ biến: "Cần điều kiện gì?", "Chi phí bao nhiêu?", "Đi trong bao lâu?"
- Accordion expand/collapse để tiết kiệm không gian
- Giảm tải cho ChatBot và form liên hệ

---

## 3. Performance / Kỹ thuật

### 3.1 Lazy Loading ảnh
- Thêm `loading="lazy"` cho tất cả ảnh trong Gallery và Members
- Dùng `IntersectionObserver` để load ảnh chỉ khi sắp vào viewport
- Đặc biệt quan trọng khi số lượng ảnh tăng

### 3.2 Image Optimization
- Convert tất cả ảnh sang `.webp` (đã có `change_to_jpg.py`, `compress_img.py`, `resize.py` — mở rộng thêm)
- Dùng `srcset` để serve ảnh kích thước phù hợp với màn hình
- Giảm đáng kể thời gian tải trang

### 3.3 PWA (Progressive Web App)
- Thêm `manifest.json` + service worker
- User có thể "cài" website lên điện thoại như app
- Hỗ trợ offline xem nội dung đã cache

### 3.4 SEO & Social Sharing
- Thêm `<meta>` Open Graph (thumbnail khi share Facebook)
- Twitter Card tags
- Structured data (JSON-LD) cho Google rich results
- `sitemap.xml` và `robots.txt`

---

## 4. Content & Cộng đồng

### 4.1 Member Spotlight
- Mỗi tuần/tháng highlight 1 tình nguyện viên: ảnh, câu chuyện ngắn, lý do tham gia
- Tăng gắn kết nội bộ và tạo nội dung tươi mới

### 4.2 Photo Wall / Mosaic
- Grid ảnh dày đặc kiểu mosaic từ các chuyến đi
- Hover để xem thông tin chuyến + tình nguyện viên trong ảnh
- Visual impact mạnh hơn gallery carousel thông thường

### 4.3 Bản đồ các chuyến đi
- Map (Leaflet.js / Google Maps embed) đánh dấu tất cả địa điểm đã đến
- Click vào marker để xem ảnh + thông tin chuyến
- Trực quan hóa tầm với của tổ chức

---

## 5. Ưu tiên đề xuất

| Ý tưởng | Impact | Độ khó | Ưu tiên |
|---|---|---|---|
| Dark Mode Toggle | Trung bình | Thấp | ⭐⭐⭐⭐ |
| Impact Counter | Cao | Thấp | ⭐⭐⭐⭐⭐ |
| Skeleton Loading | Trung bình | Thấp | ⭐⭐⭐⭐ |
| Lịch sự kiện | Cao | Trung bình | ⭐⭐⭐⭐ |
| Multi-step Form | Cao | Trung bình | ⭐⭐⭐ |
| Lazy Loading ảnh | Cao | Thấp | ⭐⭐⭐⭐⭐ |
| SEO meta tags | Trung bình | Thấp | ⭐⭐⭐⭐ |
| Timeline hành trình | Cao | Cao | ⭐⭐⭐ |
| Blog / Nhật ký | Cao | Cao | ⭐⭐ |
| Bản đồ chuyến đi | Trung bình | Trung bình | ⭐⭐⭐ |

---

*File này là tài liệu brainstorm — chưa có cam kết implement. Cập nhật khi có thêm ý tưởng hoặc quyết định bắt đầu một hạng mục cụ thể.*
