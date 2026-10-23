import { profile, siteConfig } from "@/content/profile";
import { absoluteUrl, type SeoInput } from "@/lib/seo";

/**
 * Structured data for the current page. Actual <head> metadata is produced by
 * `createMetadata()` in `lib/seo.ts` through the App Router Metadata API.
 */
export function Seo({ title, description, image, path = "/" }: SeoInput) {
  const personId = `${siteConfig.url}/#person`;
  const websiteId = `${siteConfig.url}/#website`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        jobTitle: profile.role,
        description: profile.bio,
        url: siteConfig.url,
        image: absoluteUrl(image ?? profile.avatar),
        email: `mailto:${profile.email}`,
        sameAs: profile.socials
          .filter((social) => social.icon !== "email")
          .map((social) => social.url),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": personId },
      },
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl(path)}#webpage`,
        url: absoluteUrl(path),
        name: title ?? siteConfig.name,
        description: description ?? siteConfig.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
