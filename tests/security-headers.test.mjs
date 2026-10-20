import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("Security Headers - Required Directives Configured in next.config.ts", () => {
  const configContent = fs.readFileSync(path.resolve("next.config.ts"), "utf8");

  // Verify X-Content-Type-Options
  assert.ok(
    configContent.includes('"X-Content-Type-Options"') && configContent.includes('"nosniff"'),
    "Expected X-Content-Type-Options: nosniff"
  );

  // Verify X-Frame-Options
  assert.ok(
    configContent.includes('"X-Frame-Options"') && configContent.includes('"DENY"'),
    "Expected X-Frame-Options: DENY"
  );

  // Verify Referrer-Policy
  assert.ok(
    configContent.includes('"Referrer-Policy"') &&
      configContent.includes('"strict-origin-when-cross-origin"'),
    "Expected Referrer-Policy: strict-origin-when-cross-origin"
  );

  // Verify Permissions-Policy
  assert.ok(
    configContent.includes('"Permissions-Policy"') &&
      configContent.includes("camera=(), microphone=(), geolocation=(), browsing-topics=()"),
    "Expected restrictive Permissions-Policy"
  );

  // Verify HSTS
  assert.ok(
    configContent.includes('"Strict-Transport-Security"') &&
      configContent.includes("max-age=63072000; includeSubDomains; preload"),
    "Expected Strict-Transport-Security with preload and subDomains"
  );

  // Verify Content-Security-Policy
  assert.ok(
    configContent.includes('"Content-Security-Policy"'),
    "Expected Content-Security-Policy header"
  );
  assert.ok(
    configContent.includes("frame-ancestors 'none'"),
    "Expected CSP frame-ancestors 'none'"
  );
  assert.ok(
    configContent.includes("base-uri 'self'"),
    "Expected CSP base-uri 'self'"
  );
});
