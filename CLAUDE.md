# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static vanilla HTML/CSS/JavaScript portfolio website with no build tooling or framework dependencies.

## Development

No build step required. To serve locally:

```bash
python -m http.server 8000
# or
npx http-server
```

Then open `http://localhost:8000` in a browser.

## Architecture

Core files:

- `index.html` — Single-page layout with anchor-based navigation (`#home`, `#projects`, `#about`, `#contact`)
- `style.css` — All styles; uses CSS custom properties (design tokens), `max-width: 1100px` containers, warm dark theme with burnt orange accent (`#c86820`), and a full light/dark theme toggle (`[data-theme="light"]`). Fonts: Chakra Petch (display) + Inter (body) via Google Fonts.
- `script.js` — Active nav highlighting (IntersectionObserver), scroll restoration, mobile hamburger nav, project filter by engine/type, project detail modal (supports YouTube embed, local video, or image), header transparency on scroll, and light/dark theme toggle with `localStorage` persistence.

Assets:

- `assets/videos/` — Hero background video (`showreel.webm` / `showreel.mp4`)
- `assets/images/` — Project thumbnails (`assets/images/projects/<slug>/`) and profile photo
- `assets/resume/` — `resume.pdf` linked from the header

Prototype/test files (not part of the shipped site):

- `hero-test.html` — Scratch file for testing hero section features
- `font-test.html` — Scratch file for testing font choices

No external libraries, no npm packages, no framework. Deployment is direct static file hosting (GitHub Pages, Netlify, Vercel, etc.).
