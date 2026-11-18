# Client checklist · confirm before launch

Everything the studio needs to confirm, supply or decide. Until an item is answered, the site either hides it or shows a clearly marked placeholder, so the demo never states something the studio has not confirmed.

Most answers are a one-line change in `src/content/site.ts` (copy and facts) or `src/content/images.ts` (photos). Environment variables are set in Vercel (or `.env.local`).

## Decisions to raise first

- [ ] **A domain.** `nikbpictures.in` and `nikbpictures.com` had no DNS records on 18 November 2026. Offer to register one in the studio's own name. At launch: add it in Vercel, set `NEXT_PUBLIC_SITE_URL`, set `NEXT_PUBLIC_DEMO_MODE=false`, redeploy.
- [ ] **The name on the site.** The nav, intro and footer say "Nik B Pictures" (the logo's handle); the page title, structured data and copyright say "Nikhil Balwadkar Photography". Confirm both spellings.
- [ ] **The figures.** "11+ years" and "450+ weddings" come from the studio's own Instagram and Threads bios. Confirm them (`studio.yearsActive`, `studio.weddingsShot`).
- [ ] **Ratings.** The site can show a rating and link to its listing, but shows none (`trust.show: false`). Decide which listing to cite, if any, then update `trust` and switch it on. Ratings never go into the structured data.
- [ ] **The monogram reading.** The section under the hero reads the logo as "NB · Nikhil Balwadkar" and "Photo / Cinematic / Stories". Ask whether they are happy with that wording (`manifesto` in `site.ts`).

## Contact details (all hidden until filled in)

- [ ] **WhatsApp Business number.** Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits with country code). Until then every WhatsApp button opens WhatsApp in share mode with the message already written. Setting it also shows **"See packages"**, which opens the studio's WhatsApp catalogue.
- [ ] **Phone number** (`studio.phone`). Adds a "Call" button in the booking section and a link in the footer.
- [ ] **Email** (`studio.email`). Which address to publish; adds a link in the footer.
- [ ] **Address** (`studio.address`). How much of it to publish. Until confirmed, the site and its structured data only say Moshi, Pune.
- [ ] **Booking form.** The "Booking form" button opens the Google Form linked from the Instagram bio (`studio.bookingFormUrl`). Confirm it is still the one in use.

## Facts and services

- [ ] **The six services:** weddings (at home, resorts and destinations), cinematic films, pre-weddings, sakharpuda and engagement, haldi, mehendi and sangeet, and baby showers and maternity. Adjust `services` if any should change.
- [ ] **NBP Academy.** Behind the lens says Nikhil also mentors photographers and filmmakers through NBP Academy. Confirm the wording (`about.ownerLine`).
- [ ] **The album.** Step 04 of How we work promises "an album made to be handed down". Confirm albums are part of their packages; otherwise adjust the wording.
- [ ] **No prices anywhere.** The site deliberately shows none; every call to action is about checking availability, and packages open in WhatsApp. Keep it that way unless the studio decides otherwise.

## Photographs and reviews

- [ ] **Twelve real photographs**, with permission from the people shown. The current twelve are AI-generated stand-ins: they must be replaced before launch and never presented as the studio's weddings. `npm run images:check` cannot tell a stand-in from a real photo, so check by eye. Sizes and composition notes are in `IMAGES.md`.
- [ ] **Real camera details** for each photo (lens, aperture, shutter, ISO) for the EXIF readouts, or approval to keep them as decorative.
- [ ] **Three real reviews**, with the clients' permission and the attribution style they prefer (for example "Ananya & Rohan, Pune, 2026"). Replace the placeholders in `testimonials` and set `placeholder: false`; the "placeholder" tag then disappears.
- [ ] **Re-check the hero contrast** after the hero photos change: `npx playwright test tests/contrast-over-image.spec.ts` (see `IMAGES.md`).

## Language

- [ ] **Marathi lines and terms.** The booking section opens with सात वचने, एक जीव, अनंत प्रेम (from the studio's own film). The copy also uses mangalashtak, antarpat, pathavani, haldi, mehendi, sangeet, sakharpuda, nauvari, nath and dohale jevan. Ask the studio to confirm spelling and usage.
- [ ] **English spelling** is British (colour, centre), as is usual in India. Confirm they are happy with that.

## Brand and legal

- [ ] **The logo.** The NB monogram on the site is traced from the published logo. Ask for the original vector file (SVG, AI or PDF) and swap it in (see `README.md`, The logo).
- [ ] **Social profiles.** Instagram, Facebook, YouTube, Threads and Pinterest, as linked in `socials`. Confirm all five.
- [ ] **Instagram mark.** Meta publishes the Instagram glyph as an image asset, not as colour values. The site fills the official glyph shape with the usual five gradient colours; for production, swap in the official asset from Meta's brand resources if exactness matters to them. The WhatsApp, Facebook, YouTube, Pinterest and Threads marks use their published colours.
- [ ] **Display font licence.** Zodiak (Indian Type Foundry) is free for commercial web use under the ITF Free Font License, but it may not be redistributed or modified. The font files are downloaded at build time and never stored in the repository.
- [ ] **Developer credit** in the footer (`studio.developerCredit`, name and optional link), if they want one.
- [ ] **Privacy.** The booking form sends nothing to any server: it only opens WhatsApp with a message the visitor sends themselves. No cookies or trackers; Vercel Speed Insights (cookieless) runs only on Vercel.

## At launch

- [ ] Domain added in Vercel; `NEXT_PUBLIC_SITE_URL` set.
- [ ] `NEXT_PUBLIC_DEMO_MODE=false` (this allows search indexing).
- [ ] WhatsApp number set; contact details filled in.
- [ ] Real photos in, checked by eye.
- [ ] Placeholder reviews replaced or removed.
- [ ] `npm run lint`, `npm run typecheck`, `npm run preflight` and `npx playwright test` all pass.
