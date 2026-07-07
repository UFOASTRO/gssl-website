import os
from PIL import Image

def compress_image(filepath, max_width, format_override=None, quality=85):
    if not os.path.exists(filepath):
        print(f"Skipping (not found): {filepath}")
        return

    orig_size = os.path.getsize(filepath)
    print(f"Processing: {filepath} ({orig_size / (1024*1024):.2f} MB)")

    try:
        img = Image.open(filepath)
        
        # Check if resize is needed
        w, h = img.size
        if w > max_width:
            ratio = max_width / float(w)
            new_h = int(h * ratio)
            print(f"  Resizing from {w}x{h} to {max_width}x{new_h}")
            img = img.resize((max_width, new_h), Image.Resampling.LANCZOS)

        # Decide format and saving parameters
        ext = os.path.splitext(filepath)[1].lower()
        
        # If it is transparent, keep RGBA. Otherwise convert to RGB to save space.
        if img.mode in ('RGBA', 'LA') and ext in ('.png', '.webp'):
            save_mode = img.mode
        else:
            if img.mode != 'RGB':
                img = img.convert('RGB')
            save_mode = 'RGB'

        if ext == '.png':
            img.save(filepath, format='PNG', optimize=True)
        elif ext in ('.jpg', '.jpeg'):
            img.save(filepath, format='JPEG', quality=quality, optimize=True)
        else:
            img.save(filepath, optimize=True)

        new_size = os.path.getsize(filepath)
        print(f"  Done. New size: {new_size / (1024*1024):.2f} MB ({100 * (new_size - orig_size) / orig_size:.1f}% change)")
    except Exception as e:
        print(f"  Error processing {filepath}: {e}")

if __name__ == "__main__":
    base_dir = "./public"
    
    # 1. Main high-res images
    compress_image(os.path.join(base_dir, "Institutional-partnership.png"), 1600)
    compress_image(os.path.join(base_dir, "natco-oyo-training-program.JPG"), 1600, quality=85)
    
    # 2. Bento grid screenshots
    projects_dir = os.path.join(base_dir, "projects-completed")
    for filename in ["naija-quick-fix.png", "oyostatecommerce.png", "GPA.png", "nigeria-drivers.png", "safe-hire.png"]:
        compress_image(os.path.join(projects_dir, filename), 1200)

    # 3. Oversized partner logo
    compress_image(os.path.join(base_dir, "Partners-logos", "lagos-state.png"), 240)
