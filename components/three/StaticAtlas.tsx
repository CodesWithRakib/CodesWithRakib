import * as React from "react";

/**
 * Lightweight, dependency-free counterpart to the WebGL atlas.
 * Used for reduced-motion preferences, missing WebGL, and while the
 * 3D chunk is still loading. Contains no canvas or continuous scripting.
 */
export function StaticAtlas() {
  return (
    <div className="relative h-full w-full select-none" aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 h-px bg-border/70" />
      <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(60%_55%_at_55%_45%,rgb(var(--wash-1)/0.28),transparent_72%)]" />

      {/* Rear screen */}
      <div className="absolute right-0 top-[9%] w-[76%] rotate-[5.5deg] overflow-hidden rounded-2xl border border-border/80 bg-surface/75 p-3.5 shadow-soft backdrop-blur-sm">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
          <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">
            workspace / 02
          </span>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-2/3 rounded-full bg-foreground/12" />
          <div className="h-1.5 w-full rounded-full bg-foreground/8" />
          <div className="h-1.5 w-5/6 rounded-full bg-foreground/8" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="h-9 rounded-lg border border-border/70 bg-background/60"
            />
          ))}
        </div>
      </div>

      {/* Main screen */}
      <div className="absolute left-0 top-[24%] w-[90%] -rotate-[1.8deg] overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
        <div className="flex items-center gap-2 border-b border-border/70 bg-surface/70 px-3.5 py-2.5">
          <span className="h-2 w-2 rounded-full bg-primary/70" />
          <span className="h-2 w-2 rounded-full bg-foreground/15" />
          <span className="h-2 w-2 rounded-full bg-foreground/15" />
          <span className="ml-2 truncate font-mono text-[9px] tracking-[0.06em] text-muted-foreground">
            codeswithrakib / interface-atlas
          </span>
          <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.16em] text-primary">
            live
          </span>
        </div>

        <div className="grid grid-cols-[44px_1fr] gap-3 p-3.5">
          <div className="flex flex-col items-center gap-2.5 rounded-lg border border-border/60 bg-surface/60 py-2.5">
            <span className="h-5 w-5 rounded-full border border-primary/40 bg-primary/10" />
            {[0, 1, 2, 3].map((index) => (
              <span
                key={index}
                className={`h-1 w-4 rounded-full ${
                  index === 0 ? "bg-primary/60" : "bg-foreground/12"
                }`}
              />
            ))}
          </div>

          <div className="min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">
                Selected interfaces
              </span>
              <span className="rounded-full border border-border px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.12em] text-muted-foreground">
                concept
              </span>
            </div>
            <div className="mt-2 font-display text-[clamp(1.15rem,2.6vw,1.9rem)] leading-[0.95] text-foreground">
              Interfaces,
              <br />
              <span className="italic text-primary">in layers.</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-border/70 bg-surface/70 p-2.5">
                <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground">
                  Contracts
                </span>
                <div className="mt-1.5 space-y-1">
                  <span className="block h-1 w-full rounded-full bg-foreground/15" />
                  <span className="block h-1 w-3/4 rounded-full bg-foreground/10" />
                </div>
                <span className="mt-2 block font-mono text-[7px] text-accent">
                  zod · typescript
                </span>
              </div>
              <div className="rounded-lg border border-primary/25 bg-primary-subtle/70 p-2.5">
                <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-primary">
                  Systems
                </span>
                <div className="mt-2 flex items-end gap-1">
                  {[40, 62, 48, 78, 56].map((height, index) => (
                    <span
                      key={index}
                      style={{ height: `${height / 4}px` }}
                      className="w-1.5 rounded-sm bg-primary/55"
                    />
                  ))}
                </div>
                <span className="mt-2 block font-mono text-[7px] text-muted-foreground">
                  nest · postgres
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-border/60 px-3.5 py-2">
          <span className="font-mono text-[8px] text-muted-foreground">
            React 19 · Next.js 16 · TypeScript
          </span>
          <span className="flex items-center gap-1 font-mono text-[8px] text-primary">
            <span className="h-1 w-1 rounded-full bg-primary" />
            production
          </span>
        </div>
      </div>

      {/* Floating stack chips */}
      <div className="animate-drift absolute -left-1 bottom-[4%] flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1.5 shadow-soft backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="font-mono text-[9px] tracking-[0.08em] text-foreground">
          typed end-to-end
        </span>
      </div>

      <div className="animate-drift absolute -top-2 right-1 flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1.5 shadow-soft backdrop-blur-sm [animation-delay:-4s]">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="font-mono text-[9px] tracking-[0.08em] text-foreground">
          design × engineering
        </span>
      </div>

      <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground lg:block">
        scroll to inspect
      </span>
    </div>
  );
}
