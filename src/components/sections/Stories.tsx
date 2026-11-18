import { StoriesClient } from "./StoriesClient";

/**
 * Cinematic stories: six moments, not invented couples, screened in the dark. The page dims into
 * noir before the film roll and lights up again after it (the cinema fades carry no text).
 */
export function Stories() {
  return (
    <>
      <div aria-hidden="true" className="cinema-fade cinema-fade--in" />
      <section id="stories" aria-labelledby="stories-title" data-nav-tone="dark" className="theme-noir relative">
        <StoriesClient />
      </section>
      <div aria-hidden="true" className="cinema-fade cinema-fade--out" />
    </>
  );
}
