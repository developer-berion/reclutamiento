---
name: HTML to React + Tailwind Migration
description: Converts a static HTML/CSS landing page to a React + Vite + Tailwind project with pixel-perfect fidelity.
---

# Protocol: Pixel-Identical Migration

## 1. Analysis
- **Identify Design Tokens:** Extract colors, fonts, layouts, and border-radius from the source (inline styles or CSS).
- **Identify Assets:** Note all images, icons, and external scripts.
- **Identify Behavior:** Document interactions (accordion, tabs, dark mode).

## 2. Setup
- Initialize Vite React project.
- Install `tailwindcss`, `postcss`, `autoprefixer`, `gsap`.
- Configure `tailwind.config.js` with extracted tokens. I.e. `colors`, `fontFamily`, `borderRadius`.
- Add global styles (gradients, resets) to `index.css`.

## 3. Migration Strategy
- **Structure:** Map semantic HTML sections to React components (e.g., `<header>` -> `Header.jsx`).
- **Styling:** Convert logic to Tailwind utility classes. Use `module` or `global` CSS only for complex specific animations or gradients.
- **Assets:** Use standard `<img>` tags or imports. Ensure paths are valid.
- **Fonts:** Include Google Fonts links in `index.html`.

## 4. Animation (GSAP)
- Use `useGSAP` hook.
- Implement strictly visual animations (opacity, transform) to avoid layout shifts.
- Scope animations using `ref`.

## 5. QA Checklist
- [ ] Visual Comparison: Overlay source and result.
- [ ] Dark Mode: Toggle persists and applies correctly.
- [ ] Responsive: Check mobile break points.
- [ ] Console: No errors or warnings.
