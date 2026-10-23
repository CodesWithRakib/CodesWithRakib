import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "../styles/globals.css";
import "../styles/terminal.css";
import { Cursor } from "@/components/shared/Cursor";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { Seo } from "@/components/shared/Seo";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { defaultMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden bg-bg font-sans text-fg antialiased">
        <ScrollProgress />

        <a
          href="#main"
          className="sr-only rounded-md bg-bg-elevated px-4 py-3 text-sm font-medium text-fg ring-1 ring-border focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[var(--z-skip-link)]"
        >
          Skip to content
        </a>

        <MotionConfig reducedMotion="user">
          <SmoothScroll>
            <main id="main">{children}</main>
          </SmoothScroll>
        </MotionConfig>

        <Cursor />
        <Seo />
      </body>
    </html>
  );
}
