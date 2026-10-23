"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Icons } from "@/components/shared/Icons";
import { EASE_OUT, springSoft } from "@/lib/motion";
import { cn } from "@/lib/utils";

const sectionIds = siteConfig.navItems.map(
  (item) => item.href.split("#")[1] ?? ""
);

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("");
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const firstLinkRef = React.useRef<HTMLAnchorElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (pathname !== "/") return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = "";

      // Walk sections in document order, not navigation order, so the last
      // section that has crossed the marker is always the active one.
      const ordered = sectionIds
        .map((id) => {
          const section = document.getElementById(id);
          return section
            ? {
                id,
                top: section.getBoundingClientRect().top + window.scrollY,
              }
            : null;
        })
        .filter((entry): entry is { id: string; top: number } => entry !== null)
        .sort((a, b) => a.top - b.top);

      for (const section of ordered) {
        if (section.top <= marker) current = section.id;
      }

      setActiveSection(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  React.useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    const focusTimer = window.setTimeout(
      () => firstLinkRef.current?.focus(),
      140
    );

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(focusTimer);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        data-site-chrome
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || menuOpen
          ? "border-b border-border bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="relative flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="group flex items-center gap-3 rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 bg-primary transition-transform duration-300 group-hover:rotate-90"
          />
          <span className="font-display text-[1.2rem] font-semibold leading-none tracking-[-0.02em] text-foreground">
            Rakib Islam
          </span>
          <span className="sr-only">— home</span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-9 lg:flex"
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
                  "relative py-2 text-[0.95rem] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-rule"
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary"
                    transition={springSoft}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <ThemeToggle />

          <Link
            href="/#contact"
            className="group hidden items-center gap-1.5 border-l border-border pl-5 text-[0.95rem] font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:inline-flex"
          >
            <span className="underline-grow">Let&apos;s talk</span>
            <ArrowUpRight
              className="h-4 w-4 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center rounded-xs text-foreground transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden"
        >
          <motion.div
            style={{ scaleX: progress }}
            className="h-full origin-left bg-primary"
          />
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto border-t border-border bg-background lg:hidden"
          >
            <Container className="flex min-h-full flex-col pb-10 pt-8">
              <nav aria-label="Mobile navigation">
                <ul>
                  {siteConfig.navItems.map((item, index) => (
                    <li key={item.href} className="border-b border-border">
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-baseline justify-between gap-4 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                      >
                        <span className="font-display text-[clamp(2.4rem,10vw,3.4rem)] font-medium leading-none tracking-[-0.04em] text-foreground transition-colors group-hover:text-primary">
                          {item.label}
                        </span>
                        <span className="type-label text-muted-foreground">
                          0{index + 1}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-10 space-y-6">
                <div>
                  <p className="type-label text-muted-foreground">Email</p>
                  <a
                    href={siteConfig.links.email}
                    className="mt-2 inline-block text-[1.1rem] font-medium text-foreground underline decoration-border underline-offset-4"
                  >
                    {siteConfig.author.email}
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[1rem] text-foreground"
                  >
                    <Icons.gitHub className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[1rem] text-foreground"
                  >
                    <Icons.linkedIn className="h-4 w-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                  <Link
                    href="/resume"
                    prefetch={false}
                    onClick={() => setMenuOpen(false)}
                    className="text-[1rem] text-foreground"
                  >
                    Résumé
                  </Link>
                </div>

                <p className="type-meta text-muted-foreground">
                  Dhaka, Bangladesh · UTC+6
                </p>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
