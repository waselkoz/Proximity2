from PIL import Image
Image.MAX_IMAGE_PIXELS = None

def process_logo():
    try:
        print("Opening large image...")
        img = Image.open('public/Logo proximity.jpg')
        
        # Resize to max 1000x1000 to save memory and improve web performance
        img.thumbnail((1000, 1000), Image.Resampling.LANCZOS)
        
        img = img.convert('RGBA')
        data = img.getdata()

        newData = []
        for item in data:
            # Calculate how dark the pixel is (0 = black, 255 = white)
            gray = int(item[0] * 0.299 + item[1] * 0.587 + item[2] * 0.114)
            
            # The darker the pixel in the original, the more opaque it should be
            # White background (255) becomes transparent (alpha=0)
            alpha = 255 - gray
            
            # We enforce the solid Crimson color #90243B (144, 36, 59) for every pixel
            # But we use the calculated alpha to keep it perfectly smooth and anti-aliased
            
            # To avoid the very faint background noise, if alpha is very low, make it 0
            if alpha < 15:
                alpha = 0
                
            newData.append((144, 36, 59, alpha))

        img.putdata(newData)
        img.save('public/Logo proximity.png', 'PNG')
        print("Successfully processed logo into a smooth, solid crimson mask.")
    except Exception as e:
        print(f"Error: {e}")

process_logo()
