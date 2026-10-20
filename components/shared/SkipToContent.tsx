import * as React from "react";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
