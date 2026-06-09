#!/usr/bin/env python3
import os
import glob
from PIL import Image
from pathlib import Path


ROOT_PATH = '/workspace/frontend/website/assets/images/feelings'
TARGET_SIZE = (1080, 1080)  # 1080x1080
JPG_QUALITY = 80


def resize_to_1080(input_path, output_path):
    """Resize + JPG convert về 1080x1080"""
    try:
        with Image.open(input_path) as img:
            # Convert to RGB
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Resize về 1080x1080 (giữ tỷ lệ, crop nếu cần)
            img.thumbnail(TARGET_SIZE, Image.Resampling.LANCZOS)
            
            # Tạo canvas 1080x1080, center image
            new_img = Image.new('RGB', TARGET_SIZE, (255, 255, 255))
            x = (TARGET_SIZE[0] - img.width) // 2
            y = (TARGET_SIZE[1] - img.height) // 2
            new_img.paste(img, (x, y))
            img = new_img
            
            # Save JPG
            img.save(output_path, 'JPEG', quality=JPG_QUALITY, optimize=True, progressive=True)
            
            orig_size = os.path.getsize(input_path)
            new_size = os.path.getsize(output_path)
            save_pct = ((orig_size - new_size) / orig_size) * 100
            
            print(f"✅ {os.path.basename(input_path)} → 1080x1080: {orig_size/1024:.1f}KB → {new_size/1024:.1f}KB ({save_pct:.1f}%)")
            return True
    except Exception as e:
        print(f"❌ {input_path}: {e}")
        return False


def main():
    extensions = ['*.jpg', '*.jpeg', '*.png', '*.webp', '*.gif']
    all_images = []
    
    for ext in extensions:
        all_images.extend(glob.glob(os.path.join(ROOT_PATH, '**', ext), recursive=True))
    
    print(f"🔄 Resizing {len(all_images)} images → 1080x1080 JPG...")
    
    if not all_images:
        print("❌ No images found!")
        return
    
    total_orig = 0
    total_new = 0
    success = 0
    
    for img_path in all_images:
        orig_size = os.path.getsize(img_path)
        total_orig += orig_size
        
        # JPG output
        jpg_path = Path(img_path).with_suffix('.jpg')
        temp_path = str(jpg_path) + '.tmp'
        
        if resize_to_1080(img_path, temp_path):
            os.replace(temp_path, jpg_path)
            new_size = os.path.getsize(jpg_path)
            total_new += new_size
            success += 1
            
            # Xóa gốc nếu khác JPG
            if str(img_path) != str(jpg_path):
                try:
                    os.remove(img_path)
                    print(f"🗑️  Xóa {os.path.basename(img_path)}")
                except:
                    pass
    
    # Xóa .bak
    bak_files = list(Path(ROOT_PATH).rglob("*.bak"))
    if bak_files:
        for bak_file in bak_files:
            bak_file.unlink()
        print(f"🗑️  Xóa {len(bak_files)} file .bak")
    
    # Summary
    save_total = ((total_orig - total_new) / total_orig) * 100
    print("\n" + "="*60)
    print(f"🎉 RESIZE 1080x1080 COMPLETE!")
    print(f"✅ Success: {success}/{len(all_images)}")
    print(f"📦 Total: {total_orig/1024/1024:.2f}MB → {total_new/1024/1024:.2f}MB")
    print(f"💾 Saved: {save_total:.1f}% - TẤT CẢ 1080x1080 JPG!")
    print("="*60)


if __name__ == "__main__":
    main()
