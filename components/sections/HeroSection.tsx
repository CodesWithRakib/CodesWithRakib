"use client";

import * as React from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/Icons";
import { HeroScene } from "@/components/three/HeroScene";
import { profileData } from "@/data/profile";
import { siteConfig } from "@/config/site";
import { GSAP_EASE } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export function HeroSection() {
  const root = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { ease: GSAP_EASE.expo },
        });

        timeline
          .from(".hero-line", {
            yPercent: 112,
            duration: 1.25,
            stagger: 0.09,
          })
          .from(
            ".hero-fade",
            { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.09 },
            0.35
          )
          .from(
            ".hero-visual",
            { autoAlpha: 0, scale: 0.97, y: 26, duration: 1.2 },
            0.28
          )
          .from(
            ".hero-rail > *",
            { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.07 },
            0.72
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
        className="dot-field absolute inset-x-0 top-0 -z-10 h-[560px] [mask-image:radial-gradient(70%_60%_at_78%_18%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-20 -z-10 h-px bg-border/70"
      />

      <Container className="flex min-h-[100svh] flex-col justify-center pb-12 pt-24 sm:pt-28 lg:pb-8 lg:pt-28">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="hero-fade flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="type-label inline-flex items-center gap-2.5 text-foreground">
                <span aria-hidden="true" className="h-2 w-2 bg-primary" />
                Available for work
              </span>
              <span
                aria-hidden="true"
                className="hidden h-3 w-px bg-border sm:block"
              />
              <span className="type-label text-muted-foreground">
                Dhaka, Bangladesh
              </span>
            </div>

            <h1 className="type-hero mt-7 text-foreground">
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="hero-line block">Rakib</span>
              </span>{" "}
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="hero-line block">
                  Islam<span className="text-primary">.</span>
                </span>
              </span>
            </h1>

            <p className="hero-fade type-lead mt-8 max-w-[27ch] text-foreground">
              Frontend developer building modern web applications.
            </p>
            <p className="hero-fade mt-4 max-w-[52ch] text-[1.0625rem] leading-[1.7] text-muted-foreground">
              {profileData.heroValue}
            </p>

            <div className="hero-fade mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#work"
                className={buttonVariants({
                  variant: "primary",
                  size: "lg",
                  className: "group",
                })}
              >
                View projects
                <ArrowDownRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="#contact"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                Contact me
              </Link>
            </div>

            <div className="hero-fade mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[1rem] font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <Icons.gitHub
                  className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-primary"
                  aria-hidden="true"
                />
                <span className="underline-grow">GitHub</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[1rem] font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <Icons.linkedIn
                  className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-primary"
                  aria-hidden="true"
                />
                <span className="underline-grow">LinkedIn</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div className="hero-visual relative lg:col-span-5">
            <HeroScene className="mx-auto w-full max-w-[480px] lg:max-w-none" />
          </div>
        </div>

        <dl className="hero-rail mt-10 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-border pt-7 sm:grid-cols-3">
          <div>
            <dt className="type-label text-muted-foreground">Currently</dt>
            <dd className="mt-2 text-[1rem] leading-snug text-foreground">
              Junior Frontend Developer
              <span className="block text-muted-foreground">SOFOF Tech</span>
            </dd>
          </div>
          <div>
            <dt className="type-label text-muted-foreground">Based in</dt>
            <dd className="mt-2 text-[1rem] leading-snug text-foreground">
              Dhaka, Bangladesh
              <span className="block text-muted-foreground">
                {profileData.timezone}
              </span>
            </dd>
          </div>
          <div>
            <dt className="type-label text-muted-foreground">Open to</dt>
            <dd className="mt-2 text-[1rem] leading-snug text-foreground">
              Frontend &amp; full-stack roles
              <span className="block text-muted-foreground">
                Full-time or contract
              </span>
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
