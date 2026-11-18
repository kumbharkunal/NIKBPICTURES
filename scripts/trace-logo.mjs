// `npm run logo:trace`: traces the NB monogram from the studio's published logo into SVG paths.
//
// Source: brand/source/nikb-logo-mockup.png, the logo as the studio posts it (an embossed mockup
// on a cream wall, 1080 x 1080). The monogram is found inside the disc, cropped, upscaled 4x and
// thresholded (which drops the emboss shadows), then traced with potrace. Subpaths inside the B's
// lower bowl are kept apart as the aperture, so the site can turn it on its own. The handle and
// tagline under the monogram are not traced: the site sets them as live text.
//
// Writes:
//   public/brand/nb-monogram-sprite.svg         the paths the page uses: served once, cached, and
//                                               referenced by every <Monogram /> through <use>
//   src/components/brand/monogram-paths.ts      path data for the server only (icons, link card)
//   src/components/brand/monogram-geometry.ts   viewBox and aperture centre (safe in client code)
//   brand/nb-monogram.svg                       the monogram as a standalone SVG for the studio
//   brand/qa/trace-compare.png                  source crop beside the traced result (git-ignored)
//
// When the studio supplies its original vector logo, replace monogram-paths.ts with its outlines
// (keeping the letters / aperture split) instead of re-running this script.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import potrace from "potrace";
import sharp from "sharp";
import { ROOT } from "./image-slots.mjs";

const SOURCE = path.join(ROOT, "brand", "source", "nikb-logo-mockup.png");
const PATHS_OUT = path.join(ROOT, "src", "components", "brand", "monogram-paths.ts");
const GEOMETRY_OUT = path.join(ROOT, "src", "components", "brand", "monogram-geometry.ts");
const SVG_OUT = path.join(ROOT, "brand", "nb-monogram.svg");
const SPRITE_OUT = path.join(ROOT, "public", "brand", "nb-monogram-sprite.svg");
const QA_OUT = path.join(ROOT, "brand", "qa", "trace-compare.png");

/** The mockup's disc (centre and inner radius) and the line where the handle and tagline start. */
const DISC = { x: 540, y: 540, radius: 380 };
const TEXT_TOP = 660;
/** Luma below this counts as ink when finding the monogram; the crop gets this much margin. */
const DARK = 100;
const PAD = 12;
/** Upscale before tracing, and the threshold that separates ink from its emboss shadow. */
const SCALE = 4;
const THRESHOLD = 96;
/** The aperture disc inside the B's lower bowl, in source pixels (measured once from the mockup). */
const APERTURE = { x: 651.5, y: 537, radius: 58 };
const INK = "#16140F";

const trace = promisify(potrace.trace);

/** The monogram's bounding box: dark pixels inside the disc, above the text lines. */
async function findMonogram() {
  const { data, info } = await sharp(SOURCE).greyscale().raw().toBuffer({ resolveWithObject: true });
  let minX = info.width;
  let minY = info.height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < TEXT_TOP; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const dx = x - DISC.x;
      const dy = y - DISC.y;
      if (dx * dx + dy * dy > DISC.radius * DISC.radius) continue;
      if (data[y * info.width + x] >= DARK) continue;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
  }
  return { left: minX - PAD, top: minY - PAD, width: maxX - minX + 1 + 2 * PAD, height: maxY - minY + 1 + 2 * PAD };
}

/** Back to source pixels, one decimal place. */
const unscale = (value) => String(Number((value / SCALE).toFixed(1)));

/** Splits potrace's path data into closed subpaths with their bounding boxes (traced pixels). */
function subpathsOf(d) {
  return d
    .trim()
    .split(/(?=M)/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((raw) => {
      const values = (raw.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
      const xs = values.filter((_, index) => index % 2 === 0);
      const ys = values.filter((_, index) => index % 2 === 1);
      return {
        data: raw.replace(/-?\d+(?:\.\d+)?/g, (match) => unscale(Number(match))).replace(/\s+/g, " "),
        box: { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) },
      };
    });
}

async function main() {
  const crop = await findMonogram();
  const bitmap = await sharp(SOURCE)
    .extract(crop)
    .resize(crop.width * SCALE, crop.height * SCALE, { kernel: "lanczos3" })
    .greyscale()
    .threshold(THRESHOLD)
    .png()
    .toBuffer();
  const svg = await trace(bitmap, { threshold: 128, turdSize: 60, alphaMax: 1, optCurve: true, optTolerance: 0.4 });
  const d = /\sd="([^"]+)"/.exec(svg)?.[1];
  if (!d) throw new Error("potrace returned no path");

  // The aperture: subpaths centred in the aperture disc and smaller than it (the six blades).
  const cx = (APERTURE.x - crop.left) * SCALE;
  const cy = (APERTURE.y - crop.top) * SCALE;
  const radius = APERTURE.radius * SCALE;
  const subpaths = subpathsOf(d).map((sub) => {
    const width = sub.box.maxX - sub.box.minX;
    const height = sub.box.maxY - sub.box.minY;
    const distance = Math.hypot((sub.box.minX + sub.box.maxX) / 2 - cx, (sub.box.minY + sub.box.maxY) / 2 - cy);
    return { ...sub, aperture: distance < radius * 0.9 && width < radius * 1.97 && height < radius * 1.97 };
  });
  const blades = subpaths.filter((sub) => sub.aperture);
  if (blades.length !== 6) throw new Error(`expected 6 aperture blades, found ${blades.length}`);

  const union = blades.reduce(
    (box, sub) => ({
      minX: Math.min(box.minX, sub.box.minX),
      maxX: Math.max(box.maxX, sub.box.maxX),
      minY: Math.min(box.minY, sub.box.minY),
      maxY: Math.max(box.maxY, sub.box.maxY),
    }),
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity },
  );
  const centre = {
    x: Number(((union.minX + union.maxX) / 2 / SCALE).toFixed(1)),
    y: Number(((union.minY + union.maxY) / 2 / SCALE).toFixed(1)),
  };
  const letters = subpaths
    .filter((sub) => !sub.aperture)
    .map((sub) => sub.data)
    .join(" ");
  const aperture = blades.map((sub) => sub.data).join(" ");

  const header = [
    "/**",
    " * Generated by scripts/trace-logo.mjs from the studio's published logo: re-run",
    " * `npm run logo:trace` rather than editing by hand, or replace the paths with the studio's",
    " * original vector outlines (keeping the letters and the aperture apart).",
  ];
  await mkdir(path.dirname(PATHS_OUT), { recursive: true });
  await writeFile(
    PATHS_OUT,
    [
      ...header,
      " * Server side only (the icons and the link card). The page itself uses the same paths from",
      " * public/brand/nb-monogram-sprite.svg, so they never enter the HTML or a client bundle.",
      " */",
      `import { monogramGeometry } from "./monogram-geometry";`,
      "",
      "export const monogramPaths = {",
      "  ...monogramGeometry,",
      "  /** The letters, the camera outline and the swoosh. Even-odd fill keeps the counters open. */",
      `  letters: "${letters}",`,
      "  /** The six blades inside the B's lower bowl; they turn about apertureCenter. */",
      `  aperture: "${aperture}",`,
      "} as const;",
      "",
    ].join("\n"),
  );
  await writeFile(
    GEOMETRY_OUT,
    [
      ...header,
      " * The monogram's frame and the aperture's centre, small enough for client components.",
      " */",
      "export const monogramGeometry = {",
      `  viewBox: "0 0 ${crop.width} ${crop.height}",`,
      `  width: ${crop.width},`,
      `  height: ${crop.height},`,
      `  apertureCenter: { x: ${centre.x}, y: ${centre.y} },`,
      "} as const;",
      "",
    ].join("\n"),
  );

  const standalone =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${crop.width} ${crop.height}" width="${crop.width}" height="${crop.height}">` +
    `<title>Nik B Pictures, NB monogram</title>` +
    `<path fill="${INK}" fill-rule="evenodd" d="${letters}"/>` +
    `<path fill="${INK}" fill-rule="evenodd" d="${aperture}"/>` +
    `</svg>\n`;
  await mkdir(path.dirname(SVG_OUT), { recursive: true });
  await writeFile(SVG_OUT, standalone);

  // The served sprite: no fill of its own, so each <use> takes the colour of the mark around it.
  const sprite =
    `<svg xmlns="http://www.w3.org/2000/svg"><defs>` +
    `<path id="letters" fill-rule="evenodd" d="${letters}"/>` +
    `<path id="aperture" fill-rule="evenodd" d="${aperture}"/>` +
    `</defs></svg>\n`;
  await mkdir(path.dirname(SPRITE_OUT), { recursive: true });
  await writeFile(SPRITE_OUT, sprite);

  // Side-by-side check at 2x: the source crop (left) and the traced monogram on cream (right).
  const show = { width: crop.width * 2, height: crop.height * 2 };
  const left = await sharp(SOURCE).extract(crop).resize(show.width, show.height, { kernel: "lanczos3" }).png().toBuffer();
  const right = await sharp(Buffer.from(standalone.replace(/width="\d+" height="\d+"/, `width="${show.width}" height="${show.height}"`)))
    .flatten({ background: "#f2ece4" })
    .png()
    .toBuffer();
  await mkdir(path.dirname(QA_OUT), { recursive: true });
  await sharp({ create: { width: show.width * 2 + 24, height: show.height, channels: 3, background: "#ffffff" } })
    .composite([
      { input: left, left: 0, top: 0 },
      { input: right, left: show.width + 24, top: 0 },
    ])
    .png()
    .toFile(QA_OUT);

  console.log(
    `[logo] traced ${subpaths.length} subpaths (${blades.length} aperture blades), ` +
      `${(letters.length + aperture.length) / 1000} KB of path data; check brand/qa/trace-compare.png`,
  );
}

main().catch((error) => {
  console.error("[logo] trace failed:", error.message);
  process.exit(1);
});
