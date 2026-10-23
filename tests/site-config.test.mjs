import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("Site Configuration - Verified Production Identity", () => {
  const configContent = fs.readFileSync(path.resolve("config/site.ts"), "utf8");

  // Verify production domain
  assert.ok(
    configContent.includes("https://codeswithrakib.github.io"),
    "Expected canonical URL to be https://codeswithrakib.github.io"
  );

  // Verify author name
  assert.ok(
    configContent.includes('name: "Md. Rakib Islam"'),
    "Expected author name to be Md. Rakib Islam"
  );

  // Verify current commercial role and company
  assert.ok(
    configContent.includes('role: "Frontend Developer"'),
    "Expected author role to be Frontend Developer"
  );
  assert.ok(
    configContent.includes('company: "SOFOF Tech"'),
    "Expected author company to be SOFOF Tech"
  );

  // Verify verified email and URLs
  assert.ok(
    configContent.includes('email: "codeswithrakib@gmail.com"'),
    "Expected email to match codeswithrakib@gmail.com"
  );
  assert.ok(
    configContent.includes('github: "https://github.com/CodesWithRakib"'),
    "Expected GitHub URL to match https://github.com/CodesWithRakib"
  );
  assert.ok(
    configContent.includes('linkedin: "https://linkedin.com/in/codeswithrakib"'),
    "Expected LinkedIn URL to match https://linkedin.com/in/codeswithrakib"
  );
});

test("Site Configuration - Cross-Route Navigation Anchors", () => {
  const configContent = fs.readFileSync(path.resolve("config/site.ts"), "utf8");

  const requiredAnchors = [
    "/#work",
    "/#about",
    "/#experience",
    "/#contact",
  ];

  for (const anchor of requiredAnchors) {
    assert.ok(
      configContent.includes(`href: "${anchor}"`),
      `Expected navItems to contain root-relative cross-route anchor: ${anchor}`
    );
  }
});
