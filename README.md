# And The Next — One-Pager

Bold, minimalistic one-page website for And The Next, the personal venture lab of Dietmar Rietsch.

## Features

- **Cinematic Design**: High-contrast, bold typography with brutalist aesthetics
- **Motion Logo**: Animated logo.mp4 as hero centerpiece
- **Dark/Light Theme**: Toggle with button or 'T' key
- **Smooth Animations**: Fade-ins, parallax, scroll indicators
- **Responsive**: Mobile-first, adaptive typography
- **Performance**: Optimized video playback, lazy loading

## Structure

```
/
├── index.html          # Main HTML structure
├── style.css           # Bold, minimalistic styling
├── script.js           # Animations & interactions
├── assets/
│   └── logo.mp4        # Animated logo
└── README.md           # This file
```

## Sections

1. **Hero**: Full-screen with animated logo and tagline
2. **About**: Company story and founder card
3. **Contact**: Minimal contact information
4. **Footer**: Copyright notice

## Usage

Simply open `index.html` in a modern browser. No build process required.

## Keyboard Shortcuts

- `T` - Toggle theme (light/dark)

## Customization

### Colors

Edit CSS variables in `style.css`:

```css
:root {
    --color-bg: #FFFFFF;
    --color-text: #0A0A0A;
    --color-accent: #FF4500;
}
```

### Content

Update text directly in `index.html`.

### Animations

Modify animation timing in `style.css` keyframes section.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance

- Video pauses when out of viewport
- Lazy loading animations
- Optimized grain overlay
- Reduced motion support

---

**Built with pure HTML, CSS, and JavaScript. No frameworks.**
