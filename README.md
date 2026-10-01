# Nitesh Rawal — portfolio

Plain HTML/CSS/JS with Three.js (loaded from cdnjs). No build step. Deploy by pushing these files to GitHub Pages.

## Files
- `index.html` — page structure
- `assets/style.css` — design system (dark + light themes, mobile-first)
- `assets/data.js` — **all content lives here** (experience, projects, skills, education, hobbies, awards)
- `assets/app.js` — rendering, theme, dock, contact form and the cosmos background
- `assets/hero.jpg` — profile photo

## Content
Everything in `data.js` comes from the previous portfolio (niteshrawal.is-a.dev) or details Nitesh stated directly.
Skill levels are the same self-assessed values as before. Add new numbers only when they can be verified.

## Behaviour
- Centered floating dock on every screen size (Home · Career · Work · Menu · Theme); Menu opens a sheet with every section.
- Dark and light mode: follows the device setting until the visitor taps Theme; the choice is remembered.
- Background: a dark metallic planet with thin dark volcanic orbit lines. Scrolling moves the planet across the screen, turns the orbits and shifts the stars; content panels drift in depth as they cross the screen.
- Fewer stars and lower pixel ratio on phones; motion is reduced when the device asks for it; the animation pauses in background tabs.
- Contact form posts to Formspree (`xvkgpwrl`), same as the previous site.
