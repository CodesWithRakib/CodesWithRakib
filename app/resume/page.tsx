import * as React from "react";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/shared/Icons";
import {
  FileText,
  Mail,
  ArrowLeft,
  Download,
  AlertCircle,
  ExternalLink,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Resume & CV",
  description:
    "Review or request the resume of Md. Rakib Islam, Frontend Developer at SOFOF Tech specializing in React, Next.js, and TypeScript.",
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
  openGraph: {
    title: `Resume & CV | ${siteConfig.name}`,
    description:
      "Review or request the resume of Md. Rakib Islam, Frontend Developer at SOFOF Tech.",
    url: `${siteConfig.url}/resume`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "profile",
  },
};

export default function ResumePage() {
  const resumeFilePath = path.join(process.cwd(), "public", "resume.pdf");
  const hasResumeFile = fs.existsSync(resumeFilePath);

  return (
    <div className="py-16 sm:py-24 min-h-[80vh] flex flex-col justify-center">
      <Container className="max-w-4xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        {hasResumeFile ? (
          /* When resume.pdf is present in public/ */
          <div className="space-y-8">
            <div className="p-8 rounded-2xl border border-border bg-card shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <Badge variant="primary" className="text-xs font-mono">
                  CURATED ASSET
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Md. Rakib Islam — Resume
                </h1>
                <p className="text-sm text-muted-foreground">
                  Frontend Developer at SOFOF Tech · React, Next.js, TypeScript
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a href="/resume.pdf" download="Md_Rakib_Islam_Resume.pdf">
                  <Button variant="primary" size="lg" className="gap-2 font-mono text-xs">
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </Button>
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="gap-2 font-mono text-xs">
                    <ExternalLink className="h-4 w-4" />
                    <span>Open in Tab</span>
                  </Button>
                </a>
              </div>
            </div>

            <div className="border border-border rounded-xl overflow-hidden bg-card h-[750px] shadow-xs">
              <iframe
                src="/resume.pdf"
                className="w-full h-full border-0"
                title="Md. Rakib Islam Resume"
              />
            </div>
          </div>
        ) : (
          /* When resume.pdf is pending user placement */
          <div className="p-8 sm:p-12 rounded-2xl border border-border bg-card shadow-xs space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-accent/40 opacity-80" />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-primary-subtle text-primary border border-primary/20">
                  <FileText className="h-5 w-5" />
                </span>
                <Badge variant="outline" className="text-xs font-mono text-muted-foreground">
                  Resume Status
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Resume & Professional Profile Access
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                To guarantee hiring teams receive the most accurate representation of my current commercial deliverables at SOFOF Tech and flagship monorepos, my formal resume PDF is updated periodically.
              </p>
            </div>

            {/* Direct Verification Alternatives */}
            <div className="p-5 rounded-xl border border-border bg-surface/60 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Live Portfolio Evidence Available Immediately
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All technical details, employment responsibilities, and architecture highlights on this site are verified directly against production source code:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <Link
                  href="/#experience"
                  className="p-3 rounded-lg bg-card border border-border/80 hover:border-primary/40 transition-colors flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                      SOFOF Tech Experience
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      Client deliverables & responsibilities
                    </p>
                  </div>
                  <Briefcase className="h-4 w-4 text-primary shrink-0" />
                </Link>

                <Link
                  href="/#case-studies"
                  className="p-3 rounded-lg bg-card border border-border/80 hover:border-primary/40 transition-colors flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                      Engineering Case Studies
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      OgroniEdu, Dhruto, and Gramer Bazar
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-primary shrink-0" />
                </Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href={`mailto:${siteConfig.author.email}?subject=Resume%20Request%20-%20Md.%20Rakib%20Islam`}>
                <Button variant="primary" size="lg" className="gap-2 font-mono text-xs">
                  <Mail className="h-4 w-4" />
                  <span>Request Updated Resume via Email</span>
                </Button>
              </a>

              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg" className="gap-2 font-mono text-xs">
                  <Icons.linkedIn className="h-4 w-4" />
                  <span>View LinkedIn Profile</span>
                </Button>
              </a>

              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="gap-2 font-mono text-xs">
                  <Icons.gitHub className="h-4 w-4" />
                  <span>Inspect GitHub Code</span>
                </Button>
              </a>
            </div>

            {/* Developer Integration Callout */}
            <div className="p-3.5 rounded-lg bg-surface border border-border/80 text-[11px] font-mono text-muted-foreground flex items-center gap-2">
              <AlertCircle className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>
                Developer Note: Placing <code>public/resume.pdf</code> will automatically activate the interactive in-browser PDF viewer and download buttons on this route.
              </span>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
