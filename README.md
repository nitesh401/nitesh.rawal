# Nitesh Rawal — Portfolio

Personal portfolio of **Nitesh Rawal**, Software Engineer II (Java backend) in Hyderabad.
Plain HTML, CSS and JavaScript. No build step, no framework, no npm install. The background is a live 3D Earth rendered with [Three.js](https://threejs.org) (r128, loaded from cdnjs).

- Live site: https://nitesh401.github.io/nitesh.rawal/
- Previous site: https://niteshrawal.is-a.dev/

## What it does

- **Cinematic Earth background.** A textured Earth with clouds, ocean sun-glint, city lights on the night side, a glowing atmosphere, a Moon, a sun that rises over the planet's edge (with a lens flare), a Milky Way band and space dust.
- **Scroll is the camera.** Scrolling flies a virtual camera around the planet along six shots (sunrise limb → terminator → full day side → night side → pull-back). Faster scrolling widens the lens, tilts the camera and spins the planet; dust streams past the lens. The camera has inertia and a slight handheld drift, and the page opens with a slow push-in.
- **Living galaxy under the pointer.** No cursor shape is drawn. Instead, stars near the mouse swirl, flare and warm up, the camera turns slightly towards the pointer (parallax), a trail of stardust fades behind it, and moving sideways nudges the globe's spin. A click or tap sends a ripple through the stars. On touch screens the same happens under your finger.
- **Floating panels.** Cards tilt and drift in depth as they cross the screen, and follow the mouse a little on desktop.
- **Dark and light mode.** Follows the device setting until the visitor taps *Theme*; the choice is remembered. In light mode the sky is pale and the night-side lights are turned off.
- **Mobile and tablet first.** One centered floating dock (Home · Career · Work · Menu · Theme) on every screen size; *Menu* opens a sheet with every section. The profile photo sits to the right of the intro from about 620px wide and stacks below on small phones.
- **Contact form** posts to Formspree (`xvkgpwrl`), exactly as the previous portfolio did.

## Files

```
index.html          page structure, meta tags, <noscript> fallback
assets/style.css    design system: dark + light tokens, layout, mobile-first breakpoints
assets/data.js      ALL content (experience, projects, skills, education, hobbies, awards)
assets/app.js       rendering, theme, dock, contact form, Earth scene and scroll camera
assets/hero.jpg     profile photo
assets/earth/       Earth and Moon textures (1k for phones, 2k for larger screens)
```

## Editing content

Everything shown on the page comes from `assets/data.js`. Change the text there and reload.
Keep it factual: the content was aligned to the previous portfolio and to details Nitesh stated himself, and unverified numbers were removed on purpose. Add a metric only if it can be backed up.
Skill percentages are self-assessed values carried over from the previous site.

### Tuning the background

All of it is in the `cosmos` block at the bottom of `assets/app.js`:

| What | Where |
| --- | --- |
| Camera path, Earth position on screen, lens, roll | `KEYS` array (six shots; `az`/`el` = angle around Earth, `dist`, `sx`/`sy` = on-screen position, `fov`, `roll`, `spin`) |
| Direction of the sun | `SUN` vector |
| Page dimming behind text | `dim` in `PAL.dark` / `PAL.light` |
| Atmosphere colour and strength | `atmo`, `atmoS` in `PAL` |
| Scroll "crazy" amount | `kick` (lens widening, roll, spin) inside `frame()` |
| Pointer swirl strength and radius | `warp()` in the `WARP` shader string (`0.12` swirl, `0.07` push, `6.0` radius) |
| Stardust trail length / amount | `life` and `n` in `spawn()` and the spawn loop; `TN` = particle pool size |
| Turn the pointer effects off | set `var fx = false;` in the `cosmos` block |

## Deploy (GitHub Pages)

1. Push the contents of this folder to the repository root (keep the `assets/` folder and the `.nojekyll` file).
2. In *Settings → Pages* choose the branch and `/ (root)`.
3. Open the Pages URL. Hard-refresh (Ctrl/Cmd + Shift + R) after each update so the browser does not keep old files.

To run locally, serve the folder over HTTP (`python3 -m http.server`) rather than opening `index.html` directly, because the Earth textures are loaded by the browser as files.

## Browser and device support

Designed for current versions of Chrome, Edge, Firefox and Safari on desktop, Android and iOS/iPadOS (WebGL 1 is enough).

| Situation | What happens |
| --- | --- |
| Phones and small tablets | Smaller textures, fewer stars and dust, pixel ratio capped at 1.5, no backdrop blur on panels |
| No WebGL, or the GPU context is lost | The page switches to a CSS-only version: dark sky with a static Earth image; all content still works |
| "Reduce motion" is turned on | No continuous animation: the Earth is rendered once per scroll position, no flare, no tilt, no pointer effects |
| JavaScript disabled | A short note with the contact email is shown |
| Older Safari without `translate`, `inset` or `100svh` | Content still appears (fade only), with fallbacks in the stylesheet |
| Tab in the background | Rendering pauses |
| iPhone notch / home bar | Safe-area insets are respected by the dock and the page |

If the animation feels heavy on an older phone, lower the `dist`-related values or remove the clouds mesh in `app.js`; the rest keeps working.

## Accessibility

- Every control is a real button or link with a visible keyboard focus ring; `Esc` closes the menu.
- Touch targets are at least 46px tall.
- The animated name has an `aria-label`; the decorative background is hidden from assistive tech.
- Colours meet readable contrast in both themes; motion respects `prefers-reduced-motion`.

## Credits

- 3D engine: [Three.js](https://threejs.org) (MIT).
- Earth and Moon textures: taken from the Three.js examples repository (`examples/textures/planets`) and re-compressed. Please check the licence and credit notes in that repository if you reuse or redistribute them.
- Fonts: Space Grotesk, Inter and JetBrains Mono via Google Fonts.
