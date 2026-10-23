import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[78vh] items-center py-28">
      <Container>
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="type-label text-muted-foreground">Error 404</p>
            <h1 className="type-hero mt-6 text-foreground">
              404<span className="text-primary">.</span>
            </h1>
            <h2 className="mt-8 max-w-[22ch] font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight tracking-[-0.03em] text-foreground">
              This page does not exist.
            </h2>
            <p className="mt-4 max-w-[48ch] text-[1.0625rem] leading-[1.7] text-muted-foreground">
              The route may have moved or never existed. Head back to the
              homepage to see selected work and experience.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
            <Link
              href="/"
              className={buttonVariants({
                variant: "primary",
                size: "lg",
                className: "w-full lg:w-auto",
              })}
            >
              Return to Homepage
            </Link>
            <Link
              href="/#work"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "w-full lg:w-auto",
              })}
            >
              View selected work
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
