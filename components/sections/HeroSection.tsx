"use client";

import * as React from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";
import { HeroVisual } from "@/components/three/HeroVisual";
import { siteConfig } from "@/config/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function HeroSection() {
  const root = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { ease: "power4.out" },
        });

        timeline
          .from(".hero-eyebrow", { autoAlpha: 0, y: 12, duration: 0.7 }, 0.05)
          .from(
            ".hero-line",
            { yPercent: 118, duration: 1.15, stagger: 0.09 },
            0.14
          )
          .from(
            ".hero-fade",
            { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.1 },
            0.48
          )
          .from(
            ".hero-meta",
            { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.06 },
            0.7
          )
          .from(
            ".hero-visual",
            { autoAlpha: 0, y: 24, scale: 0.975, duration: 1.1 },
            0.35
          );

        return () => {
          timeline.kill();
        };
      });

      return () => media.revert();
    },
    { scope: root, dependencies: [] }
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="wash-light absolute inset-0 -z-20"
      />
      <div
        aria-hidden="true"
        className="blueprint-grid absolute inset-0 -z-10 [mask-image:radial-gradient(75%_65%_at_65%_35%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-background"
      />

      <Container className="relative">
        <div className="grid min-h-[calc(100svh-72px)] grid-cols-1 items-center gap-14 pb-8 pt-12 lg:grid-cols-12 lg:gap-6 lg:pb-6 lg:pt-10">
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="hero-eyebrow flex flex-wrap items-center gap-x-3 gap-y-2">
              <span aria-hidden="true" className="h-px w-9 bg-primary/70" />
              <span className="eyebrow text-foreground">
                Md. Rakib Islam — Frontend developer
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary-subtle/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-primary-subtle-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Open to work
              </span>
            </div>

            <h1
              aria-label="Interfaces with intent."
              className="mt-7 font-display text-[clamp(3.4rem,8.4vw,6.35rem)] font-normal leading-[0.88] tracking-[-0.03em] text-foreground"
            >
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="hero-line block">Interfaces</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line block">
                  with <span className="italic text-primary">intent.</span>
                </span>
              </span>
            </h1>

            <p className="hero-fade mt-8 max-w-[33rem] text-pretty text-[0.98rem] leading-relaxed text-muted-foreground sm:text-[1.05rem]">
              I build production SaaS interfaces with{" "}
              <strong className="font-medium text-foreground">
                React, Next.js and TypeScript
              </strong>{" "}
              — and follow the work down the stack through{" "}
              <strong className="font-medium text-foreground">
                NestJS, PostgreSQL and Redis queues
              </strong>
              .
            </p>

            <div className="hero-fade mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#projects"
                className={buttonVariants({
                  variant: "primary",
                  size: "lg",
                  className: "group",
                })}
              >
                <span>Explore selected work</span>
                <ArrowDownRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/resume"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                <span>Résumé</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#contact"
                className="underline-sweep ml-1 inline-flex items-center gap-1.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Or say hello</span>
              </a>
            </div>

            <dl className="hero-meta mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-border/80 pt-6 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                  Currently
                </dt>
                <dd className="mt-1.5 text-[12px] font-medium leading-snug text-foreground">
                  Junior Frontend Developer
                  <span className="block text-muted-foreground">SOFOF Tech</span>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                  Based in
                </dt>
                <dd className="mt-1.5 text-[12px] font-medium leading-snug text-foreground">
                  Dhaka, Bangladesh
                  <span className="block text-muted-foreground">UTC +6</span>
                </dd>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                  Focus
                </dt>
                <dd className="mt-1.5 text-[12px] font-medium leading-snug text-foreground">
                  Interfaces &amp; systems
                  <span className="block text-muted-foreground">
                    Design-minded engineering
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="hero-visual relative lg:col-span-6 xl:col-span-6">
            <HeroVisual />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border/70 py-5 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <span className="relative h-8 w-px overflow-hidden bg-border">
              <span className="absolute inset-x-0 top-0 h-3 animate-[scroll-cue_2.4s_ease-in-out_infinite] bg-primary" />
            </span>
            Scroll to selected work
          </a>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <Icons.gitHub className="h-3.5 w-3.5" aria-hidden="true" />
              GitHub
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <Icons.linkedIn className="h-3.5 w-3.5" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={siteConfig.links.email}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              {siteConfig.author.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
