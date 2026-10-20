"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md transition-colors">
      <Container className="flex h-16 items-center justify-between">
        {/* Brand Identity */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-foreground hover:opacity-90 transition-opacity"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-mono font-bold text-sm shadow-xs">
            RI
          </span>
          <div className="flex flex-col">
            <span className="font-semibold text-sm sm:text-base leading-none text-foreground tracking-tight">
              {siteConfig.name}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground leading-tight mt-0.5">
              Frontend @ SOFOF Tech
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground"
          aria-label="Main Navigation"
        >
          {siteConfig.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <a
            href={siteConfig.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button variant="secondary" size="sm" className="gap-1.5 font-mono text-xs">
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
            </Button>
          </a>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 py-4 space-y-3 transition-all animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-2.5" aria-label="Mobile Navigation">
            {siteConfig.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground py-2 px-3 rounded-md hover:bg-muted transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono">
              Available for opportunities
            </span>
            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button variant="primary" size="sm" className="gap-1.5 font-mono text-xs">
                <FileText className="h-3.5 w-3.5" />
                <span>Resume PDF</span>
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
