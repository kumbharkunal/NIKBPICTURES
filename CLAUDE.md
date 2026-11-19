@AGENTS.md

# Nik B Pictures homepage: project conventions

A single-page Next.js 16 demo for Nik B Pictures (Nikhil Balwadkar Photography), a wedding photography and films studio in Moshi, Pune. Read `DESIGN.md` before changing anything visual; it is the design source of truth. `README.md` covers running, deploying and checks; `IMAGES.md` the photo slots; `CLIENT_CHECKLIST.md` what the studio still has to confirm.

## Stack and versions (pinned)
- next 16.4 (App Router, Turbopack, fully static), react 19.3, TypeScript **6.0.3** (TS 7 breaks typescript-eslint), ESLint **9.39** (eslint-config-next's plugins do not support 10). The React Compiler lint rules are on.
- Tailwind v4 via `@tailwindcss/turbopack` in `next.config.ts`. Tokens in `src/app/globals.css` (`@theme`, default palette cleared).
- gsap 3.15 + @gsap/react (ScrollTrigger, SplitText, ScrambleText, CustomEase), motion 14 (LazyMotion + `m` from `motion/react-m`, async `domMax`), lenis 1.3 (`lenis/react`), ogl (lazy hero shader only).

## Rules
- Copy lives in `src/content/site.ts`; images, alt text, focal points, EXIF and scrim strengths in `src/content/images.ts`. Components never hard-code copy or hex values.
- Unknown studio facts are `null` placeholders in `site.ts`; UI that needs them renders only when set. Never invent facts (years, counts, names, prices, ratings).
- `trust.show` gates every rating, rating count and the rating platform link. Ratings never go in JSON-LD (`src/lib/seo.ts`). No prices anywhere.
- Server Components by default; `"use client"` only on interactive leaves. Brand marks come from simple-icons in the server component `BrandIcon` and are passed into client components as props; never redraw or recolour them.
- The studio's NB monogram lives in `src/components/brand`. `npm run logo:trace` generates its paths three ways: `public/brand/nb-monogram-sprite.svg` (served once and cached; every `<Monogram />` references it through `<use>`, so the 25 KB of path data stays out of the HTML and the React payload), `monogram-paths.ts` (server only: the icons and the link card) and `monogram-geometry.ts` (viewBox and aperture centre, safe in client code). Never inline the paths into a component. Only the intro and the monogram section turn the aperture (`[data-aperture]`, `APERTURE_ORIGIN`).
- The cinema bands (Stories, footer) use `.theme-noir`, which swaps the colour tokens inside them. Style everything with tokens and it works on cream and on noir; never write noir-specific colours in components. Fixed colours that must not swap (brand marks, the viewer backdrop) use their own tokens.
- GSAP: import only from `@/lib/gsap` (plugins registered once). Use `useGSAP({ scope })`, `gsap.matchMedia()` with `QUERIES` from `@/lib/media`, and revert on unmount. Pins and scrubbed transforms only under `QUERIES.desktopMotion`; at most two pins (hero, stories).
- Each element is animated by one engine: GSAP for scroll, text and images; Motion for UI state.
- Never call a useGSAP `contextSafe` function from inside a `gsap.matchMedia()` callback (or from another component's GSAP callback): GSAP then nests the parent context in its own child, and the next revert overflows the stack (it shows in `next dev`, where StrictMode reverts on mount). Inside `mm.add((context) => ...)`, bind deferred functions with `context.add("name", fn)`.
- Animate only transform, opacity and clip-path. Never animate blur. No window scroll listeners; use ScrollTrigger or IntersectionObserver.
- Reduced motion: no smoothing (wheel goes back to the browser via Lenis `virtualScroll`), no pins, scrub, parallax, cursor or WebGL; `[data-reveal]` elements get a 200ms fade from `GsapBoot`.
- In-page navigation goes through `scrollToSection()` in `@/lib/scroll` (Lenis with the nav offset). Overlays use `lockScroll()` / `unlockScroll()`; while locked the window reports scroll 0, so section tracking checks `isScrollLocked()`.
- All WhatsApp links come from `waLink()` in `@/lib/whatsapp`. The booking preview and the sent text come from the same template.
- `Button` renders `next/link` for in-site paths (hash links never prefetch) and accepts `wrap` for long labels on phones.
- Text over the hero photo: scrims are flat zones under the copy; tune their strengths per photo in `images.ts` with `tests/contrast-over-image.spec.ts`.
- Copy rules: no em or en dashes anywhere, at most one middle dot per line, British spelling, no filler words. `npm run preflight` enforces this in `src/`; keep the root docs to the same rules.
- React Compiler lint: no `setState` directly in effects, no mutating values returned from hooks, no reading or writing refs during render. Move the work into event handlers, refs or the library's own options.

## Images and fonts
- Slot images live in `/images` (see `IMAGES.md`). `scripts/ensure-images.mjs` creates marked placeholders for missing slots and converts slot-named PNG/JPG files; it never overwrites a real photo. Never delete or overwrite anything in `/images` by hand on the studio's behalf.
- Zodiak is downloaded at build time by `scripts/fetch-fonts.mjs` into `src/fonts/vendor` (git-ignored) as the official static faces (Light, Regular, Light Italic) plus TTFs for the link preview card. Its license forbids redistribution, subsetting and format conversion. Only Light is preloaded.
- Tiro Devanagari is held back until after load (`html.deva-ready`, set by `GsapBoot`); system Devanagari faces are named meanwhile.

## Commands
- `npm run dev` (port 3000), `npm run build`, `npm run build:indexable` (demo mode off, for SEO checks), `npm run start:qa` (port 3107, used by Playwright and Lighthouse)
- `npm run lint`, `npm run typecheck`, `npm run preflight`, `npm run images:check`, `npm run logo:trace` (re-traces the monogram; check `brand/qa/trace-compare.png`)
- Other local projects built from the same template may already serve on 3107, and Playwright reuses whatever answers there. Check the port first; if it is taken, run `QA_PORT=3117 npx playwright test` (the config reads `QA_PORT`) and point Lighthouse at that port.
- `npx playwright test` (Chromium, 32 tests; the QA server on 3107 is reused or started). `SHOT_WIDTHS=all` for the nine-width sweep, `SHOT_WEBKIT=1 ... --project=webkit` for WebKit.
- `npm run lh:mobile` / `npm run lh:desktop` against `start:qa`. If Lighthouse reports `NO_NAVSTART`, run again or set `CHROME_PATH` to Playwright's Chromium.
- Port 3000 may already be used by another local project; QA never relies on it.

## Gotchas
- Turbopack's persistent cache can serve a stale stylesheet after a CSS edit (dev and build). If a CSS change is missing, stop the server, run `npm run clean`, and start again.
- Phones on the Wi-Fi reach `next dev` by this machine's IP; `allowedDevOrigins` in `next.config.ts` lists the machine's own addresses (read at start-up). Without it the dev server withholds its scripts from the phone.
- On mouse and trackpad devices the page scrollbar is `ScrollRail` (the native one is hidden under `html.js`); it tracks the scroll through ScrollTrigger and freezes while `isScrollLocked()`.
- Anything hidden until JavaScript runs needs a CSS failsafe keyed on `.js:not(.gsap-ready)` (reveals, intro, hero clip, nav); `tests/resilience.spec.ts` covers the nav.
- Test contexts set `screen` equal to the viewport and run Chromium on SwiftShader (see `playwright.config.ts`); without that, a fresh headless page can start landscape for an instant and preload the wrong hero.
- While `lockScroll()` holds the page the body is fixed and the document measures one screen tall, so ScrollTrigger refreshes run then collapse every `end: "max"`. The first-visit intro holds the page through the load-time refreshes; `unlockScroll()` fires `SCROLL_UNLOCK_EVENT` and `GsapBoot` refreshes again if anything was measured while held. Most tests skip the intro (`contextFor` sets the session flag), so anything that must work on a first visit needs a test with `skipIntro: false`, like the scroll rail's.
- Keep LF line endings (`.gitattributes` enforces them on commit).
- When an AI agent runs `next build` and a newer Next.js release fixes a security advisory, the build stops once with an upgrade notice ("SecurityFatalError"); the next run continues, and CI and Vercel builds are never stopped by it. Do not just retry: run `npm audit --omit=dev` and patch. (16.4.0 had a critical advisory in the image optimizer, GHSA-2464-fhr4-w9xw; the project is on 16.4.6, which fixes it.)
- Headless desktop Chromium can starve `requestAnimationFrame` while the 2560px hero decodes, so desktop screenshots of the intro show its end state. Check the intro at phone width or by reading its state.
- On Windows, stopping `npm run start` can leave the `next start` child running on its port. Stop it by PID, and only after checking that its command line belongs to this project.

## Deploy
- This repository is `github.com/kumbharkunal/NIKBPICTURES` (public) and deploys to the Vercel project `nikbpictures` (https://nikbpictures.vercel.app) with `NEXT_PUBLIC_DEMO_MODE=true`. Never link it to another studio's Vercel project.
- `PITCH_NOTES.md` and `brand/qa/` are git-ignored on purpose: internal notes and QA output never go into the public repository.

## Git
- One commit per milestone. End commit messages with the attribution line requested by the session.
