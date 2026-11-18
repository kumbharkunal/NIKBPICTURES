/**
 * Palette for places that cannot read CSS custom properties: metadata, the Open Graph image and
 * generated icons. Components style through the Tailwind tokens in globals.css instead.
 * Keep both in sync.
 */
export const palette = {
  paper: "#F2ECE4",
  paperDeep: "#E8E0D5",
  ivory: "#FAF7F2",
  ink: "#16140F",
  inkSoft: "#5B554C",
  inkLift: "#2C2721",
  gold: "#B39565",
  goldDeep: "#7A5E36",
  error: "#8E2A1E",
  noir: "#0F0E0B",
} as const;

/** "#B39565" + 0.5 becomes "rgba(179, 149, 101, 0.5)", for canvas drawing. */
export function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${Math.max(0, Math.min(1, alpha))})`;
}
