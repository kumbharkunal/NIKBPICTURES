import { StoriesClient } from "./StoriesClient";

/**
 * Cinematic stories: six moments, not invented couples, screened in the dark. The noir band meets
 * the cream page on a clean edge, like the edge of a screen.
 */
export function Stories() {
  return (
    <section id="stories" aria-labelledby="stories-title" data-nav-tone="dark" className="theme-noir relative">
      <StoriesClient />
    </section>
  );
}
