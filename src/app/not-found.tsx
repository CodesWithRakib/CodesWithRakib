import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center gap-6 px-[var(--space-gutter)] text-center">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-fg-muted">Error 404</p>
      <h1 className="font-display text-5xl tracking-tight text-balance">Page not found</h1>
      <p className="max-w-sm text-base text-fg-muted text-pretty">
        That route does not exist. It may have moved, or it may never have been built.
      </p>
      <Link
        href="/"
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-colors duration-[var(--dur-fast)] hover:bg-accent/90"
      >
        Back to home
      </Link>
    </section>
  );
}
