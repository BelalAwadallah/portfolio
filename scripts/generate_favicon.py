import os
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def generate_assets():
    public_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public')
    os.makedirs(public_dir, exist_ok=True)

    size = 1024
    pad = 48
    radius = 220
    border_width = 18

    # 1. Background gradient
    y, x = np.mgrid[0:size, 0:size]
    t = (x * 0.6 + y * 0.8) / (size * 1.4)
    t = np.clip(t, 0, 1)

    # Gradient from rich maroon to deeper shade
    # #4C191C -> #3C1516 -> #1E0708
    r = (76 * (1 - t) + 26 * t).astype(np.uint8)
    g = (25 * (1 - t) + 7 * t).astype(np.uint8)
    b = (28 * (1 - t) + 8 * t).astype(np.uint8)
    a = np.full((size, size), 255, dtype=np.uint8)

    bg_arr = np.dstack([r, g, b, a])
    base_img = Image.fromarray(bg_arr, 'RGBA')

    # Mask for rounded squircle
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([pad, pad, size - pad, size - pad], radius=radius, fill=255)
    base_img.putalpha(mask)

    # 2. Gold border
    border_draw = ImageDraw.Draw(base_img)
    # Gold border
    border_draw.rounded_rectangle(
        [pad, pad, size - pad, size - pad],
        radius=radius,
        outline=(218, 175, 75, 235),
        width=border_width
    )
    # Inner subtle rim
    inner_pad = pad + border_width + 4
    border_draw.rounded_rectangle(
        [inner_pad, inner_pad, size - inner_pad, size - inner_pad],
        radius=radius - border_width,
        outline=(255, 255, 255, 35),
        width=3
    )

    # 3. Typography B.
    font_path = 'C:/Windows/Fonts/georgiab.ttf'
    font_size = 560
    font = ImageFont.truetype(font_path, font_size)

    bbox = font.getbbox('B')
    bw = bbox[2] - bbox[0]
    bh = bbox[3] - bbox[1]

    dot_r = 38
    dot_gap = 26
    total_w = bw + dot_gap + (dot_r * 2)

    start_x = int((size - total_w) / 2) - bbox[0]
    start_y = int((size - bh) / 2) - bbox[1] - 10

    dot_cx = start_x + bbox[2] + dot_gap + dot_r
    dot_cy = start_y + bbox[3] - dot_r

    # Drop shadow
    shadow_img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)
    s_draw.text((start_x + 6, start_y + 12), 'B', font=font, fill=(0, 0, 0, 160))
    s_draw.ellipse(
        [dot_cx - dot_r + 6, dot_cy - dot_r + 12, dot_cx + dot_r + 6, dot_cy + dot_r + 12],
        fill=(0, 0, 0, 160)
    )
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(14))
    base_img = Image.alpha_composite(base_img, shadow_img)

    # Draw letter B in crisp ivory
    draw = ImageDraw.Draw(base_img)
    draw.text((start_x, start_y), 'B', font=font, fill=(255, 255, 255, 255))

    # Draw golden accent dot
    draw.ellipse(
        [dot_cx - dot_r, dot_cy - dot_r, dot_cx + dot_r, dot_cy + dot_r],
        fill=(229, 192, 115, 255),
        outline=(255, 245, 215, 255),
        width=4
    )

    # 4. Generate raster outputs
    # 512x512 PNG
    img_512 = base_img.resize((512, 512), Image.Resampling.LANCZOS)
    img_512.save(os.path.join(public_dir, 'logo-512.png'))

    # Apple touch icon (180x180)
    img_180 = base_img.resize((180, 180), Image.Resampling.LANCZOS)
    img_180.save(os.path.join(public_dir, 'apple-touch-icon.png'))

    # Favicon 32x32
    img_32 = base_img.resize((32, 32), Image.Resampling.LANCZOS)
    img_32.save(os.path.join(public_dir, 'favicon-32x32.png'))

    # Favicon 16x16
    img_16 = base_img.resize((16, 16), Image.Resampling.LANCZOS)
    img_16.save(os.path.join(public_dir, 'favicon-16x16.png'))

    # Multi-size ICO
    ico_sizes = [(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    base_img.save(
        os.path.join(public_dir, 'favicon.ico'),
        format='ICO',
        sizes=ico_sizes
    )

    # 5. Generate crisp vector SVG
    mask_b = Image.new('L', (size, size), 0)
    draw_b = ImageDraw.Draw(mask_b)
    draw_b.text((start_x, start_y), 'B', font=font, fill=255)

    arr_b = np.array(mask_b)
    contours, hierarchy = cv2.findContours(arr_b, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)

    svg_paths = []
    for c in contours:
        approx = cv2.approxPolyDP(c, 0.6, True).squeeze()
        if len(approx) > 2:
            p_str = 'M ' + ' L '.join(f'{pt[0]},{pt[1]}' for pt in approx) + ' Z'
            svg_paths.append(p_str)

    b_path_d = ' '.join(svg_paths)

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4E1C1F" />
      <stop offset="50%" stop-color="#3C1516" />
      <stop offset="100%" stop-color="#1E0708" />
    </linearGradient>
    <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF0D0" />
      <stop offset="30%" stop-color="#E5C07B" />
      <stop offset="70%" stop-color="#C59A45" />
      <stop offset="100%" stop-color="#8C6518" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.55" />
    </filter>
  </defs>

  <!-- Rounded Squircle Base -->
  <rect x="{pad}" y="{pad}" width="{size - pad*2}" height="{size - pad*2}" rx="{radius}" ry="{radius}" fill="url(#bg-grad)" />
  
  <!-- Outer Gold Rim -->
  <rect x="{pad}" y="{pad}" width="{size - pad*2}" height="{size - pad*2}" rx="{radius}" ry="{radius}" fill="none" stroke="url(#gold-grad)" stroke-width="{border_width}" />
  
  <!-- Inner Subtle Accent Line -->
  <rect x="{inner_pad}" y="{inner_pad}" width="{size - inner_pad*2}" height="{size - inner_pad*2}" rx="{radius - border_width}" ry="{radius - border_width}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-opacity="0.18" />

  <!-- B Monogram and Golden Accent Dot -->
  <g filter="url(#shadow)">
    <path d="{b_path_d}" fill="#FFFFFF" fill-rule="evenodd" />
    <circle cx="{dot_cx}" cy="{dot_cy}" r="{dot_r}" fill="url(#gold-grad)" stroke="#FFF4D9" stroke-width="4" />
  </g>
</svg>
'''
    with open(os.path.join(public_dir, 'favicon.svg'), 'w', encoding='utf-8') as f:
        f.write(svg_content)

    print("All favicon and logo assets generated successfully in 'public/'!")

if __name__ == '__main__':
    generate_assets()
