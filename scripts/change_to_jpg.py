#!/usr/bin/env python3
import os
import glob
from PIL import Image
from pathlib import Path


ROOT_PATH = '/workspace/frontend/website/assets'
JPG_QUALITY = 80


def convert_to_jpg(input_path, output_path):
    """Convert ALL images → JPG"""
    try:
        with Image.open(input_path) as img:
            # Luôn convert to RGB (bỏ alpha)
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Resize if too big
            max_width = 1920
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # Save JPG
            img.save(output_path, 'JPEG', quality=JPG_QUALITY, optimize=True, progressive=True)
            
            orig_size = os.path.getsize(input_path)
            new_size = os.path.getsize(output_path)
            save_pct = ((orig_size - new_size) / orig_size) * 100
            
            print(f"✅ {os.path.basename(input_path)} → JPG: {orig_size/1024:.1f}KB → {new_size/1024:.1f}KB ({save_pct:.1f}%)")
            return True
    except Exception as e:
        print(f"❌ {input_path}: {e}")
        return False


def main():
    # Tìm TẤT CẢ ảnh
    extensions = ['*.jpg', '*.jpeg', '*.png', '*.webp', '*.gif']
    all_images = []
    
    for ext in extensions:
        all_images.extend(glob.glob(os.path.join(ROOT_PATH, '**', ext), recursive=True))
    
    print(f"🔄 Converting {len(all_images)} images → JPG...")
    
    if not all_images:
        print("❌ No images found!")
        return
    
    total_orig = 0
    total_new = 0
    success = 0
    
    for img_path in all_images:
        orig_size = os.path.getsize(img_path)
        total_orig += orig_size
        
        # Tạo tên JPG (giữ nguyên folder)
        jpg_path = Path(img_path).with_suffix('.jpg')
        temp_path = str(jpg_path) + '.tmp'
        
        if convert_to_jpg(img_path, temp_path):
            # Replace gốc bằng JPG
            os.replace(temp_path, jpg_path)
            new_size = os.path.getsize(jpg_path)
            total_new += new_size
            success += 1
            
            # Xóa file gốc nếu tên khác JPG
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
    print(f"🎉 ALL TO JPG COMPLETE!")
    print(f"✅ Success: {success}/{len(all_images)}")
    print(f"📦 Total: {total_orig/1024/1024:.2f}MB → {total_new/1024/1024:.2f}MB")
    print(f"💾 Saved: {save_total:.1f}% - TẤT CẢ là JPG!")
    print("="*60)


if __name__ == "__main__":
    main()
