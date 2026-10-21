import * as React from "react";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { Icons } from "@/components/shared/Icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80 bg-surface/55">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="font-display text-[clamp(1.9rem,3.4vw,2.7rem)] leading-none tracking-[-0.02em] text-foreground">
              Md. Rakib Islam
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              Frontend developer · Dhaka, Bangladesh
            </p>

            <p className="mt-5 max-w-sm text-[11.5px] leading-relaxed text-muted-foreground">
              Building considered interfaces and the typed systems behind them.
              Open to frontend and full-stack opportunities.
            </p>

            <a
              href={siteConfig.links.email}
              className="underline-sweep mt-5 inline-flex items-center gap-1.5 text-[12px] font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {siteConfig.author.email}
            </a>

            <div className="mt-5 flex items-center gap-4">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <Icons.gitHub className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <Icons.linkedIn className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${siteConfig.author.email}`}
                aria-label="Send an email"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-8 lg:col-span-4 lg:col-start-7"
          >
            <div>
              <span className="eyebrow">Index</span>
              <ul className="mt-3 space-y-2">
                {siteConfig.navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[11.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="eyebrow">Elsewhere</span>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    GitHub
                    <ArrowUpRight className="h-2.5 w-2.5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    LinkedIn
                    <ArrowUpRight className="h-2.5 w-2.5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <Link
                    href="/resume"
                    className="text-[11.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Résumé
                  </Link>
                </li>
                <li>
                  <a
                    href={siteConfig.links.email}
                    className="text-[11.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                Available for work
              </span>
            </div>
            <Link
              href="/#contact"
              className="group mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-[11px] font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              Start a conversation
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted-foreground">
            © {year} Md. Rakib Islam · Next.js, TypeScript, GSAP &amp; R3F
          </p>
          <a
            href="#main-content"
            className="inline-flex items-center gap-1.5 self-start font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:self-auto"
          >
            Back to top
            <ArrowUp className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
