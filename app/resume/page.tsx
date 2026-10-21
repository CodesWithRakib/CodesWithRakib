import * as React from "react";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  ExternalLink,
  Mail,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/shared/Icons";

export const metadata: Metadata = {
  title: "Résumé & CV",
  description:
    "Review or request the résumé of Md. Rakib Islam, Frontend Developer at SOFOF Tech specializing in React, Next.js, and TypeScript.",
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
  openGraph: {
    title: `Résumé & CV | ${siteConfig.name}`,
    description:
      "Review or request the résumé of Md. Rakib Islam, Frontend Developer at SOFOF Tech.",
    url: `${siteConfig.url}/resume`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "profile",
  },
};

export default function ResumePage() {
  const resumeFilePath = path.join(process.cwd(), "public", "resume.pdf");
  const hasResumeFile = fs.existsSync(resumeFilePath);

  return (
    <div className="relative py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="wash-light absolute inset-x-0 top-0 -z-10 h-96 opacity-60"
      />
      <Container className="max-w-3xl">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <ArrowLeft
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Return to portfolio
        </Link>

        <header className="mt-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-primary">CV</span>
            <span aria-hidden="true" className="h-px w-8 bg-primary/45" />
            <span className="eyebrow">Document</span>
          </div>
          <h1 className="mt-5 text-balance font-display text-[clamp(2.6rem,6vw,4.2rem)] leading-[0.92] tracking-[-0.03em] text-foreground">
            Résumé &amp; professional profile.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-[13.5px] leading-relaxed text-muted-foreground">
            Frontend developer at SOFOF Tech. React, Next.js and TypeScript in
            production, with full-stack work across NestJS, PostgreSQL and Redis.
          </p>

          <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-border/80 pt-5">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <dt className="sr-only">Availability</dt>
              <dd className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                Open to frontend &amp; full-stack roles
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <dt className="sr-only">Location</dt>
              <dd className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                Dhaka, Bangladesh · UTC+6
              </dd>
            </div>
          </dl>
        </header>

        {hasResumeFile ? (
          <div className="mt-12">
            <div className="flex flex-col gap-5 border-t border-border/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-2xl text-foreground">
                  Latest PDF
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  Md. Rakib Islam · Frontend developer
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/resume.pdf"
                  download="Md_Rakib_Islam_Resume.pdf"
                  className={buttonVariants({ variant: "primary", size: "lg" })}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download PDF
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                  })}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Open in tab
                </a>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <iframe
                src="/resume.pdf"
                title="Md. Rakib Islam résumé"
                className="h-[750px] w-full border-0"
              />
            </div>
          </div>
        ) : (
          <div className="mt-12">
            <div className="border-t border-border/80 pt-6">
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-primary">
                Current copy
              </span>
              <h2 className="mt-3 max-w-xl text-balance font-display text-[clamp(1.7rem,3.4vw,2.4rem)] leading-[1.02] text-foreground">
                The full CV is available on request.
              </h2>
              <p className="mt-4 max-w-xl text-[12.5px] leading-relaxed text-muted-foreground">
                I keep the PDF updated with commercial work at SOFOF Tech rather
                than publish a stale download. Request the latest copy, or use the
                portfolio evidence below — every project claim links to a
                repository.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${siteConfig.author.email}?subject=Résumé%20request%20—%20Md.%20Rakib%20Islam`}
                  className={buttonVariants({ variant: "primary", size: "lg" })}
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Request the latest CV
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                  })}
                >
                  <Icons.linkedIn className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 border-t border-border/80 pt-6 sm:grid-cols-2">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                    What the CV covers
                  </span>
                  <ul className="mt-3 space-y-2 text-[11.5px] leading-relaxed text-foreground/85">
                    <li>Commercial frontend work at SOFOF Tech</li>
                    <li>Selected projects and architectural decisions</li>
                    <li>Frontend and full-stack technical scope</li>
                    <li>Location, availability and contact details</li>
                  </ul>
                </div>

                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                    Inspect now
                  </span>
                  <ul className="mt-3 space-y-3">
                    <li>
                      <Link
                        href="/#experience"
                        className="group inline-flex items-center gap-1.5 text-[11.5px] font-medium text-foreground transition-colors hover:text-primary"
                      >
                        <span className="underline-sweep">Experience</span>
                        <ArrowUpRight
                          className="h-3 w-3"
                          aria-hidden="true"
                        />
                      </Link>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        Responsibilities and production platforms
                      </p>
                    </li>
                    <li>
                      <Link
                        href="/#case-studies"
                        className="group inline-flex items-center gap-1.5 text-[11.5px] font-medium text-foreground transition-colors hover:text-primary"
                      >
                        <span className="underline-sweep">Case studies</span>
                        <ArrowUpRight
                          className="h-3 w-3"
                          aria-hidden="true"
                        />
                      </Link>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        Architecture, trade-offs and code references
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="mt-10 border-t border-border/70 pt-4 font-mono text-[8.5px] leading-relaxed text-muted-foreground">
                Owner note · adding <code>public/resume.pdf</code> automatically
                replaces this state with the embedded viewer and download
                actions.
              </p>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
