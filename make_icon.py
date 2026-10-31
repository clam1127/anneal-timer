"""Render icon.png (512x512): orange hotplate glow + timer ring."""
from PIL import Image, ImageDraw
S = 512
img = Image.new("RGB", (S, S), (13, 16, 20))
d = ImageDraw.Draw(img)
# hotplate
d.rounded_rectangle((70, 360, 442, 410), 18, fill=(255, 138, 42))
d.rounded_rectangle((110, 410, 402, 440), 10, fill=(60, 66, 76))
# sample substrate
d.rectangle((196, 330, 316, 360), fill=(120, 170, 255))
# timer ring (3/4 progress)
box = (156, 70, 356, 270)
d.ellipse(box, outline=(38, 44, 53), width=26)
d.arc(box, -90, 180, fill=(255, 179, 107), width=26)
d.line((256, 170, 256, 110), fill=(238, 241, 245), width=14)
d.line((256, 170, 300, 170), fill=(238, 241, 245), width=14)
img.save("icon.png")
