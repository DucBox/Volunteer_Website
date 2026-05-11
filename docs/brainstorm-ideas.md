# Brainstorming: Tối ưu UI/UX Section Gallery Image cho Desktop

Hiện tại, hiệu ứng 3D Carousel (như trong ảnh đính kèm) với quá nhiều ảnh cong trong không gian 3D gây ra tình trạng giảm FPS và lag trên Desktop do trình duyệt phải xử lý quá nhiều `transform-3d`, tính toán perspective và animation cùng lúc. 

Để giữ lại tinh thần "neon led xanh blue sky" nhưng tối ưu hiệu năng và mang lại cảm giác premium hơn trên màn hình lớn, dưới đây là các options thay thế:

## Option 1: Bento Box Layout (Hiện đại, Đang là trend)
**Mô tả:** 
- Sử dụng CSS Grid để tạo một bố cục dạng "Bento Box" (các ô chữ nhật kích thước khác nhau ghép lại vừa khít, layout bất đối xứng).
- **Trạng thái bình thường:** Các ảnh nằm tĩnh, có overlay tối màu nhẹ.
- **Tương tác (Hover):** Khi di chuột vào ô nào, ảnh trong ô đó sẽ sáng lên, viền ô xuất hiện hiệu ứng ánh sáng **neon led xanh blue sky** (dùng `box-shadow` hoặc gradient glow), đồng thời ảnh hơi scale nhẹ (`transform: scale(1.03)`).
**Ưu điểm:**
- Cực kỳ mượt mà vì sử dụng CSS Grid tĩnh, chỉ animate khi người dùng tương tác (GPU-accelerated transforms).
- Trông rất gọn gàng, cao cấp và phù hợp với không gian rộng của màn hình ngang (Desktop/Laptop).
- Dễ dàng chèn thêm các đoạn text, quote ngắn hoặc số liệu xen kẽ với hình ảnh để bớt nhàm chán.

## Option 2: Masonry Grid kết hợp Lightbox (Tối giản & Tập trung)
**Mô tả:**
- Sắp xếp ảnh theo dạng cột xếp gạch (Masonry) giống như Pinterest.
- Bỏ các animation xoay 3D liên tục. Thay vào đó, áp dụng hiệu ứng **Scroll Reveal** (ảnh từ từ hiện ra và trượt nhẹ lên khi cuộn chuột tới vùng đó).
- **Khi Hover:** Ánh sáng neon xanh toả ra từ sau bức ảnh.
- **Khi Click:** Mở ảnh to lên giữa màn hình (Lightbox mode), lúc này background xung quanh tối đi và dải led xanh tập trung quanh viền bức ảnh đang được phóng to.
**Ưu điểm:**
- Hiển thị được nhiều ảnh cùng lúc một cách tự nhiên mà không gây rối mắt hay quá tải trình duyệt.
- Trải nghiệm xem ảnh chi tiết tốt hơn rất nhiều.

## Option 3: Optimized 3D Coverflow (Nếu vẫn muốn giữ Carousel)
**Mô tả:**
- Vẫn dùng dạng Carousel nhưng **giảm triệt để số lượng DOM node cần render cùng lúc**. Thay vì render cả một vòng tròn/cylinder dài, chỉ hiển thị tối đa 3-5 ảnh (1 ảnh trung tâm, 2 ảnh hai bên).
- Ảnh trung tâm sẽ to nhất, rõ nét và có viền **neon led xanh blue sky** rực rỡ, phát sáng liên tục.
- Các ảnh phụ hai bên sẽ bị làm mờ, thu nhỏ và **không** có hiệu ứng neon để giảm tải GPU.
**Ưu điểm:**
- Giữ được phong cách "slide" hiện tại của bạn nhưng khắc phục được hoàn toàn vấn đề lag trên máy tính.
- Trải nghiệm slide (vuốt/click) mượt mà hơn vì chỉ có vài tấm ảnh cần animate transition.

## Option 4: Floating Parallax Gallery (Nghệ thuật & Tương tác cao)
**Mô tả:**
- Bố trí các ảnh nằm rải rác ở các kích thước và vị trí khác nhau trong một section lớn.
- Khi người dùng rê chuột (Mouse Move) trên khu vực này, các ảnh sẽ di chuyển nhẹ nhàng theo trục X/Y (Hiệu ứng Parallax). 
- **Tương tác:** Tính toán khoảng cách từ chuột tới các bức ảnh. Chỉ những ảnh nằm **gần con trỏ chuột** mới phát ra ánh sáng viền neon xanh, ảnh xa chuột sẽ ở trạng thái tĩnh.
**Ưu điểm:**
- Vô cùng nghệ thuật, "wow factor" cao cho người xem trên Desktop.
- Hiệu năng tốt hơn 3D Cylinder do sử dụng transform 2D parallax nhẹ nhàng, mang lại cảm giác không gian có chiều sâu mà không cần đến 3D tốn kém tài nguyên.
