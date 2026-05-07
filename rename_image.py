#!/usr/bin/env python3
import os
import shutil
from pathlib import Path

def rename_gallery_images(folder_path):
    """Đọc folder ảnh → Đổi tên 1.jpg, 2.jpg, 3.jpg..."""
    
    folder = Path(folder_path)
    
    # Tạo folder nếu chưa có
    folder.mkdir(parents=True, exist_ok=True)
    
    # Extensions hỗ trợ
    image_extensions = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}
    
    # Lấy tất cả ảnh
    images = []
    for file_path in folder.iterdir():
        if file_path.suffix.lower() in image_extensions:
            images.append(file_path)
    
    if not images:
        print("❌ Không tìm thấy ảnh nào!")
        return
    
    # Sắp xếp theo tên
    images.sort(key=lambda x: x.name.lower())
    
    print(f"🔍 Tìm thấy {len(images)} ảnh:")
    for i, img in enumerate(images, 1):
        print(f"  {i}. {img.name}")
    
    # Backup & Rename
    for i, img_path in enumerate(images, 1):
        # Backup
        backup_path = img_path.with_suffix(img_path.suffix + '.backup')
        shutil.move(img_path, backup_path)
        
        # New name (luôn JPG)
        new_path = folder / f"{i}.jpg"
        shutil.copy(backup_path, new_path)  # Copy để giữ backup
        
        print(f"✅ {img_path.name} → {i}.jpg")
    
    print(f"\n🎉 HOÀN THÀNH! Gallery sẵn sàng với {len(images)} ảnh.")

# Chạy
if __name__ == "__main__":
    folder = input("Nhập đường dẫn folder (Enter nếu dùng mặc định): ").strip()
    if not folder:
        folder = "/workspace/frontend/website/assets/images/gallery"  # Default
    
    rename_gallery_images(folder)
