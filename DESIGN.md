# DESIGN.md · Nik B Pictures

> **Timeless frames, in cream and ink.** Turning love into timeless frames.

This is the design specification for the Nik B Pictures homepage (Nikhil Balwadkar Photography). Code follows it; when the two disagree, fix the code or update this file deliberately. Tokens live in `src/app/globals.css` (Tailwind v4 `@theme`) and, for non-CSS contexts, `src/lib/tokens.ts`.

## 1. Visual Theme & Atmosphere

**Style:** editorial cinema on cream, taken straight from the studio's logo: a cream disc, black lettering and a thin gold ring.
**Keywords:** monogram, aperture, cream card, black ink, gold ring, film roll, contact sheet, viewfinder, Marathi, cinematic.
**Tone:** warm, quiet, confident, cinematic. Not: glossy, bridal-pink, ornate, template-luxury.
**Feel:** a cinema foyer in daylight: cream walls, black type, a gold rail, and the lights going down when the film starts.

**Concept**
- The logo's tagline is "Photo / Cinematic / Stories", and the page follows it.
- The hero is the *viewfinder*; scrolling turns it into a *print* ("screen to print").
- The B in the monogram holds a six-bladed *aperture*: it turns into place in the intro, and a six-sided iris opens onto the hero.
- The stories are a *film roll*, screened in the dark: the page cuts to noir for them, on a clean edge like the edge of a screen, and back to cream after.
- The Instagram wall is a *contact sheet*.
- Behind the lens *develops* in the tray.
- Ink carries every action; gold, from the logo's ring, is the only ornament.

**Signature motif, used sparingly:**
- mono frame counters (Fr. 001);
- EXIF readouts in spaced columns;
- thin gold crop marks at frame corners;
- contact-sheet rebate numbers under tiles;
- fine film grain.

Captions always sit outside photographs, never as pills over them.

**Interaction tier:** L3 (immersive): GSAP + ScrollTrigger + SplitText + ScrambleText, Lenis smoothing, Motion for UI state, one OGL WebGL moment (lazy, desktop only).
**Dials (taste-skill):** DESIGN_VARIANCE 7, MOTION_INTENSITY 8, VISUAL_DENSITY 3.

## 2. Color Palette & Roles

```css
:root {
  /* Surfaces: the logo's cream */
  --color-paper: #f2ece4;       /* page base */
  --color-paper-deep: #e8e0d5;  /* alternate bands, print backdrop */
  --color-ivory: #faf7f2;       /* raised surfaces, glass tint, text on dark */

  /* Text and actions: the logo's black */
  --color-ink: #16140f;         /* all headings, body and primary buttons */
  --color-ink-soft: #5b554c;    /* secondary text, captions, placeholders */
  --color-ink-lift: #2c2721;    /* primary button hover */

  /* Ornament: the logo's gold ring */
  --color-gold: #b39565;        /* hairlines, crop marks, thread, progress, today dot. Never text on cream. */
  --color-gold-deep: #7a5e36;   /* its text-safe tone: hovered titles, active index, the Marathi line, links */

  /* Function */
  --color-error: #8e2a1e;       /* form errors only, always with an icon */
  --color-noir: #0f0e0b;        /* the cinema bands (Stories, footer) */

  /* Lines */
  --color-line: rgb(22 20 15 / 0.12);        /* dividers */
  --color-line-strong: rgb(22 20 15 / 0.55); /* input borders, control outlines */

  /* RGB helpers for alpha */
  --paper-rgb: 242 236 228;
  --paper-deep-rgb: 232 224 213;
  --ivory-rgb: 250 247 242;
  --ink-rgb: 22 20 15;
  --gold-rgb: 179 149 101;
  --noir-rgb: 15 14 11;

  /* Brand marks, used only inside their official logos */
  --color-wa-green: #25d366;
  --color-wa-black: #111b21;
  --color-fb-blue: #0866ff;
  --color-fb-f: #ffffff;
  --color-ig-1: #feda75; --color-ig-2: #fa7e1e; --color-ig-3: #d62976; --color-ig-4: #962fbf; --color-ig-5: #4f5bd5;
  --color-yt-red: #ff0000;
  --color-pin-red: #bd081c;
  --color-threads: #000000;
}
```

**The noir scope.** `.theme-noir` swaps the tokens inside the Stories section and the footer, so components keep their classes: `paper` becomes noir, `paper-deep` `#1a1713`, `ivory` `#1f1b17`, `ink` cream (`#f2ece4`), `ink-soft` `#b8afa2`, `ink-lift` `#ded5c8`, `gold-deep` `#c9ab78`, the lines turn cream at low alpha, and the RGB helpers follow. Gold stays gold. The primary button inverts by itself (cream pill, noir label).

**Measured contrast (WCAG 2.x):**

| Pair | Ratio | Use |
|---|---|---|
| ink on paper / paper-deep / ivory | 15.68 / 14.07 / 17.22 | all text |
| ink-soft on paper / paper-deep / ivory | 6.28 / 5.64 / 6.90 | captions (12px mono), helpers, placeholders |
| gold-deep on paper / paper-deep / ivory | 5.14 / 4.61 / 5.64 | hovered service titles, active index, links, the Marathi line |
| ivory on ink / ink-lift | 17.22 / 13.85 | primary button label, rest / hover |
| error on paper / ivory | 7.16 / 7.86 | error text, always with an icon |
| gold on paper | 2.42 | decorative only |
| ink on gold | 6.49 | (available for a gold pill) |
| cream on noir / noir raised | 16.45 / 14.58 | text in the cinema bands |
| ink-soft (noir) on noir / noir paper-deep | 8.91 / 8.24 | captions in the cinema bands |
| gold-deep (noir) on noir, gold on noir | 8.81, 6.81 | links and ornaments in the cinema bands |
| ink on light nav glass, ivory on dark nav glass | as Ashugraphy's template, measured over the hero photos | nav |
| ivory hero copy over the photo and its scrims, measured on pixels | ≥ 4.62 small text, ≥ 3.64 title | hero, re-measured by `tests/contrast-over-image.spec.ts` |
| WhatsApp green on paper | 1.70 | FAB gets a 1px line-strong ring |

**Color rules**
- Components reference tokens only. Tailwind's default palette is cleared (`--color-*: initial`), so a stray `bg-blue-500` cannot compile into anything.
- Ink is the colour of action: primary buttons, checked chips, the chosen date. Gold never fills a button on cream.
- No pure white or black surfaces. The exceptions are the glass highlight (`rgb(255 255 255 / .5)`) and the white or black inside the official brand marks.
- No decorative gradients. The noir bands meet the cream page on a clean, straight edge: a fade between cream and noir passes through muddy greys and reads as a smudge. Ink scrims over photographs exist only for legibility, flat at full strength under the copy; their strengths are set per photo in `src/content/images.ts` and proven by `tests/contrast-over-image.spec.ts`.

## 3. Typography Rules

All fonts are self-hosted through `next/font` (no third-party requests, no layout shift). The display face is downloaded at build time from Fontshare by `scripts/fetch-fonts.mjs`, because its license forbids redistribution and modification.

| Role | Font | Loading | Fallback stack |
|---|---|---|---|
| Display | Zodiak, official static faces: Light 300 and Regular 400 | Light preloaded; Regular on demand | "Times New Roman", serif (metric-adjusted) |
| Emotional italics | Zodiak Light Italic 300 | on demand | as above |
| UI and body | Hanken Grotesk (variable) | preloaded, latin | Arial, sans-serif (metric-adjusted) |
| Captions, EXIF, counters | DM Mono 400 | on demand, latin + latin-ext | ui-monospace, monospace |
| Devanagari (the booking line) | Tiro Devanagari Marathi 400 | after the page has loaded (or when its text nears the viewport) | Nirmala UI, Kohinoor Devanagari, Noto Sans Devanagari |

Zodiak's high-contrast serif sits naturally beside the monogram's own letterforms.

| Token | Size | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `text-hero` | clamp(3rem, 0.9rem + 8.6vw, 9rem) | 300 | 0.92 | -0.035em | hero h1 (two lines in the container) |
| `text-display` | clamp(2.5rem, 1.2rem + 4.6vw, 6.5rem) | 300 | 0.98 | -0.025em | section h2 |
| `text-lead` | clamp(1.625rem, 0.9rem + 2.9vw, 4rem) | 300 | 1.12 | -0.015em | manifesto |
| `text-h3` | clamp(1.5rem, 1.1rem + 1.4vw, 2.5rem) | 400 | 1.15 | -0.01em | story, step, card titles |
| `text-body-lg` | clamp(1.0625rem, 1rem + 0.35vw, 1.25rem) | 450 | 1.55 | 0 | hero sub, intros |
| `text-body` | clamp(1rem, 0.96rem + 0.2vw, 1.125rem) | 450 | 1.6 | 0 | body |
| `text-sm` | 0.875rem | 450 to 500 | 1.5 | 0 | UI labels, nav |
| `text-caption` | 0.75rem (mono) | 400 | 1.4 | +0.06em | EXIF, counters, rebates (mixed case) |

**Typography rules**
- Italic is reserved for the two emotional words (*frames* in the hero, *frame* in the booking title), romanised Marathi terms and the marquee. Never italicise for decoration.
- Body measure stays at or under 62ch.
- Split-text line masks pad `0.08em` above and `0.18em` below, so italic descenders never clip.
- Mono captions are mixed case. **One exception to "no all-caps":** the brand signature (`.brand-caps`: Hanken 500, uppercase, tracking 0.32em) for the handle in the intro, because the logo sets its own lines that way.
- `lang="en-IN"` with British spelling (colour, centre). Devanagari spans carry `lang="mr"`.
- **Never use:** Inter, Roboto, Poppins, Montserrat, Playfair Display, Cormorant, Arial as a primary face.

**Text decoration:** editorial light style, so there is no gradient text and no text shadow on any heading or body text.

## 4. Component Stylings

Every interactive component has designed default, hover, active, focus-visible and disabled states. Hover applies only on devices that can hover (Tailwind v4 default).

### The monogram
- The NB mark is traced from the studio's published logo (`npm run logo:trace`, see README). Its paths are served once as a cached sprite (`public/brand/nb-monogram-sprite.svg`, 9.6 KB compressed); every mark is a `<Monogram />` that references it, so it takes `currentColor`: ink on cream, ivory over photographs and on noir.
- The six aperture blades sit in their own group (`[data-aperture]`) and turn about the aperture's centre. They move in exactly two places: the intro (-90° to 0°) and the monogram section (-120° to 0°). Everywhere else the mark is still.
- **Lockup** (nav pill, mobile menu): the monogram at 26px tall beside "Nik B Pictures" in Zodiak 20px.
- Minimum size 20px tall; clear space of half the B's width. Gold is used only for the ring (icons, link card). Never stretch the mark or add effects to it.

### Buttons
```css
/* Primary: ink pill with a nested circle holding the icon (button-in-button). */
.btn-primary {
  display: inline-flex; align-items: center; gap: 0.75rem;
  padding: 0.375rem 0.375rem 0.375rem 1.375rem; min-height: 3.25rem;
  border-radius: var(--radius-pill);
  background: var(--color-ink); color: var(--color-ivory);
  font: 500 var(--text-sm)/1.2 var(--font-sans);
  transition: background-color 250ms var(--ease-ui), transform 150ms var(--ease-ui);
}
.btn-primary .btn-icon { /* ivory circle, 2.5rem; the WhatsApp glyph stays its official green */ }
.btn-primary:hover { background: var(--color-ink-lift); }
.btn-primary:hover .btn-icon { transform: translate(2px, -1px) scale(1.05); }
.btn-primary:active { transform: scale(0.98); }
.btn-primary:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 4px; }

/* Ghost: outline pill for secondary actions (Instagram, Booking form, See packages, Call). */
.btn-ghost { border: 1px solid var(--color-line-strong); background: transparent; color: var(--color-ink); }
.btn-ghost:hover { background: rgb(var(--ink-rgb) / 0.05); }

/* On photographs, the ghost gets an ink fill so its label keeps 4.5:1. */
.btn-ghost[data-tone="dark"] { border-color: rgb(var(--ivory-rgb) / 0.4); background: rgb(var(--ink-rgb) / 0.6); color: var(--color-ivory); }
```
Labels roll on hover (two stacked spans, `.label-roll`, 450ms cinematic). With reduced motion, only the colour changes.

### Cards (double bezel, testimonial cards and the booking form)
```css
.card-shell { padding: 6px; border-radius: var(--radius-card); background: var(--color-paper); box-shadow: 0 0 0 1px var(--color-line), var(--shadow-card); }
.card-core { border-radius: var(--radius-card-inner); background: var(--color-ivory); box-shadow: var(--shadow-card); padding: 2rem; }
```

### Navigation (floating glass pill)
- The lockup on the left, five section links, the "Reserve a date" WhatsApp pill.
- **Tone:** `[data-tone="dark"]` over photographs and the noir bands (ivory text, ink 66% tint); light elsewhere.
- **Scrolling:** hidden while scrolling down past 120px, shown on scroll up, compact (scale 0.96) once scrolled.
- **Mobile menu:** the pill morphs into a sheet; the section you are in carries `aria-current="location"` and a gold-deep index number.

### Links
`.link-draw` draws a 1px underline from the left on hover or focus and retracts to the right (420ms cinematic).

### Scrollbar
On mouse and trackpad devices the page scrollbar is the site's own (`ScrollRail`); touch devices keep their native overlay scrollbars. Inner scroll areas keep a native bar in the site's colours (gold while dragged).
- **Rail:** a 1px gold hairline down the right edge (8px from top and bottom) at 55%, 90% while the page moves or under the pointer. The 16px strip around it is the hit area.
- **Pill:** 5px wide, ink with a 1px cream ring, 85% at rest and full while scrolling, so it reads on paper and on photographs. While it sits over a noir band (the stories, the footer) it turns cream with a noir ring; the rail works this out from the band under the middle of the pill. On hover it widens (scaleX 1.6); dragged, it turns gold. Its length is the share of the page in view (at least 40px).
- **Measuring:** the rail and the nav measure the page through ScrollTrigger. Measurements taken while the intro (or an overlay) holds the page are redone when it lets go, so both work on a first visit too.

### Inputs
```css
.field { min-height: 3.25rem; padding: 0.75rem 1rem; border-radius: var(--radius-field);
  border: 1px solid var(--color-line-strong); background: var(--color-ivory); color: var(--color-ink); }
.field:hover { border-color: var(--color-ink); }
.field:focus-visible { outline: 2px solid var(--color-ink); outline-offset: 2px; }
.field[aria-invalid="true"] { border-color: var(--color-error); box-shadow: inset 0 0 0 1px var(--color-error); }
```
Labels above, 16px text (no iOS zoom), helper below; errors in `error` with a WarningCircle icon, wired with `aria-describedby`. The message preview is built from the same template as the sent text ("Hi Nikhil! ...").

### Date picker (wedding date)
The site's own calendar (a native modal dialog): a popover from 640px, a bottom sheet below. The calendar well turns ink on hover and while open; today has a **gold** dot; the chosen day sits on an **ink** disc that glides to a new choice. Keyboard, motion and range as before (arrows, Home/End, Page Up/Down, Escape; today to the end of the fifth year ahead).

### Chips (functions in the booking form)
Real checkboxes styled as pills, at least 44px tall. Default: a line-strong ring and a plus. Hover: ink ring. **Checked: an inverted pill, ink fill and ivory label**, and the plus turns into a check (transform and opacity only), so the state never relies on colour alone. Focus: the 2px ring.

### Brand marks
- Original paths from simple-icons, rendered server-side; never recoloured, rotated or animated.
- Instagram: gradient glyph. Facebook: blue circle with a white "f". WhatsApp: green glyph on ivory in buttons, white on the green FAB. YouTube: the red mark with its play triangle kept white. Pinterest: the red disc with its "P" kept white. Threads: black on cream, ivory on noir.

## 5. Layout Principles

**Container:** max width 90rem (1440px); side padding `--gutter` = clamp(1rem, 0.6rem + 1.8vw, 2.5rem); text measure ≤ 62ch.
**Spacing:** 4px base scale; section padding `--section-y` = clamp(6rem, 3rem + 9vw, 12rem).
**Grid:** 12 columns at ≥1024px (gap 24px), 6 at 768px, 4 below.

**Layout families:** every section uses a different one.

| Section | Layout family |
|---|---|
| Hero | full-bleed pin-scrub |
| Marquee | kinetic strip |
| The monogram | ornament + scrubbed paragraph + floating prints, with the logo's line (Photo / Cinematic / Stories) as a short numbered list under the first print, so both columns end together |
| Cinematic stories | horizontal roll (desktop) / snap carousel (mobile), on noir |
| Services | index list + cursor preview |
| Behind the lens | 5/7 split (the only split on the page) |
| How we work | staircase timeline with a drawn thread |
| Kind words | card stack |
| Instagram | contact-sheet grid |
| Booking | full-bleed background + form card |
| Footer | link columns + fitted wordmark, on noir |

**Cinema bands:** the Stories section and the footer are noir (`.theme-noir`) and meet the cream page on clean, straight edges, never a gradient.

**Radii** apply to UI chrome only: pills 999px, mobile sheet 28px, cards 22px / 16px, fields 14px, hero print end state 18px. Photographs are sharp prints: radius 0, no shadows.

## 6. Depth & Elevation

| Level | Treatment | Use |
|---|---|---|
| Flat | none | sections, photographs |
| Hairline | `0 0 0 1px var(--color-line)` | dividers, card shells, glass edge |
| Glass | backdrop blur 18px + saturate 1.4 over tint, `--shadow-glass` | nav, mobile sheet edge |
| Card | `--shadow-card` | testimonial cards, form card |
| Float | `--shadow-fab` | WhatsApp button |
| Overlay | ink 40% backdrop | open mobile menu; the story viewer dims with noir 70% |
| Cinema band | `.theme-noir` surface | Stories, footer |

**Layers:** content 0, floating service preview 20, FAB 60, nav 70, menu backdrop 80, menu sheet 90, grain 95, cursor 96, preloader 100. Dialogs use the native top layer.

## 7. Animation & Interaction

**Philosophy:** motion only tells the story (aperture, screen to print, develop, roll, contact sheet) or confirms an action. One orchestrated moment per viewport. Only transform, opacity and clip-path animate (the process thread's dash offset and the cursor's tone colour are the documented exceptions).

**Dependencies:** `gsap` 3.15 (ScrollTrigger, SplitText, ScrambleText, CustomEase), `@gsap/react` (useGSAP), `motion` 14 (LazyMotion + `m`, async domMax), `lenis` 1.3 (ReactLenis root), `ogl` (hero shader, lazy).

**Engine ownership:** GSAP owns scroll, text and image choreography; Motion owns UI state (nav, menu, presence, drag, magnetic). Every element is owned by exactly one engine.

### Tokens
| Kind | Value |
|---|---|
| Eases | `cinematic` cubic-bezier(0.16, 1, 0.3, 1); `expo.out`; `power4.out`; exits `power2.in`; CSS UI `cubic-bezier(0.32, 0.72, 0, 1)` |
| Durations | micro 150 to 250ms, UI 300 to 500ms, reveals 0.9 to 1.4s, exits about 65% of their entry |
| Springs (Motion) | nav pill 380/32, menu morph 300/30 (close 380/36), magnetic 150/15 mass 0.1, card stack 260/26, FAB 420/30 |
| Staggers | lines 0.08s, menu links 0.05s, tiles 0.04 to 0.05s, intro handle 0.025s |
| Scrub | 0.5 to 0.8 for smooth catch-up |

### Intro (first visit per session)
The monogram wipes in left to right (clip-path, 0.9s cinematic) while the aperture turns from -90° to 0° about its centre; the handle (`@nik_b_pictures` in `.brand-caps`) rises from character masks; a gold hairline fills with real progress (fonts and the hero photo decoding, capped at 1s, at least 0.9s on screen). Then a six-sided iris opens onto the hero. Click, scroll or a key skips it.

### Entrance
Text rises from SplitText line masks (`yPercent 110 → 0`, 1.1s expo.out, stagger 0.08). Images reveal with clip-path wipes plus an inner scale of 1.2 → 1 (1.3s cinematic). The monogram section wipes the mark in (1.4s) while the aperture turns 120° into place.

### Scroll
- **Desktop only (≤2 pins):** the hero pin "screen to print" (scale 1 → 0.62, radius 0 → 18px) and the stories horizontal roll (`ease: "none"` + `containerAnimation` for inner parallax).
- **Scrubs:** the manifesto word reveal (from half to full opacity), the process thread, the developing print, parallax on the manifesto prints.
- **Touch devices:** light parallax and fades only, no pins.

### Hover and focus
Image hover: inner image to 1.03 over about 0.8s. Buttons: label roll, nested circle nudge, magnetic on fine pointers. Links: underline from the left. Focus: a designed 2px ring (ink on cream, cream on noir and photographs).

### Special effects
- The aperture intro and iris (above).
- ScrambleText EXIF readout.
- Velocity-driven marquee, aperture glyphs between the services.
- Cursor follower with View/Drag/Open labels (fine pointer only, native cursor stays); it turns cream over the noir bands.
- Film grain with a stepped transform flicker.
- OGL flowmap "liquid light" over the hero (lazy, large fine-pointer screens only, off in the print state).

### Reduced motion
No smoothing, scrub, pin, parallax, marquee velocity, cursor or WebGL; SplitText does not split; every `[data-reveal]` gets a single 200ms fade; the intro shows the monogram and fades out. `tests/reduced-motion.spec.ts` checks this.

## 8. Do's and Don'ts

### Do
- Let photographs lead; type and chrome stay quiet.
- Use ink for every action and gold only for hairlines, crop marks, the thread, the ring and ornaments (gold-deep when gold must be read).
- Keep captions, counters and EXIF outside photographs.
- Measure every text-over-photo scrim with `tests/contrast-over-image.spec.ts`.
- Design focus states as carefully as hover states, on cream and on noir.
- Give every effect a reduced-motion equivalent.
- Keep brand marks official, upright and static; keep the monogram still outside the intro and its own section.

### Don't
- ❌ Use an em dash or en dash anywhere, including alt text (`npm run preflight` fails the build check).
- ❌ Use pure white or pure black surfaces.
- ❌ Add decorative gradients, glows or text shadows, including fades between cream and noir.
- ❌ Overlay pills, tags or labels on photographs.
- ❌ Round, shadow or border photographs (prints are sharp).
- ❌ Animate blur, width, height, top or left.
- ❌ Track continuous values in React state or add window scroll listeners.
- ❌ Hard-code hex values in components.
- ❌ Show prices, put ratings in JSON-LD, or state facts the studio has not confirmed.
- ❌ Add a second marquee, an autoplaying carousel or any attention-seeking loop.
- ❌ Redraw, recolour, rotate or animate the third-party brand marks, or stretch the monogram.

## 9. Responsive Behavior

| Name | Width | Key changes |
|---|---|---|
| Phone | < 768px | single column; H1 in 4 lines at the top, CTAs at the bottom; stories become a snap carousel; services become an accordion; Instagram 2 columns; no pins, no cursor |
| Tablet | 768 to 1023px | 6-column grid; still touch behaviour (no pins); badge visible |
| Desktop | ≥ 1024px | 12-column grid; pins and scrubbed transforms on fine pointers; cursor follower; services cursor preview |
| Wide | ≥ 1440px | container caps at 1440px; hero type caps at 9rem |

- **Touch targets:** at least 44 × 44px, with at least 8px between targets.
- **Safe areas:** `viewport-fit=cover`; nav, FAB and sheet use `env(safe-area-inset-*)`.
- **Viewport units:** `100svh` for the hero, `100dvh` for the mobile sheet. Never `h-screen`.
- **Collapsing:** every multi-column layout declares its below-768px fallback in the same component. The QA sweep covers 320, 360, 390, 430, 768, 1024, 1280, 1440 and 1920px with no horizontal overflow.
