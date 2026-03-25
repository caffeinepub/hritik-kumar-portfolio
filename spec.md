# Hritik Kumar Portfolio

## Current State
The portfolio uses a warm beige/sand aesthetic (#F5F5DC, #FAF3E0, #EADBC8, soft gold #C2A878, muted brown #8B6F47) with floating blob animations, glassmorphism, and a warm charcoal dark mode. The design is inspired by cozy/artisan aesthetics.

## Requested Changes (Diff)

### Add
- A professional, executive color palette: deep navy/slate as the primary brand color, cool neutrals, crisp accent (electric blue or teal)
- Playfair Display for headings paired with Plus Jakarta Sans for body text
- Sharper, more editorial typographic hierarchy
- Subtle cool-toned dark mode (deep slate/navy backgrounds, off-white text)

### Modify
- Replace warm beige palette with a professional dark-navy/cool-slate palette
- Light mode: near-white background (#F8FAFC equivalent in OKLCH), deep navy text, slate card surfaces, electric blue/teal accents
- Dark mode: deep navy-black backgrounds, cool dark cards, bright accent highlights
- Update blob animations to use cool blue/slate tones instead of beige/gold
- Update the logo, nav, hero section, cards, buttons, skill tags — all to match new professional palette
- Keep all sections and content identical; only the visual theme changes

### Remove
- Warm beige/sand/gold color references throughout index.css and component inline styles
- Brown/muted brown tones

## Implementation Plan
1. Redesign index.css with professional OKLCH tokens (navy, slate, electric blue accent)
2. Update tailwind.config.js with new font families (Playfair Display + Plus Jakarta Sans) and color tokens
3. Update App.tsx to use new semantic token classes and replace any hardcoded warm color hex values
4. Ensure dark mode is intentionally styled (deep navy, not just inverted beige)
5. Validate and build
