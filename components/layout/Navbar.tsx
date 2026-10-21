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
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Track scroll position for subtle elevation
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-border/90 bg-background/90 backdrop-blur-md shadow-xs"
          : "border-b border-transparent bg-background/60 backdrop-blur-sm"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        {/* Brand Identity - Personal Developer First */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-foreground hover:opacity-95 transition-opacity focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1 -ml-1"
          aria-label={`${siteConfig.name} - Software Engineer Homepage`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-mono font-bold text-sm shadow-xs transition-transform duration-200 group-hover:scale-105">
            RI
          </span>
          <div className="flex flex-col">
            <span className="font-semibold text-sm sm:text-base leading-none text-foreground tracking-tight">
              {siteConfig.name}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground leading-tight mt-0.5">
              Software Engineer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground"
          aria-label="Main Navigation"
        >
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-primary focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 py-0.5"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <Link href="/resume" className="hidden sm:inline-flex">
            <Button variant="secondary" size="sm" className="gap-1.5 font-mono text-xs">
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
            </Button>
          </Link>

          {/* Mobile Menu Toggle (WCAG 44x44px target) */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="md:hidden border-b border-border bg-background px-4 py-4 space-y-3 transition-all animate-in fade-in slide-in-from-top-2 shadow-lg"
        >
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-foreground py-2.5 px-3 rounded-lg hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary transition-colors min-h-[44px] flex items-center"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-mono">
              Available for opportunities
            </span>
            <Link
              href="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex"
            >
              <Button variant="primary" size="sm" className="gap-1.5 font-mono text-xs">
                <FileText className="h-3.5 w-3.5" />
                <span>Resume Overview</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
