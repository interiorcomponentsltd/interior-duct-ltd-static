from PIL import Image
from pathlib import Path
import shutil

root = Path(__file__).resolve().parents[1]
images_dir = root / 'public' / 'images'
backup_dir = root / 'public' / 'images_backup_non_images'
backup_dir.mkdir(parents=True, exist_ok=True)

image_exts = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}

print('Scanning', images_dir)
count_total=0
count_images=0
count_moved=0
count_webp=0

for p in images_dir.iterdir():
    if p.is_dir():
        continue
    count_total += 1
    ext = p.suffix.lower()
    if ext not in image_exts:
        # move to backup
        shutil.move(str(p), str(backup_dir / p.name))
        print('Moved non-image to backup:', p.name)
        count_moved += 1
        continue
    # optimize image
    try:
        img = Image.open(p)
        img = img.convert('RGB')
        w,h = img.size
        max_w = 1200
        if w > max_w:
            new_h = int(max_w * h / w)
            img = img.resize((max_w, new_h), Image.LANCZOS)
        # overwrite optimized jpeg/png
        save_kwargs = {'quality':80, 'optimize':True}
        if ext in ('.jpg','.jpeg'):
            img.save(p, **save_kwargs)
        else:
            # save as jpeg fallback
            jpeg_path = p.with_suffix('.jpg')
            img.save(jpeg_path, **save_kwargs)
            if jpeg_path.name != p.name:
                p.unlink()
                p = jpeg_path
        # create webp
        webp_path = p.with_suffix('.webp')
        img.save(webp_path, quality=80, method=6)
        print('Optimized and created webp for', p.name)
        count_images += 1
        count_webp += 1
    except Exception as e:
        print('Failed to process', p.name, e)

print('\nSummary:')
print('Total files scanned:', count_total)
print('Images optimized:', count_images)
print('WebP files created:', count_webp)
print('Non-image files moved to backup:', count_moved)
