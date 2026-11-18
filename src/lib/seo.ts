import type { ProfessionalService, WithContext } from "schema-dts";
import { seo, socials, studio, trust } from "@/content/site";
import { siteUrl } from "@/lib/env";

/**
 * Structured data for the studio. Only confirmed or publicly stated facts: no rating, no review
 * count, no price range (never shown anywhere), no street address until the studio confirms one.
 * Contact details appear once they are filled in site.ts; the rating platform is linked only when
 * the client chooses to cite it.
 */
export function studioJsonLd(): WithContext<ProfessionalService> {
  const sameAs: string[] = [
    socials.instagram.url,
    socials.facebook.url,
    socials.youtube.url,
    socials.threads.url,
    socials.pinterest.url,
  ];
  if (trust.show && trust.url) sameAs.push(trust.url);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#studio`,
    name: studio.fullName,
    alternateName: [studio.name, "nik_b_pictures", "NBP Films"],
    url: `${siteUrl}/`,
    description: seo.description,
    image: `${siteUrl}/opengraph-image`,
    logo: `${siteUrl}/icon/512`,
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Moshi, Pimpri-Chinchwad",
      addressRegion: "Maharashtra",
      postalCode: "412105",
      addressCountry: "IN",
      ...(studio.address ? { streetAddress: studio.address } : {}),
    },
    areaServed: [
      { "@type": "City", name: "Pune" },
      { "@type": "City", name: "Pimpri-Chinchwad" },
      { "@type": "City", name: "Alandi" },
      { "@type": "State", name: "Maharashtra" },
    ],
    knowsAbout: [
      "Wedding photography",
      "Wedding cinematography",
      "Destination wedding photography",
      "Resort wedding photography",
      "Pre-wedding photography",
      "Baby shower photography",
    ],
    ...(studio.phone ? { telephone: studio.phone } : {}),
    ...(studio.email ? { email: studio.email } : {}),
    ...(studio.ownerName ? { founder: { "@type": "Person", name: studio.ownerName } } : {}),
  };
}

/** Serialised for a <script type="application/ld+json">, with "<" escaped against injection. */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
