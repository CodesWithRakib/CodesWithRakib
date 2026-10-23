import type { Metadata } from "next";
import { siteConfig } from "@/content/profile";

export interface SeoInput {
  /** Page title. Omit on the homepage so the site name stands alone. */
  title?: string;
  description?: string;
  /** Path (or absolute URL) to the social image. */
  image?: string;
  /** Canonical path, e.g. "/resume". */
  path?: string;
  noIndex?: boolean;
}

/** Resolve a root-relative path against the configured canonical origin. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

/**
 * App Router metadata is returned from `metadata` / `generateMetadata`, so this
 * is the "Seo component" for pages. `components/shared/Seo.tsx` handles the
 * structured data that does render.
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  path = "/",
  noIndex = false,
}: SeoInput = {}): Metadata {
  const pageTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.name;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: pageTitle,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export const defaultMetadata: Metadata = createMetadata();
