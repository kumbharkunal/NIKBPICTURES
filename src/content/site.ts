/**
 * All homepage copy and studio facts live here. Edit this file to change wording or fill in
 * details; components never hard-code copy.
 *
 * Voice: warm, short, cinematic. British and Indian English spelling. No em or en dashes.
 * Facts: nothing invented. Figures come from the studio's own public profiles; unknowns are null
 * and their UI stays hidden until a value is set. See CLIENT_CHECKLIST.md.
 */
import type { PhotoKey } from "./images";

export type Placeholder<T> = T | null;

/** A run of text; `italic` marks emotional words, `term` marks romanised Marathi words. */
export interface TextRun {
  text: string;
  italic?: boolean;
  term?: boolean;
}

/* Studio details. Contact details stay null until the studio confirms which ones to publish. */

export const studio = {
  /** The display brand: nav, intro and the footer wordmark. */
  name: "Nik B Pictures",
  /** The full business name: page title, structured data and copyright. */
  fullName: "Nikhil Balwadkar Photography",
  domain: "nikbpictures.in",
  /** Founder and lead photographer, shown in Behind the lens. */
  ownerName: "Nikhil Balwadkar" as Placeholder<string>,
  /** International format for display and tel: links, for example "+91 98XXX XXXXX". */
  phone: null as Placeholder<string>,
  /** Digits with country code. NEXT_PUBLIC_WHATSAPP_NUMBER takes priority when set. */
  whatsappNumber: null as Placeholder<string>,
  email: null as Placeholder<string>,
  address: null as Placeholder<string>,
  /** From the studio's own bios: "11+ Years of Capturing Love" and "Covered 450+ weddings". */
  yearsActive: 11 as Placeholder<number>,
  weddingsShot: 450 as Placeholder<number>,
  citiesCovered: null as Placeholder<number>,
  /** The bios state both figures as minimums, so they count up to "11+" and "450+". */
  statSuffix: "+",
  /** The studio's own enquiry form, linked from its Instagram bio. */
  bookingFormUrl: "https://forms.gle/YGuGwM4UiMDnJBox9" as Placeholder<string>,
  /** The studio keeps a WhatsApp Business catalogue. "See packages" appears once the number is set. */
  whatsappCatalogue: true,
  developerCredit: null as Placeholder<{ name: string; url: Placeholder<string> }>,
  serviceArea: "Based in Moshi, Pune. Weddings at home, at resorts and at destinations, across Maharashtra and beyond.",
} as const;

/**
 * Ratings appear only when `show` is true. Values were checked on the claimed public listing on
 * the date below. Ratings never go in the structured data.
 */
export const trust = {
  show: false,
  platform: "Justdial",
  rating: 4.6,
  reviewCount: 11,
  url: "https://www.justdial.com/Alandi/Nikhil-Balwadkar-Photography-Near-Nageshwar-Mandir-Moshi/020PXX20-XX20-220903062215-V4L9_BZDET" as Placeholder<string>,
  checkedOn: "2026-11-18",
} as const;

export const socials = {
  instagram: {
    handle: "@nik_b_pictures",
    url: "https://www.instagram.com/nik_b_pictures/",
    directMessage: "https://ig.me/m/nik_b_pictures",
  },
  facebook: { url: "https://www.facebook.com/nikhil.balwadkar.9/" },
  youtube: { url: "https://www.youtube.com/@nikhilbalwadkarphotography7643" },
  threads: { url: "https://www.threads.com/@nik_b_pictures" },
  pinterest: { url: "https://in.pinterest.com/nik_balwadkar/" },
} as const;

/* Navigation */

export const nav = {
  links: [
    { id: "stories", label: "Stories" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "process", label: "Process" },
    { id: "reviews", label: "Reviews" },
  ],
  cta: "Reserve a date",
  menuOpen: "Menu",
  menuClose: "Close",
  menuTitle: "Menu",
  skipLink: "Skip to content",
  homeLabel: "Nik B Pictures, back to the top",
} as const;

/* Hero */

export const hero = {
  eyebrow: "Wedding photography & films · Pune",
  title: [
    [{ text: "Turning love into" }],
    [{ text: "timeless " }, { text: "frames", italic: true }, { text: "." }],
  ] as TextRun[][],
  sub: "Candid photographs and cinematic films for weddings and pre-weddings, told the way you lived them.",
  primaryCta: "Reserve your date",
  secondaryCta: "See the stories",
  /** Ring text around the badge. Keep it to 30 characters or fewer, or the ring overlaps. */
  badge: "Reserve · Nik B Pictures · ",
  badgeLabel: "Reserve your date on WhatsApp",
  scrollCue: "Scroll",
  trustLine: (rating: string, count: number, platform: string) => `${rating} · ${count} ratings on ${platform}`,
  print: { frame: "Fr. 001", title: "Golden hour" },
} as const;

/* Services marquee: the same services as the list below, so it is hidden from screen readers. */

export const marquee = [
  "Weddings",
  "Destination weddings",
  "Cinematic films",
  "Pre-weddings",
  "Sakharpuda & engagement",
  "Baby showers",
] as const;

/* The monogram. A reading of the logo, not a claim about its origin (see CLIENT_CHECKLIST.md). */

export const manifesto = {
  /** Accessible name of the monogram that heads the section. */
  ornamentLabel: "NB, the Nik B Pictures monogram",
  notes: ["NB · Nikhil Balwadkar", "Photo / Cinematic / Stories"],
  paragraph: [
    { text: "Some seconds outlast the whole day. The last verse of the " },
    { text: "mangalashtak", term: true },
    { text: ", just before the " },
    { text: "antarpat", term: true },
    { text: " falls. A sister’s laugh through the " },
    { text: "haldi", term: true },
    { text: ". A father, quiet, at the " },
    { text: "pathavani", term: true },
    {
      text: ". For over a decade, Nik B Pictures has waited for seconds like these, and turned them into timeless frames.",
    },
  ] as TextRun[],
} as const;

/* Cinematic stories. Titles are moments, not couples. */

export interface Story {
  id: string;
  title: string;
  caption: string;
  photo: PhotoKey;
}

export const stories = {
  title: "Cinematic stories",
  viewLabel: "View",
  openLabel: (title: string) => `Open ${title} full screen`,
  dotLabel: (index: number, total: number) => `Go to story ${index} of ${total}`,
  viewer: {
    close: "Close",
    previous: "Previous story",
    next: "Next story",
  },
  items: [
    {
      id: "haldi-morning",
      title: "Haldi morning",
      caption: "Turmeric, marigolds and a laugh nobody planned.",
      photo: "storyHaldi",
    },
    {
      id: "into-the-sahyadris",
      title: "Into the Sahyadris",
      caption: "A pre-wedding walk through cloud, rain and green hills outside Pune.",
      photo: "storyMonsoon",
    },
    {
      id: "before-the-antarpat-falls",
      title: "Before the antarpat falls",
      caption: "The last verse of the mangalashtak, and two people about to meet.",
      photo: "storyAntarpat",
    },
    {
      id: "mehendi-hands",
      title: "Mehendi hands",
      caption: "Somewhere in the henna, a name is waiting to be found.",
      photo: "storyMehendi",
    },
    {
      id: "sangeet-night",
      title: "Sangeet night",
      caption: "Dhol, warm lights and the whole family on the floor.",
      photo: "storySangeet",
    },
    {
      id: "the-nath",
      title: "The nath",
      caption: "A quiet minute in the nauvari, before the day begins.",
      photo: "storyNath",
    },
  ] as Story[],
} as const;

/* What we capture */

export interface Service {
  id: string;
  title: string;
  description: string;
  photo: PhotoKey;
  /** Completes "We'd like to know more about ..." in the WhatsApp message. */
  enquiry: string;
  /** False until the client confirms they offer it. */
  confirmed: boolean;
}

export const services = {
  title: "What we capture",
  askLabel: (title: string) => `Ask about ${title.toLowerCase()}`,
  rowLabel: (title: string) => `${title}: ask on WhatsApp (opens in a new tab)`,
  items: [
    {
      id: "weddings",
      title: "Weddings",
      description:
        "At home, at a resort or far away: the whole day in candid photographs, from the first ritual to the pathavani.",
      photo: "storyAntarpat",
      enquiry: "your wedding coverage",
      confirmed: true,
    },
    {
      id: "films",
      title: "Cinematic films",
      description: "Teasers and wedding films, cut and graded by hand, with the vows and the music kept.",
      photo: "storySangeet",
      enquiry: "a cinematic wedding film",
      confirmed: true,
    },
    {
      id: "pre-wedding",
      title: "Pre-wedding",
      description: "Traditional or modern, on the ghats of Alandi, in the Sahyadris or somewhere that is yours.",
      photo: "storyMonsoon",
      enquiry: "a pre-wedding shoot",
      confirmed: true,
    },
    {
      id: "sakharpuda",
      title: "Sakharpuda & engagement",
      description: "Rings, sugar and both families: the beginning of forever.",
      photo: "detailRings",
      enquiry: "sakharpuda and engagement coverage",
      confirmed: true,
    },
    {
      id: "haldi-mehendi-sangeet",
      title: "Haldi, mehendi & sangeet",
      description: "Turmeric, henna, dhol and everyone who joins in.",
      photo: "storyHaldi",
      enquiry: "haldi, mehendi and sangeet coverage",
      confirmed: true,
    },
    {
      id: "baby-shower",
      title: "Baby shower & maternity",
      description: "Dohale jevan photographs and films, maternity portraits and every blessing for your little one.",
      photo: "storyNath",
      enquiry: "baby shower and maternity photography",
      confirmed: true,
    },
  ] as Service[],
} as const;

/* Behind the lens */

export const about = {
  title: "Behind the lens",
  paragraphs: [
    "Nik B Pictures is a wedding photography and films studio in Moshi, Pune. For over a decade it has photographed weddings the way families actually live them: loud, emotional and full of small rituals that matter.",
    "Every story gets candid photographs, a cinematic film, and someone close enough to catch the glance and far enough to let it happen. Beyond weddings, the studio photographs baby showers, newborns, birthdays and portraits.",
  ],
  ownerLine: (name: string) =>
    `Led by ${name}, photographer and cinematographer, who also mentors photographers and filmmakers through NBP Academy.`,
  statLabels: {
    rating: (platform: string) => `Rating on ${platform}`,
    reviews: (platform: string) => `Ratings on ${platform}`,
    yearsActive: "Years capturing love",
    weddingsShot: "Weddings covered",
    citiesCovered: "Cities travelled for weddings",
  },
} as const;

/* How we work: a real sequence, so it is numbered. */

export const howWeWork = {
  title: "How we work",
  steps: [
    {
      title: "Reserve your date",
      text: "Send your date and city on WhatsApp or Instagram, or fill in the booking form.",
    },
    { title: "Plan the story", text: "We go through your rituals, places and people, so nothing that matters is missed." },
    { title: "Live your day", text: "We stay at the edges. You stay present." },
    {
      title: "Frames to keep",
      text: "An edited gallery, your cinematic film and an album made to be handed down.",
    },
  ],
} as const;

/* Kind words. Placeholders until the client shares real reviews with permission. */

export interface Testimonial {
  quote: string;
  attribution: string;
  placeholder: boolean;
}

export const testimonials = {
  title: "Kind words",
  placeholderTag: "placeholder",
  readAll: (platform: string) => `Read ratings on ${platform}`,
  previous: "Previous review",
  next: "Next review",
  status: (index: number, total: number) => `Review ${index} of ${total}`,
  dragLabel: "Drag",
  items: [
    {
      quote: "We forgot the cameras were there. Then the film made us cry all over again.",
      attribution: "Bride & groom, Pune",
      placeholder: true,
    },
    {
      quote: "Our baby shower was photographed with the same care as a wedding. Every blessing is in there.",
      attribution: "Parents-to-be, Moshi",
      placeholder: true,
    },
    {
      quote: "Calm on the day and careful in the edit. The colours look exactly like that evening.",
      attribution: "Bride & groom, Pimpri-Chinchwad",
      placeholder: true,
    },
  ] as Testimonial[],
} as const;

/* Instagram wall: a contact sheet of static tiles that all open the profile. */

export const instagram = {
  title: "@nik_b_pictures",
  cta: "Follow on Instagram",
  tileLabel: (title: string) => `${title}, open @nik_b_pictures on Instagram (opens in a new tab)`,
  tiles: [
    { photo: "storyHaldi", rebate: "14" },
    { photo: "detailRings", rebate: "14A" },
    { photo: "storyMonsoon", rebate: "15" },
    { photo: "storyAntarpat", rebate: "15A" },
    { photo: "detailPaithani", rebate: "16" },
    { photo: "storyMehendi", rebate: "16A" },
    { photo: "storySangeet", rebate: "17" },
    { photo: "storyNath", rebate: "17A" },
  ] as { photo: PhotoKey; rebate: string }[],
} as const;

/* Booking */

export const bookingFunctions = [
  "Sakharpuda",
  "Haldi",
  "Mehendi",
  "Sangeet",
  "Wedding",
  "Reception",
  "Pre-wedding",
] as const;
export type BookingFunction = (typeof bookingFunctions)[number];

export const booking = {
  /** The studio's own line: "Seven vows, one soul, endless love." */
  eyebrow: "सात वचने, एक जीव, अनंत प्रेम.",
  title: [{ text: "Let’s " }, { text: "frame", italic: true }, { text: " your story." }] as TextRun[],
  sub: "Bookings for 2026 and 2027 are open. Tell us your date and city, and we’ll check availability.",
  fields: {
    names: {
      label: "Your names",
      placeholder: "e.g. Ananya & Rohan",
      error: "Enter your names",
    },
    date: {
      label: "Wedding date",
      placeholder: "Choose a date",
      helper: "An approximate date is fine.",
      error: "Choose a date (an approximate one is fine)",
      pastError: "Choose a date from today onwards",
      picker: {
        title: "Choose your wedding date",
        previousMonth: "Previous month",
        nextMonth: "Next month",
        previousYear: "Previous year",
        nextYear: "Next year",
        showMonths: "choose a month",
        showDays: "back to the days",
        close: "Close",
      },
    },
    city: {
      label: "City",
      placeholder: "e.g. Pune",
      error: "Enter your city",
    },
    functions: {
      legend: "Functions",
      helper: "Choose all that apply.",
    },
  },
  preview: {
    label: "Your message",
    /** Shown in the preview until the matching field is filled in. */
    tokens: { names: "your names", date: "your date", city: "your city" },
  },
  submit: "Check availability on WhatsApp",
  note: "Opens WhatsApp with this message. Nothing is sent until you press send.",
  opened: "WhatsApp is open in a new tab with your message, ready to send.",
  popupBlocked: "WhatsApp did not open in a new tab. Use this link instead:",
  openLink: "Open WhatsApp",
  instagramCta: "Message on Instagram",
  formCta: "Booking form",
  packagesCta: "See packages",
  callCta: "Call",
} as const;

/* Footer */

export const footer = {
  srHeading: "Contact and links",
  navLabel: "Footer",
  navigationTitle: "Navigation",
  servicesTitle: "Services",
  connectTitle: "Connect",
  backToTop: "Back to top",
  rights: (year: number) => `© ${year} ${studio.fullName}. All rights reserved.`,
  credit: (name: string) => `Website by ${name}`,
} as const;

/* Global UI */

export const ui = {
  whatsappFab: "Chat on WhatsApp (opens in a new tab)",
  whatsappTooltip: "Chat on WhatsApp",
  newTab: "(opens in a new tab)",
  cursor: { view: "View", drag: "Drag", open: "Open" },
} as const;

/* SEO */

export const seo = {
  title: "Nikhil Balwadkar Photography | Wedding Photography & Films in Pune",
  description:
    "Candid wedding photography and cinematic films by Nikhil Balwadkar (Nik B Pictures), Moshi, Pune. Destination weddings, pre-weddings, engagements and baby showers.",
  ogAlt: "Nik B Pictures. Turning love into timeless frames.",
  ogEyebrow: "Wedding photography & films · Pune",
} as const;

/* 404 */

export const notFoundCopy = {
  frame: "Fr. 404",
  title: "Lost frame.",
  body: "This frame never made it out of the edit. The rest of the story is waiting on the homepage.",
  cta: "Back to the homepage",
} as const;
