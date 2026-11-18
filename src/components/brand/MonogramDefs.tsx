import { MONOGRAM_APERTURE_ID, MONOGRAM_LETTERS_ID } from "./Monogram";
import { monogramPaths } from "./monogram-paths";

/**
 * The monogram's path data, rendered once in the root layout (a server component, so the paths
 * never enter a client bundle). Every <Monogram /> on the page references these paths. They carry
 * no fill of their own, so each mark takes the colour of the element it sits in.
 */
export function MonogramDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <path id={MONOGRAM_LETTERS_ID} d={monogramPaths.letters} fillRule="evenodd" />
        <path id={MONOGRAM_APERTURE_ID} d={monogramPaths.aperture} fillRule="evenodd" />
      </defs>
    </svg>
  );
}
