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
- **Blog** (`blog/index.html` listing + `blog/post.html` template) — Markdown-based, client-side rendered with marked.js. See "Writing Blog Posts" below.
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

## Writing Blog Posts

Posts are written in Markdown and rendered client-side by [marked.js](https://cdn.jsdelivr.net/npm/marked/marked.min.js). No build step required.

### To publish a new post:

1. **Create the Markdown file** at `blog/posts/<slug>.md` — write pure Markdown content (no HTML boilerplate needed)
2. **Add an entry to `blog/posts/posts.json`:**
   ```json
   { "slug": "my-new-post", "title": "My New Post", "date": "2026-03-04", "description": "A short summary." }
   ```
3. **Push to GitHub** — that's it

### How it works:

- `blog/posts/posts.json` is the single source of truth for all posts
- `blog/index.html` fetches `posts.json`, auto-sorts by date (newest first), and renders post cards
- `blog/post.html` is the universal post template — it reads `?slug=` from the URL, fetches the matching `.md` file, and renders it with marked.js
- Post URLs follow the pattern: `/blog/post.html?slug=<slug>`

### Conventions:

- **Slugs** should be lowercase, hyphen-separated (e.g., `my-great-post`)
- **Dates** use `YYYY-MM-DD` format
- Markdown files contain **only content** — title, date, and page chrome are handled by the template
- To add images in a post, use standard Markdown: `![alt text](url)`
