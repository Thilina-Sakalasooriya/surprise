# 4 Year Anniversary Surprise Website

A cute, romantic, and smooth one-page website to surprise your wifey for your 4 year anniversary!

## How to Customize

1. **Change her name** - Open `index.html` and replace `[her name]` with her actual name (appears in the hero section)
2. **Add your names** - In the love letter, replace `[her name]` if needed and "Your Hubby" with your name
3. **Add photos** - In the "Our Memories" gallery section, replace the `.gallery-placeholder` divs with `<img>` tags pointing to your photos. For example:
   ```html
   <div class="gallery-item">
       <img src="photos/photo1.jpg" alt="Our memory" style="width:100%;height:100%;object-fit:cover;">
   </div>
   ```
4. **Customize the timeline** - Edit the years, dates, and text in the "Our Little Story" section to reflect your actual memories
5. **Personalize the love letter** - Rewrite the letter in `index.html` to make it more personal from you

## How to Use

1. Put all three files (`index.html`, `style.css`, `script.js`) in the same folder
2. (Optional) Create a `photos/` folder for your images
3. Open `index.html` in your web browser to view it
4. Share it with her by hosting it or just showing it on your device!

## Features

- Smooth animations and floating hearts
- Responsive design - looks great on mobile and desktop
- Interactive surprise button with confetti
- Timeline of your relationship
- Photo gallery
- Beautiful romantic styling

## Tips

- For the best surprise, show it on your phone or computer when you're together
- The confetti animation uses the canvas-confetti library from CDN, so it needs internet connection
- All fonts and icons are loaded from CDN as well

Made with love for your 4 years together! Here's to a lifetime more! <3
