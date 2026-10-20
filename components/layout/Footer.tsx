import * as React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { ArrowUp, Mail } from "lucide-react";
import { Icons } from "@/components/shared/Icons";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface py-12 transition-colors">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
        {/* Left: Identity & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <p className="font-medium text-foreground">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <span className="hidden sm:inline text-border">|</span>
          <p className="text-xs font-mono">
            Built with Next.js App Router, TypeScript & Tailwind CSS
          </p>
        </div>

        {/* Right: Social Links & Back to Top */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-muted hover:text-foreground transition-colors text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="GitHub Profile"
          >
            <Icons.gitHub className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-muted hover:text-foreground transition-colors text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="LinkedIn Profile"
          >
            <Icons.linkedIn className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.links.email}
            className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-muted hover:text-foreground transition-colors text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Send Email"
          >
            <Mail className="h-4 w-4" />
          </a>

          <a
            href="#main-content"
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 min-h-[44px] rounded-lg hover:bg-muted hover:text-foreground transition-colors text-muted-foreground ml-2 focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Back to top of page"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
