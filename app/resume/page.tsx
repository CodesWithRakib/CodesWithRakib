import * as React from "react";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download, ExternalLink, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { PrintButton } from "@/components/shared/PrintButton";
import { Icons } from "@/components/shared/Icons";
import { siteConfig } from "@/config/site";
import { profileData } from "@/data/profile";
import { experienceData, toolkitData } from "@/data/experience";
import { featuredProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Résumé & CV",
  description:
    "Résumé of Md. Rakib Islam, frontend developer at SOFOF Tech working with React, Next.js, TypeScript and NestJS.",
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
  openGraph: {
    title: `Résumé & CV | ${siteConfig.name}`,
    description:
      "Experience, selected projects and toolkit of Md. Rakib Islam, frontend developer at SOFOF Tech.",
    url: `${siteConfig.url}/resume`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "profile",
  },
};

const sectionLabel =
  "type-label text-muted-foreground";

export default function ResumePage() {
  const hasResumeFile = fs.existsSync(
    path.join(process.cwd(), "public", "resume.pdf")
  );
  const currentRole = experienceData[0];

  return (
    <div className="pb-20 pt-28 sm:pb-28 sm:pt-32">
      <Container className="max-w-[1080px]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[0.95rem] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            Back to portfolio
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <PrintButton />
            <a
              href={`mailto:${siteConfig.author.email}?subject=Résumé%20request`}
              className={buttonVariants({
                variant: "primary",
                size: "md",
                className: "print-hidden",
              })}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Request latest CV
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-10 sm:mt-16 sm:pt-12">
          <p className={sectionLabel}>Curriculum vitae</p>
          <h1 className="type-h2 mt-5 max-w-[18ch] text-foreground">
            Md. Rakib Islam
          </h1>
          <p className="mt-4 text-[1.2rem] text-foreground">
            Frontend developer — React, Next.js, TypeScript.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.975rem]">
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {siteConfig.author.email}
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              linkedin.com/in/codeswithrakib
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              github.com/CodesWithRakib
            </a>
            <span className="text-muted-foreground">
              {profileData.location}
            </span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <h2 className={sectionLabel}>Profile</h2>
          </div>
          <div className="lg:col-span-9">
            <p className="max-w-[68ch] text-[1.0625rem] leading-[1.7] text-foreground/90">
              Frontend developer building production web applications with
              React, Next.js and TypeScript. My work covers interface
              architecture, accessible design systems and typed data contracts,
              with practical backend experience in NestJS, PostgreSQL and Redis.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <h2 className={sectionLabel}>Experience</h2>
          </div>
          <div className="lg:col-span-9">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
                {currentRole.role}
              </h3>
              <span className="type-label text-muted-foreground">
                {currentRole.period}
              </span>
            </div>
            <p className="mt-1.5 text-[1rem] text-muted-foreground">
              {currentRole.company} · {currentRole.location} · {currentRole.type}
            </p>
            <p className="mt-4 max-w-[64ch] text-[1rem] leading-[1.7] text-foreground/90">
              {currentRole.summary}
            </p>
            <ul className="mt-5 space-y-3">
              {currentRole.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="grid grid-cols-[1rem_1fr] gap-3 text-[1rem] leading-[1.7] text-foreground/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 bg-primary"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-mono text-[0.8125rem] leading-relaxed text-muted-foreground">
              {currentRole.stack.join(" · ")}
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <h2 className={sectionLabel}>Selected projects</h2>
          </div>
          <div className="lg:col-span-9">
            <ul>
              {featuredProjects.map((project) => (
                <li
                  key={project.id}
                  className="border-b border-border py-5 first:pt-0 last:border-b-0"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="font-display text-[1.35rem] font-semibold tracking-[-0.025em] text-foreground">
                      {project.title}
                    </h3>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 font-mono text-[0.8125rem] text-muted-foreground transition-colors hover:text-primary"
                    >
                      Repository
                      <ArrowUpRight
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                  <p className="mt-1.5 max-w-[64ch] text-[1rem] leading-[1.7] text-foreground/85">
                    {project.description}
                  </p>
                  <p className="mt-1.5 font-mono text-[0.8125rem] text-muted-foreground">
                    {project.stack.join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <h2 className={sectionLabel}>Toolkit</h2>
          </div>
          <div className="lg:col-span-9">
            <dl className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
              {toolkitData.map((group) => (
                <div key={group.title}>
                  <dt className="type-label text-primary">{group.title}</dt>
                  <dd className="mt-2 text-[0.975rem] leading-relaxed text-foreground/85">
                    {group.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <h2 className={sectionLabel}>Availability</h2>
          </div>
          <div className="lg:col-span-9">
            <p className="max-w-[64ch] text-[1rem] leading-[1.7] text-foreground/90">
              Open to frontend and full-stack roles in Dhaka or remote, and to
              selective contract work. The fastest route to me is email at{" "}
              <a
                href={`mailto:${siteConfig.author.email}`}
                className="font-medium text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary"
              >
                {siteConfig.author.email}
              </a>
              .
            </p>
          </div>
        </div>

        {hasResumeFile && (
          <div className="mt-12 border-t border-border pt-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="type-label text-muted-foreground">
                Latest PDF copy
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/resume.pdf"
                  download="Md_Rakib_Islam_Resume.pdf"
                  className={buttonVariants({ variant: "primary", size: "md" })}
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
                    size: "md",
                  })}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Open in tab
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-8">
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.975rem] text-foreground"
          >
            <Icons.linkedIn className="h-4 w-4" aria-hidden="true" />
            LinkedIn
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.975rem] text-foreground"
          >
            <Icons.gitHub className="h-4 w-4" aria-hidden="true" />
            GitHub
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <span className="type-meta text-muted-foreground">
            {hasResumeFile
              ? "PDF available above."
              : "A current PDF is available on request — no stale download."}
          </span>
        </div>
      </Container>
    </div>
  );
}
