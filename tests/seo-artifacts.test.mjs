import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("SEO Artifacts - Sitemap implementation exists and targets real public routes", () => {
  const sitemapPath = path.resolve("app/sitemap.ts");
  assert.ok(fs.existsSync(sitemapPath), "app/sitemap.ts must exist");

  const content = fs.readFileSync(sitemapPath, "utf8");
  assert.ok(content.includes("MetadataRoute.Sitemap"), "Should use Next.js MetadataRoute.Sitemap");
  assert.ok(content.includes("priority: 1.0"), "Homepage priority should be 1.0");
  assert.ok(content.includes("/resume"), "Should include /resume route");
});

test("SEO Artifacts - Robots implementation exists and protects API routes", () => {
  const robotsPath = path.resolve("app/robots.ts");
  assert.ok(fs.existsSync(robotsPath), "app/robots.ts must exist");

  const content = fs.readFileSync(robotsPath, "utf8");
  assert.ok(content.includes("MetadataRoute.Robots"), "Should use Next.js MetadataRoute.Robots");
  assert.ok(content.includes('disallow: ["/api/"]'), "Should disallow indexing of /api/ routes");
  assert.ok(content.includes("sitemap.xml"), "Should reference sitemap.xml");
});

test("SEO Artifacts - OpenGraph dynamic image generator exists", () => {
  const ogPath = path.resolve("app/opengraph-image.tsx");
  assert.ok(fs.existsSync(ogPath), "app/opengraph-image.tsx must exist");

  const content = fs.readFileSync(ogPath, "utf8");
  assert.ok(content.includes("ImageResponse"), "Should use Next.js ImageResponse");
  assert.ok(content.includes("1200"), "Should define 1200 width");
  assert.ok(content.includes("630"), "Should define 630 height");
});
