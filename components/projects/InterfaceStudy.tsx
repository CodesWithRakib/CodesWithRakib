import * as React from "react";
import { cn } from "@/lib/utils";

function BrowserChrome({ path, label }: { path: string; label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border/80 bg-surface/80 px-3.5 py-2.5">
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-primary/70" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
      </span>
      <span className="ml-2 truncate font-mono text-[9px] tracking-[0.04em] text-muted-foreground">
        {path}
      </span>
      <span className="ml-auto shrink-0 rounded-full border border-border px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function StudyFooter() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/70 px-3.5 py-2">
      <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
        <span className="h-1 w-1 rounded-full bg-primary" />
        Interface study
      </span>
      <span className="font-mono text-[8px] tracking-[0.02em] text-muted-foreground">
        composed from verified build details
      </span>
    </div>
  );
}

function OgroniEduStudy() {
  return (
    <div className="flex h-full flex-col">
      <BrowserChrome path="ogroniedu / guardian" label="monorepo" />
      <div className="grid flex-1 grid-cols-[74px_1fr] gap-2.5 p-3 sm:grid-cols-[88px_1fr] sm:p-3.5">
        <aside className="rounded-xl border border-border/70 bg-surface/60 p-2">
          <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground">
            Roles
          </span>
          <ul className="mt-2 space-y-1">
            {["Guardian", "Tutor", "Student", "Admin"].map((role, index) => (
              <li
                key={role}
                className={cn(
                  "rounded-md px-1.5 py-1 font-mono text-[8px] leading-none",
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                )}
              >
                {role}
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-border/60 pt-2">
            <span className="block font-mono text-[7px] uppercase tracking-[0.12em] text-muted-foreground">
              Realtime
            </span>
            <span className="mt-1 flex items-center gap-1 font-mono text-[8px] text-accent">
              <span className="h-1 w-1 rounded-full bg-accent" />
              socket.io
            </span>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
              Guardian workspace
            </span>
            <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-primary">
              verified
            </span>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/70 p-2.5 sm:p-3">
            <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground">
              Upcoming session
            </span>
            <p className="mt-1 font-display text-[clamp(0.95rem,2vw,1.35rem)] leading-[1.05] text-foreground">
              Scheduling without the
              <br />
              <span className="italic text-primary">back-and-forth.</span>
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1">
              {["Attendance", "Lesson notes", "Payout ledger"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border/80 px-1.5 py-0.5 font-mono text-[7px] text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-2">
            <div className="rounded-xl border border-primary/25 bg-primary-subtle/60 p-2.5">
              <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-primary">
                Shared contract
              </span>
              <p className="mt-1.5 truncate font-mono text-[8px] text-primary-subtle-foreground">
                LessonBookingSchema
              </p>
              <p className="mt-1 font-mono text-[7px] leading-relaxed text-muted-foreground">
                zod · typescript
                <br />
                web ↔ api
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-surface/60 p-2.5">
              <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted-foreground">
                Data layer
              </span>
              <p className="mt-1 flex items-baseline gap-1 text-foreground">
                <span className="font-display text-[1.6rem] leading-none">
                  18
                </span>
                <span className="font-mono text-[7px] text-muted-foreground">
                  RTK services
                </span>
              </p>
              <p className="mt-1 font-mono text-[7px] leading-relaxed text-muted-foreground">
                tag-invalidated cache
              </p>
            </div>
          </div>
        </div>
      </div>
      <StudyFooter />
    </div>
  );
}

function DhrutoStudy() {
  const stages = ["Picked up", "Origin hub", "In transit", "Out for delivery"];

  return (
    <div className="flex h-full flex-col">
      <BrowserChrome path="dhruto / merchant" label="21 states" />
      <div className="flex flex-1 flex-col gap-2.5 p-3 sm:p-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
            Parcel lifecycle
          </span>
          <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-accent">
            guarded transitions
          </span>
        </div>

        <div className="rounded-xl border border-border/70 bg-background/70 p-2.5 sm:p-3">
          <div className="flex items-center gap-1">
            {stages.map((stage, index) => (
              <React.Fragment key={stage}>
                <span
                  className={cn(
                    "shrink-0 rounded-full border px-1.5 py-1 font-mono text-[6.5px] leading-none sm:text-[7.5px]",
                    index === 2
                      ? "border-accent/50 bg-accent-subtle text-accent-subtle-foreground"
                      : "border-border/80 text-muted-foreground"
                  )}
                >
                  {stage}
                </span>
                {index < stages.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="h-px min-w-1 flex-1 bg-border"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {[38, 62, 84, 46].map((width, index) => (
              <span
                key={index}
                style={{ width: `${width}%` }}
                className="h-1 rounded-full bg-accent/40"
              />
            ))}
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-2">
          <div className="rounded-xl border border-border/70 bg-surface/60 p-2.5">
            <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted-foreground">
              Async workers
            </span>
            <p className="mt-1.5 font-mono text-[9px] text-foreground">
              BullMQ · Redis
            </p>
            <div className="mt-2 space-y-1">
              {[64, 44, 78].map((width, index) => (
                <span key={index} className="flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  <span
                    className="h-1 rounded-full bg-foreground/10"
                    style={{ width: `${width}%` }}
                  />
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-accent/25 bg-accent-subtle/50 p-2.5">
            <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-accent-subtle-foreground">
              COD ledger
            </span>
            <p className="mt-1.5 font-mono text-[8px] leading-relaxed text-foreground">
              CASH_PENDING
              <span className="mx-1 text-accent">→</span>
              CASH_VERIFIED
            </p>
            <p className="mt-1 font-mono text-[7px] leading-relaxed text-muted-foreground">
              double-entry settlement
              <br />
              before merchant credit
            </p>
          </div>
        </div>
      </div>
      <StudyFooter />
    </div>
  );
}

function GramerBazarStudy() {
  return (
    <div className="flex h-full flex-col">
      <BrowserChrome path="gramer-bazar / catalog" label="rural saas" />
      <div className="flex flex-1 flex-col gap-2.5 p-3 sm:p-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
            Faceted catalog
          </span>
          <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-accent">
            redis cached
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {["Category", "Price", "Stock", "Rating"].map((filter, index) => (
            <span
              key={filter}
              className={cn(
                "rounded-full border px-2 py-0.5 font-mono text-[7px]",
                index === 0
                  ? "border-primary/40 bg-primary-subtle text-primary"
                  : "border-border/80 text-muted-foreground"
              )}
            >
              {filter}
            </span>
          ))}
        </div>

        <div className="grid flex-1 grid-cols-3 gap-2">
          {[
            { label: "Grains", tone: "bg-primary/15" },
            { label: "Spices", tone: "bg-accent/25" },
            { label: "Crafts", tone: "bg-foreground/10" },
          ].map((tile) => (
            <div
              key={tile.label}
              className="flex flex-col justify-between rounded-xl border border-border/70 bg-background/60 p-2"
            >
              <span
                aria-hidden="true"
                className={cn("h-6 w-full rounded-md sm:h-8", tile.tone)}
              />
              <div className="mt-2 space-y-1">
                <span className="block font-mono text-[7px] text-foreground">
                  {tile.label}
                </span>
                <span className="block h-1 w-2/3 rounded-full bg-foreground/10" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-surface/70 p-2">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 font-mono text-[8px] text-accent">
            ↔
          </span>
          <div className="min-w-0">
            <span className="block font-mono text-[7px] uppercase tracking-[0.12em] text-muted-foreground">
              Buyer ↔ seller
            </span>
            <span className="block truncate font-mono text-[7px] text-foreground/80">
              real-time chat · socket.io
            </span>
          </div>
          <span className="ml-auto shrink-0 rounded-full border border-border px-1.5 py-0.5 font-mono text-[6.5px] uppercase tracking-[0.12em] text-muted-foreground">
            live
          </span>
        </div>
      </div>
      <StudyFooter />
    </div>
  );
}

export function InterfaceStudy({ projectId }: { projectId: string }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -right-2 -top-2 h-full w-full rotate-[1.4deg] rounded-2xl border border-border/60 bg-surface/50"
      />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
        {projectId === "ogroniedu" && <OgroniEduStudy />}
        {projectId === "dhruto" && <DhrutoStudy />}
        {projectId === "gramer-bazar" && <GramerBazarStudy />}
      </div>
    </div>
  );
}
