import * as React from "react";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

function PosterChrome({
  project,
  children,
}: {
  project: Project;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "poster group relative overflow-hidden rounded-lg shadow-plate",
        `poster-${project.poster}`
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_0%,rgba(255,255,255,0.12),transparent_60%)]" />

      <div className="relative flex min-h-[420px] flex-col p-6 sm:min-h-[480px] sm:p-8 lg:min-h-[560px] lg:p-10">
        <div className="flex items-start justify-between gap-4">
          <span className="type-label min-w-0 poster-muted">
            {project.domain}
          </span>
          <span className="type-label shrink-0 whitespace-nowrap poster-muted">
            {project.index} / 03
          </span>
        </div>

        <div className="mt-7 flex-1">{children}</div>

        <div className="mt-7 flex flex-wrap items-end justify-between gap-3 border-t pt-4 poster-line">
          <span className="type-meta poster-muted">
            {project.artworkCaption}
          </span>
          <span className="type-label poster-muted">Interface study</span>
        </div>
      </div>
    </div>
  );
}

function PosterTitle({
  title,
  nativeTitle,
  description,
}: {
  title: string;
  nativeTitle: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="font-display text-[clamp(2rem,4.2vw,3.1rem)] font-medium leading-[0.92] tracking-[-0.045em]">
          {title}
        </p>
        <span
          lang="bn"
          className="text-[1rem] leading-none poster-muted"
        >
          {nativeTitle}
        </span>
      </div>
      <p className="mt-3 max-w-[32ch] text-[0.95rem] leading-relaxed poster-muted">
        {description}
      </p>
    </div>
  );
}

function OgroniEduArtwork() {
  const roles = ["Guardian", "Tutor", "Student", "Admin"];

  return (
    <div className="flex h-full flex-col">
      <PosterTitle
        title="OgroniEdu"
        nativeTitle="অগ্রণী এডু"
        description="Guardian workspace for a tutoring marketplace spanning 64 districts."
      />

      <div className="mt-6 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-[1fr_0.62fr]">
        <div className="flex flex-col rounded-sm border p-4 poster-line">
          <div className="flex items-center justify-between">
            <span className="type-label poster-muted">Role access</span>
            <span className="type-label poster-accent">gated</span>
          </div>
          <ul className="mt-3 flex flex-1 flex-col justify-between">
            {roles.map((role, index) => (
              <li
                key={role}
                className="flex items-center justify-between gap-3 border-b py-2.5 text-[0.95rem] last:border-b-0 poster-line"
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-2 w-2",
                      index === 0
                        ? "poster-accent-bg"
                        : "border border-current opacity-50"
                    )}
                  />
                  {role}
                </span>
                <span className="type-label poster-muted">
                  {index === 0 ? "signed in" : "protected"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <div className="rounded-sm border p-3.5 poster-line">
            <span className="type-label poster-muted">Shared contract</span>
            <p className="mt-2 font-mono text-[0.8rem] leading-snug">
              LessonBookingSchema
            </p>
            <p className="mt-1.5 text-[0.8rem] poster-muted">
              Zod · web ↔ API
            </p>
          </div>

          <div className="rounded-sm border p-3.5 poster-line">
            <span className="type-label poster-muted">Data layer</span>
            <p className="mt-1.5 font-display text-[2.1rem] leading-none">
              18
            </p>
            <p className="text-[0.8rem] poster-muted">RTK Query services</p>
          </div>

          <div className="mt-auto rounded-sm border p-3.5 poster-line">
            <span className="type-label poster-muted">Realtime</span>
            <p className="mt-2 flex items-center gap-2 text-[0.9rem]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full poster-accent-bg"
              />
              Socket.io gateway
            </p>
            <p className="text-[0.8rem] poster-muted">
              booking + attendance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DhrutoArtwork() {
  const stages = [
    "CREATED",
    "PICKED_UP",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "CASH_VERIFIED",
  ];

  return (
    <div className="flex h-full flex-col">
      <PosterTitle
        title="Dhruto"
        nativeTitle="দ্রুত"
        description="Merchant view of a courier network where every transition is explicit."
      />

      <div className="mt-6 rounded-sm border p-4 poster-line">
        <div className="flex items-center justify-between gap-3">
          <span className="type-label poster-muted">Parcel lifecycle</span>
          <span className="type-label poster-accent">21 states</span>
        </div>

        <ol className="mt-3">
          {stages.map((stage, index) => (
            <li
              key={stage}
              className="flex items-center gap-3 border-b py-2 last:border-b-0 poster-line"
            >
              <span className="type-label w-5 shrink-0 poster-muted">
                0{index + 1}
              </span>
              <span className="font-mono text-[0.8rem] leading-none">
                {stage}
              </span>
              {index < stages.length - 1 ? (
                <ArrowRight
                  className="ml-auto h-3.5 w-3.5 opacity-60"
                  aria-hidden="true"
                />
              ) : (
                <span className="type-label ml-auto poster-accent">
                  settled
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-3 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-sm border p-3.5 poster-line">
          <span className="type-label poster-muted">Async workers</span>
          <p className="mt-2 font-mono text-[0.8rem]">BullMQ · Redis</p>
          <div className="mt-3 space-y-1.5">
            {[72, 48, 86].map((width, index) => (
              <span
                key={index}
                className="block h-1 rounded-full bg-current opacity-25"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
          <p className="mt-2 text-[0.8rem] poster-muted">
            tracking · webhooks · ledger
          </p>
        </div>

        <div className="rounded-sm border p-3.5 poster-line">
          <span className="type-label poster-muted">COD ledger</span>
          <p className="mt-2 font-mono text-[0.8rem] leading-relaxed">
            CASH_PENDING
            <span className="mx-1.5 poster-accent">→</span>
            CASH_VERIFIED
          </p>
          <p className="mt-2 text-[0.8rem] leading-relaxed poster-muted">
            Double-entry settlement before merchant credit.
          </p>
        </div>
      </div>
    </div>
  );
}

function GramerBazarArtwork() {
  const filters = ["Category", "Price", "Stock", "Rating"];
  const categories = [
    { label: "Grains", shape: "rounded-full" },
    { label: "Spices", shape: "rounded-t-full" },
    { label: "Crafts", shape: "rounded-sm" },
  ];

  return (
    <div className="flex h-full flex-col">
      <PosterTitle
        title="Gramer Bazar"
        nativeTitle="গ্রামের বাজার"
        description="A rural storefront where every filter is a shareable URL."
      />

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <span
            key={filter}
            className={cn(
              "border px-3 py-1.5 font-mono text-[0.75rem] leading-none",
              index === 0 ? "poster-accent" : "poster-muted",
              "poster-line"
            )}
          >
            {filter}
          </span>
        ))}
      </div>

      <div className="mt-4 grid flex-1 grid-cols-3 gap-3">
        {categories.map((category, index) => (
          <div
            key={category.label}
            className="flex flex-col justify-between rounded-sm border p-3 poster-line"
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-14 w-full sm:h-20",
                category.shape,
                index === 0
                  ? "poster-accent-bg"
                  : index === 1
                    ? "bg-current opacity-20"
                    : "border border-current"
              )}
            />
            <div className="mt-3">
              <span className="block text-[0.85rem]">{category.label}</span>
              <span className="mt-1 block h-1 w-8 bg-current opacity-25" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-sm border p-3 poster-line">
        <span
          aria-hidden="true"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full border font-mono text-[0.7rem] poster-line"
        >
          ↔
        </span>
        <div className="min-w-0">
          <span className="block text-[0.85rem]">Buyer ↔ seller chat</span>
          <span className="block text-[0.8rem] poster-muted">
            Socket.io · pre-purchase questions
          </span>
        </div>
        <span className="type-label ml-auto shrink-0 poster-accent">live</span>
      </div>
    </div>
  );
}

export function ProjectArtwork({ project }: { project: Project }) {
  return (
    <PosterChrome project={project}>
      {project.id === "ogroniedu" && <OgroniEduArtwork />}
      {project.id === "dhruto" && <DhrutoArtwork />}
      {project.id === "gramer-bazar" && <GramerBazarArtwork />}
    </PosterChrome>
  );
}
