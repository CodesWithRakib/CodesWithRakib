import * as React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";

const footerLinks = [
  { label: "GitHub", href: siteConfig.links.github, external: true },
  { label: "LinkedIn", href: siteConfig.links.linkedin, external: true },
  { label: "Email", href: siteConfig.links.email, external: false },
  { label: "Résumé", href: siteConfig.links.resume, external: false },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer data-site-chrome className="border-t border-border">
      <Container>
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-display text-[1.05rem] font-semibold tracking-[-0.02em] text-foreground">
              Md. Rakib Islam
            </p>
            <p className="type-meta text-muted-foreground">
              Frontend developer · Dhaka, Bangladesh
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.95rem] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="text-[0.95rem] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-meta text-muted-foreground">
            © {year} Rakib Islam · Built with Next.js
          </p>
          <a
            href="#main-content"
            className="inline-flex items-center gap-2 self-start text-[0.875rem] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:self-auto"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
