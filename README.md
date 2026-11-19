# Nik B Pictures · homepage demo

A single-page site for **Nik B Pictures** (Nikhil Balwadkar Photography), a wedding photography and films studio in Moshi, Pune: "Turning love into timeless frames."

It is a pitch demo. Search engines are kept out (demo mode), every studio fact that has not been confirmed is an empty placeholder, and the twelve photographs are stand-ins until the studio's own work is added.

- **Live demo:** https://nikbpictures.vercel.app
- **Design source of truth:** [`DESIGN.md`](DESIGN.md)
- **Photographs:** [`IMAGES.md`](IMAGES.md) (sizes, composition notes, how to replace them)
- **What to confirm with the studio before launch:** [`CLIENT_CHECKLIST.md`](CLIENT_CHECKLIST.md)
- **Conventions for anyone (or any AI assistant) editing the code:** [`CLAUDE.md`](CLAUDE.md)

## What is on the page

| Section | What it does |
|---|---|
| Intro | First visit only: the NB monogram draws in while the aperture inside the B turns, then a six-bladed iris opens onto the hero. Click, scroll or a key skips it. |
| Hero | Art-directed photo (portrait and landscape crops). On large screens, scrolling turns the screen into a framed print. A WebGL "liquid light" follows the cursor. |
| Marquee | The services in italic, speeding up and reversing with your scroll. |
| The monogram | The studio's NB mark set large with its reading ("NB · Nikhil Balwadkar", "Photo / Cinematic / Stories"); the paragraph develops word by word. |
| Cinematic stories | The page cuts to black like a cinema screen. A pinned horizontal film roll on desktop, a swipe carousel on phones; any frame opens full screen. |
| What we capture | An index of six services; hovering shows a floating photo. Each row opens WhatsApp with a message about that service. |
| Behind the lens | A print that develops as it scrolls into view, with the studio's own figures counting up. |
| How we work | Four steps on a gold thread; each numeral fills with ink as the thread reaches it. |
| Kind words | A card stack you can drag, or move with the buttons and arrow keys. |
| Instagram | A contact sheet of frames that converge as you arrive. |
| Booking | Names, date, city and functions compose a WhatsApp message, shown live before it is sent. The studio's own booking form is one tap away, and its WhatsApp catalogue ("See packages") appears once the number is set. Nothing is sent by the site itself. |
| Footer | Links, official social marks and the studio name set to the page width, on black. |

Also: a floating WhatsApp button, a custom cursor and scrollbar on desktop, film grain, a 404 page ("Lost frame."), link previews for WhatsApp and social apps, and structured data for search engines (no rating, no price).

## Run it locally

Needs Node.js 20.9 or later.

```bash
npm install
npm run dev          # http://localhost:3000
```

`npm run dev` and `npm run build` first:

1. download the Zodiak display font from Fontshare into `src/fonts/vendor` (needs a connection on the first run; cached in `.next/cache/fontshare` afterwards);
2. create a marked placeholder for any missing photo in `/images`, and convert slot-named PNG or JPG files to WebP.

**On your phone:** with the phone on the same Wi-Fi, open the "Network" address that `npm run dev` prints (for example `http://192.168.1.20:3000`). `next.config.ts` allows this computer's own network addresses automatically, so restart `npm run dev` if the computer's address changes.

Production build and server:

```bash
npm run build
npm run start        # http://localhost:3000
npm run start:qa     # same build on port 3107, used by the tests and Lighthouse
```

## Edit the content

All copy and studio details live in **`src/content/site.ts`**. Components never hard-code text.

- **Studio facts** (`studio`): the display name ("Nik B Pictures"), the full name ("Nikhil Balwadkar Photography"), the owner, the studio's own figures (11+ years, 450+ weddings, from its bios) and the booking form link. Phone, WhatsApp number, email and street address start as `null`, and anything left `null` stays hidden.
- **Ratings** (`trust`): stored, but hidden while `trust.show` is `false`. See `CLIENT_CHECKLIST.md` before turning it on.
- **Reviews** (`testimonials`): three placeholders, each tagged "placeholder" on the page. Replace them with real reviews (with permission) and set `placeholder: false`.
- **WhatsApp:** set `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits with country code). Until then, every WhatsApp button opens WhatsApp in share mode with the message already written, so the demo still works. Setting it also shows "See packages", which opens the studio's WhatsApp catalogue.

Photographs, their alt text, focal points and scrim strengths live in **`src/content/images.ts`**. See `IMAGES.md`.

## The logo

`brand/source/nikb-logo-mockup.png` is the studio's logo as published on its profiles. `npm run logo:trace` traces the NB monogram from it, splitting the aperture inside the B from the letters so it can turn on its own, and writes:

- `public/brand/nb-monogram-sprite.svg`: the paths the page uses, served once and cached;
- `src/components/brand/monogram-paths.ts`: the same paths for the icons and the link card (server only);
- `src/components/brand/monogram-geometry.ts`: the frame and the aperture's centre;
- `brand/nb-monogram.svg`: the monogram as a standalone SVG for the studio;
- `brand/qa/trace-compare.png` (git-ignored): the source beside the traced result, to check by eye.

When the studio supplies its original vector file, replace the generated paths with the real outlines (keeping the letters and the aperture apart).

## Environment variables

Copy `.env.example` to `.env.local` for local work.

| Variable | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, link previews, sitemap and structured data | Vercel's production URL, then `https://nikbpictures.in` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Studio WhatsApp number, digits only, e.g. `91XXXXXXXXXX` | empty: share mode, no "See packages" |
| `NEXT_PUBLIC_DEMO_MODE` | `true` keeps the site out of search results (noindex). Set `false` at launch. | `true` |
| `OG_IMAGE_SOURCE` | Optional: preview the link card with another photo at build time | `images/hero-desktop.webp` |

Leave `NEXT_PUBLIC_SITE_URL` unset on Vercel until a domain is registered and pointed at the project; the production URL is used automatically.

## Deploy

The demo runs on Vercel as the project `nikbpictures`, connected to this repository, so every push to `main` redeploys https://nikbpictures.vercel.app. Its environment sets `NEXT_PUBLIC_DEMO_MODE=true`.

- Never link this folder to another studio's Vercel project; `.vercel/` is git-ignored and belongs to this machine.
- From the terminal instead: `npx vercel` (preview) and `npx vercel --prod` (production).
- At launch: register the domain in the studio's name, add it in Vercel (Project, Settings, Domains), set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_DEMO_MODE=false`, and redeploy.

## Quality checks

```bash
npm run lint           # ESLint, zero warnings allowed
npm run typecheck      # route types + TypeScript
npm run preflight      # copy rules: no em or en dashes, no filler words, at most one middle dot per line
npm run images:check   # which photo slots are real, placeholder or missing
npx playwright test    # needs `npm run build`; starts the server on port 3107 if it is not running
npm run lh:mobile      # Lighthouse against `npm run start:qa`
npm run lh:desktop
```

The Playwright suite (Chromium) covers the mobile menu, axe WCAG 2.2 A/AA scans (390 and 1440px, reduced motion, menu and date picker open, the 404 page), reduced motion, a clean console through the intro and the story viewer, hero contrast measured on real pixels, the booking form and its WhatsApp text, the review stack, the scroll rail (also on a first visit, after the intro, and over the black bands), resilience without scripts and horizontal overflow. `SHOT_WIDTHS=all` sweeps 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920px.

## Project structure

```
brand/                  the published logo (source) and the traced monogram SVG
images/                 the 12 photo slots (see IMAGES.md); PNG/JPG originals are git-ignored
public/                 grain texture
scripts/                fonts, logo tracing, image placeholders and checks, copy preflight
src/app/                layout, page, 404, page-transition template, link-preview images, icons, manifest, robots, sitemap
src/components/brand/   the NB monogram, lockup and signature
src/components/layout/  nav, mobile menu, footer, preloader, smooth scroll, cursor, grain, floating WhatsApp
src/components/sections/ one file (or a server + client pair) per section
src/components/ui/      buttons, headings, image reveals, crop marks, brand marks
src/components/webgl/   the lazy hero shader
src/content/            site.ts (copy and facts), images.ts (photos)
src/lib/                GSAP setup, media queries, scroll helpers, WhatsApp links, fonts, SEO
tests/                  Playwright specs
```

## Troubleshooting

- **Port 3000 is busy:** another local project may be using it. Run `npx next dev --port 3001`. Tests and Lighthouse use port 3107.
- **Port 3107 is busy:** another local project built from the same template may be serving there, and Playwright would test that site instead. Run `QA_PORT=3117 npx playwright test` (the config reads `QA_PORT`) and point Lighthouse at the same port.
- **On a phone the nav never appears and nothing animates:** the page's scripts are not running. With `npm run dev`, open the "Network" address it prints and restart the dev server if the computer's address changed. If scripts fail anyway, the nav and the content still appear after about four seconds, without animation.
- **A CSS change does not show up:** Turbopack's cache can occasionally serve a stale stylesheet. Stop the server, run `npm run clean`, then start it again.
- **The font download fails:** check the connection to `api.fontshare.com`, then build again. Nothing is committed, so every machine downloads its own copy once.
- **`EBUSY` or `EPERM` errors in a OneDrive folder:** pause OneDrive sync while working, or move the project outside the synced folder.
- **Lighthouse reports `NO_NAVSTART`:** an intermittent trace failure in headless Chrome on Windows. Run it again, or point it at Playwright's Chromium with `CHROME_PATH`.

## Credits and licenses

| Asset | License or source |
|---|---|
| Zodiak | Indian Type Foundry, ITF Free Font License: self-hosting allowed; no redistribution or modification. Downloaded at build time, never committed. |
| Hanken Grotesk, DM Mono, Tiro Devanagari Marathi | SIL Open Font License (via `next/font`) |
| Brand marks | simple-icons (CC0); the marks belong to their owners and are used unaltered |
| Icons | Phosphor |
| Animation | GSAP (free standard license), Motion, Lenis, OGL |
| Logo tracing | potrace (GPL-2.0), a development tool only; its output is the studio's own mark |
| NB monogram | The studio's own logo, traced from its published version |
| Photographs | Stand-ins until the studio supplies its own |
