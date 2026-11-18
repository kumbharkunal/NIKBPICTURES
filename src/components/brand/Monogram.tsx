import { monogramGeometry } from "./monogram-geometry";

/** Ids of the shared path definitions rendered once by <MonogramDefs /> in the root layout. */
export const MONOGRAM_LETTERS_ID = "nikb-monogram-letters";
export const MONOGRAM_APERTURE_ID = "nikb-monogram-aperture";

/** "x y" for GSAP's svgOrigin, so the aperture turns about its own centre. */
export const APERTURE_ORIGIN = `${monogramGeometry.apertureCenter.x} ${monogramGeometry.apertureCenter.y}`;

interface MonogramProps {
  /** Accessible name. Omit it when the element around the mark is already named. */
  title?: string;
  className?: string;
}

/**
 * The studio's NB monogram, traced from its published logo. It takes the current text colour:
 * ink on cream, ivory over photographs and on noir. The paths ship once (MonogramDefs); each
 * mark references them, with the aperture in its own group so the intro and the monogram section
 * can turn it. Safe in client components: it imports only the small geometry module.
 */
export function Monogram({ title, className }: MonogramProps) {
  const a11y = title ? { role: "img" as const, "aria-label": title } : { "aria-hidden": true as const };
  return (
    <svg viewBox={monogramGeometry.viewBox} className={className} fill="currentColor" focusable="false" {...a11y}>
      <use href={`#${MONOGRAM_LETTERS_ID}`} />
      <g data-aperture>
        <use href={`#${MONOGRAM_APERTURE_ID}`} />
      </g>
    </svg>
  );
}
