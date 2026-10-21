"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { EASE_OUT, springSoft } from "@/lib/motion";
import { cn } from "@/lib/utils";

const sectionIds = siteConfig.navItems.map((item) => item.href.split("#")[1]);

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("");
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: underline the section currently in the reading band.
  React.useEffect(() => {
    if (pathname !== "/") return;

    const sections = sectionIds
      .map((id) => document.getElementById(id ?? ""))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-32% 0px -58% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    const focusTimer = window.setTimeout(
      () => firstMenuLinkRef.current?.focus(),
      120
    );

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(focusTimer);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-300",
        isScrolled || mobileMenuOpen
          ? "border-b border-border/80 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="relative flex h-[72px] items-center justify-between gap-6">
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <span className="flex flex-col">
            <span className="flex items-baseline gap-1.5">
              <span className="font-display text-[1.4rem] leading-none tracking-[-0.01em] text-foreground">
                Rakib Islam
              </span>
              <span
                aria-hidden="true"
                className="mb-[3px] h-1.5 w-1.5 rounded-full bg-primary transition-transform duration-300 group-hover:scale-125"
              />
            </span>
            <span className="sr-only">, </span>
            <span className="mt-1 font-mono text-[9px] uppercase leading-none tracking-[0.22em] text-muted-foreground">
              Frontend developer
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {siteConfig.navItems.map((item) => {
            const id = item.href.split("#")[1] ?? "";
            const isActive = pathname === "/" && activeSection === id;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative py-1.5 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary"
                    transition={springSoft}
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />

          <Link
            href="/resume"
            className="hidden items-center gap-1 text-[12px] font-medium text-foreground underline-sweep sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <span>Résumé</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation-menu"
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: EASE_OUT }}
              className="absolute left-0 right-0 top-full overflow-hidden border-b border-border bg-background/98 backdrop-blur-xl md:hidden"
            >
              <div className="max-h-[calc(100svh-72px)] overflow-y-auto px-5 pb-8 pt-4 sm:px-8">
                <nav aria-label="Mobile navigation" className="flex flex-col">
                  {siteConfig.navItems.map((item, index) => (
                    <Link
                      key={item.href}
                      ref={index === 0 ? firstMenuLinkRef : undefined}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-baseline justify-between border-b border-border/70 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    >
                      <span className="font-display text-[1.75rem] leading-none text-foreground">
                        {item.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground"
                      >
                        0{index + 1}
                      </span>
                    </Link>
                  ))}
                </nav>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Open to work
                  </span>
                  <ThemeToggle />
                </div>

                <Link
                  href="/resume"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground"
                >
                  <span>View résumé</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
