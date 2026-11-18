import { ImageResponse } from "next/og";
import { monogramPaths } from "@/components/brand/monogram-paths";
import { palette } from "@/lib/tokens";

/**
 * The traced NB monogram as an SVG data URI in one colour, for Satori (icons and the link
 * preview card), which takes an <img> more reliably than inline SVG with even-odd fills.
 */
export function monogramDataUri(color: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${monogramPaths.viewBox}">` +
    `<path fill="${color}" fill-rule="evenodd" d="${monogramPaths.letters}"/>` +
    `<path fill="${color}" fill-rule="evenodd" d="${monogramPaths.aperture}"/>` +
    `</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/**
 * The studio's icon: the ink NB monogram on cream, like its logo. From 180px up it also gets the
 * logo's thin gold ring. `rounded` gives the browser-tab favicon its own corners; touch and
 * manifest icons are full-bleed squares (platforms apply their own mask), with the mark inside
 * the maskable safe zone.
 */
export async function monogram(dimension: number, { rounded }: { rounded: boolean }) {
  const ring = dimension >= 180;
  const markWidth = Math.round(dimension * (rounded ? 0.84 : ring ? 0.52 : 0.62));
  const markHeight = Math.round((markWidth * monogramPaths.height) / monogramPaths.width);
  const ringInset = Math.round(dimension * 0.1);
  const ringWidth = Math.max(1, Math.round(dimension * 0.008));

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: palette.paper,
          borderRadius: rounded ? Math.round(dimension * 0.22) : 0,
        }}
      >
        {ring ? (
          <div
            style={{
              position: "absolute",
              top: ringInset,
              right: ringInset,
              bottom: ringInset,
              left: ringInset,
              borderRadius: 9999,
              border: `${ringWidth}px solid ${palette.gold}`,
            }}
          />
        ) : null}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={monogramDataUri(palette.ink)} width={markWidth} height={markHeight} alt="" />
      </div>
    ),
    { width: dimension, height: dimension },
  );
}
