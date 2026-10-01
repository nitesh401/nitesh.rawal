# Nitesh Rawal — Portfolio

A 3D, animated single-page portfolio built from your resume. Plain HTML/CSS/JS,
no build step, Three.js loaded from a CDN — drop it straight onto GitHub Pages.

## What's in it
- `index.html` — page structure
- `assets/style.css` — design system (dark + light themes, mobile-first)
- `assets/data.js` — **all your content lives here**: profile, experience, projects, stack, awards
- `assets/app.js` — renders the content, scroll animations, the Three.js network background, photo tilt
- `assets/hero.jpg` — your photo

## Run locally
```
npx serve .
# or
python3 -m http.server
```

## Deploy on GitHub Pages
1. Create a repo (e.g. `nitesh-rawal.github.io` for a root domain, or any name for a project site) and push everything in this folder to the root of `main`.
2. Repo → **Settings → Pages → Build and deployment → Source**: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Your site is live at `https://<username>.github.io/<repo>/` within a minute or two. All paths here are relative, so it works at a sub-path too.
4. Put that URL in your Instagram bio.

## Before you ship it
Open `assets/data.js` and fill in:
```js
links: {
  LinkedIn: 'https://linkedin.com/in/...',
  GitHub: 'https://github.com/...',
  Instagram: 'https://instagram.com/...'
}
```
Any link left blank is simply not rendered in the contact section — no broken buttons.

## Editing content
Everything — stats, career log, projects, the platform/DevOps stack grid, awards —
comes from `assets/data.js`. Change the data there; the layout updates itself.

## About the 3D background
The Three.js scene behind the page is a chain of node clusters — one per section — connected
by a path. As you scroll (mouse wheel, trackpad, touch swipe, scrollbar, keyboard — all of it),
the camera flies along that path in sync with how far down the page you are. It's driven by
normal `scrollY`, not a hijacked/custom scroll handler, so it never fights your browser's native
scroll or back-gesture on mobile and tablet, and it degrades gracefully: node count and canvas
resolution scale down under ~1024px and ~720px widths, and the panels switch from a frosted-glass
look to a solid background on phones to keep things smooth on weaker GPUs.

## Notes
- Respects `prefers-reduced-motion` (disables the 3D flythrough entirely, plus count-up/typing animations).
- Mobile/tablet first: one centered floating dock (Home · Career · Work · Menu · Theme) on every screen size, no side rail.
  The Menu button opens a sheet with all sections. Photo sits right of the intro from ~620px up and stacks below on phones.
  Fewer 3D nodes and no backdrop blur on phones for performance; tablet gets a middle-ground node count.
- Dark and light mode: follows the device setting until the visitor taps Theme; the choice is remembered in the browser.
- No analytics, no trackers, no external calls besides Google Fonts and the Three.js CDN script.
