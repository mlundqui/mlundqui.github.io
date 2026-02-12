# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog website for Michael Lundquist (www.mikelundquist.com). Static HTML/CSS/JavaScript site with no frameworks, no build tools, and no dependencies.

## Development

**Run locally** with any static file server:
```
python -m http.server 8000
# or: npx serve .
```

**Deployment:** GitHub Pages from `main` branch. No build step — files are served as-is. Custom domain configured via `CNAME`.

**No test suite, linter, or build commands exist.**

## Architecture

- **Single-page home** (`index.html`) with hash-anchored sections: `#projects`, `#about`, `#contact`
- **Blog** (`blog/index.html` + `blog/posts/*.html`) — manually maintained. Posts are listed in a JS array in `blog/index.html` and each post is a standalone HTML file.
- **One JS file** (`js/main.js`) handles all interactivity: mobile nav toggle, theme persistence, hero photo flip
- **One CSS file** (`styles/styles.css`) with CSS custom properties for theming

## Theming

Light/dark mode uses `data-theme="dark"` on the `<html>` element. Light is the default (`:root` vars), dark overrides via `html[data-theme="dark"]`. User preference persists in `localStorage`; falls back to `prefers-color-scheme`.

## Conventions

- **HTML:** Semantic elements, BEM-like class naming (`hero__text`, `post-card__title`), ARIA attributes for accessibility
- **CSS:** Custom properties for colors, `color-mix()` for transparency, mobile breakpoint at 860px, `@media (prefers-reduced-motion)` support
- **JS:** Vanilla ES6+, no `var`, optional chaining for safe DOM access, IIFE for scoped features
- **Fonts:** Fraunces (headings), Nunito (body), IBM Plex Mono (code)
- **Git workflow:** `develop` branch → `main` via PR
