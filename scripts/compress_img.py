#!/usr/bin/env python3
import os
import glob
from PIL import Image
from pathlib import Path


# Thư mục gốc
ROOT_PATH = '/workspace/frontend/website/assets'
JPG_QUALITY = 80  # ← Giảm xuống 80% để nén mạnh JPEG


def compress_image(input_path, output_path):
    """Compress single image - JPEG focus"""
    try:
        with Image.open(input_path) as img:
            # Convert to RGB
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Resize if too big
            max_width = 1920
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # Save JPEG optimized (TẤT CẢ → JPEG)
            img.save(output_path, 'JPEG', quality=JPG_QUALITY, optimize=True, progressive=True)
            
            orig_size = os.path.getsize(input_path)
            new_size = os.path.getsize(output_path)
            save_pct = ((orig_size - new_size) / orig_size) * 100
            
            print(f"✅ {os.path.basename(input_path)}: {orig_size/1024:.1f}KB → {new_size/1024:.1f}KB ({save_pct:.1f}%)")
            return True
    except Exception as e:
        print(f"❌ {input_path}: {e}")
        return False


def main():
    extensions = ['*.jpg', '*.jpeg', '*.png', '*.webp', '*.gif']
    all_images = []
    
    for ext in extensions:
        all_images.extend(glob.glob(os.path.join(ROOT_PATH, '**', ext), recursive=True))
    
    print(f"🔍 Found {len(all_images)} images → ALL TO JPEG 80%")
    
    if not all_images:
        print("❌ No images found!")
        return
    
    total_orig = 0
    total_new = 0
    success = 0
    
    for img_path in all_images:
        orig_size = os.path.getsize(img_path)
        total_orig += orig_size
        
        # In-place JPEG compress
        temp_path = img_path + '.tmp'
        if compress_image(img_path, temp_path):
            os.replace(temp_path, img_path)
            new_size = os.path.getsize(img_path)
            total_new += new_size
            success += 1
    
    # Xóa .bak
    bak_files = list(Path(ROOT_PATH).rglob("*.bak"))
    if bak_files:
        for bak_file in bak_files:
            bak_file.unlink()
        print(f"🗑️  Xóa {len(bak_files)} file .bak")
    
    # Summary
    save_total = ((total_orig - total_new) / total_orig) * 100
    print("\n" + "="*60)
    print(f"🎉 JPEG COMPRESS COMPLETE!")
    print(f"✅ Success: {success}/{len(all_images)}")
    print(f"📦 Total: {total_orig/1024/1024:.2f}MB → {total_new/1024/1024:.2f}MB")
    print(f"💾 Saved: {save_total:.1f}% ({(total_orig-total_new)/1024/1024:.2f}MB)")
    print("🔥 TẤT CẢ đã thành JPEG 80% - siêu nhẹ cho web!")
    print("="*60)


if __name__ == "__main__":
    main()
