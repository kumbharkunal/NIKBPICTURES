import { Monogram } from "@/components/brand/Monogram";
import { RevealImage } from "@/components/ui/RevealImage";
import { photos } from "@/content/images";
import { manifesto } from "@/content/site";
import { pad2 } from "@/lib/utils";
import { ManifestoMotion } from "./ManifestoMotion";

/**
 * The monogram. The studio's NB mark set large, with its reading in mono, a paragraph that
 * develops word by word as you scroll, two prints drifting at different speeds, and the logo's
 * own line (Photo / Cinematic / Stories) read word by word under the first print, so the two
 * columns end together. The notes present a reading of the mark, never a claim about its origin.
 * On phones and tablets the line follows the paragraph and leads into the stories.
 */
export function Manifesto() {
  return (
    <section id="name" aria-labelledby="name-title" className="relative">
      <ManifestoMotion>
        <div className="container-page section-y grid grid-cols-4 gap-x-4 md:grid-cols-6 md:gap-x-5 lg:grid-cols-12 lg:gap-x-6">
          <div className="col-span-4 md:col-span-6 lg:col-span-5 lg:row-start-1">
            <h2 id="name-title" className="font-normal">
              <span
                data-ornament
                role="img"
                aria-label={manifesto.ornamentLabel}
                className="block w-[min(100%,20rem)] text-ink md:w-[min(100%,24rem)] lg:w-[min(100%,27rem)]"
              >
                <Monogram className="block h-auto w-full" />
              </span>
              <span data-ornament-note data-reveal className="mt-4 block space-y-1 font-mono text-caption text-ink-soft">
                {manifesto.notes.map((note) => (
                  <span key={note} className="block">
                    {note}
                  </span>
                ))}
              </span>
            </h2>
            <RevealImage
              photo={photos.detailPaithani}
              sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 62vw"
              ratio="1 / 1"
              parallax={10}
              className="mt-14 w-[62%] md:w-[48%] lg:mt-24 lg:w-[70%]"
            />
          </div>

          <div className="col-span-4 mt-14 md:col-span-6 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:pt-[16vh]">
            <p data-manifesto className="relative max-w-[24ch] font-display text-lead font-light text-ink">
              <span data-split>
                {manifesto.paragraph.map((run, index) =>
                  run.term ? (
                    <i key={index} lang="mr-Latn">
                      {run.text}
                    </i>
                  ) : (
                    <span key={index}>{run.text}</span>
                  ),
                )}
              </span>
            </p>
            <RevealImage
              photo={photos.storyMehendi}
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 32vw, 46vw"
              parallax={18}
              className="mt-14 ml-auto w-[46%] md:w-[34%] lg:mt-24 lg:mr-[8%] lg:w-[36%]"
            />
          </div>

          <dl className="col-span-4 mt-16 max-w-[30rem] divide-y divide-line md:col-span-6 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:mt-24 lg:max-w-none">
            {manifesto.tagline.map((item, index) => (
              <div key={item.word} data-reveal="up" className="py-6 first:pt-0 last:pb-0">
                <dt className="flex items-baseline gap-4 font-display text-h3 font-light text-ink">
                  <span aria-hidden="true" className="w-8 shrink-0 font-mono text-caption text-gold-deep">
                    {pad2(index + 1)}
                  </span>
                  {item.word}
                </dt>
                <dd className="mt-2 max-w-[34ch] pl-12 text-body text-ink-soft">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </ManifestoMotion>
    </section>
  );
}
