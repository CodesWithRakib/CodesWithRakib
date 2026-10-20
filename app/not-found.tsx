import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Code2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 min-h-[70vh] flex items-center justify-center">
      <Container className="max-w-2xl text-center space-y-6">
        <div className="inline-flex items-center">
          <Badge variant="outline" className="font-mono text-xs px-3 py-1 text-primary border-primary/30">
            404 ERROR — ROUTE NOT FOUND
          </Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          This page does not exist.
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
          The requested URL could not be found. It may have been moved or removed.
          You can return to the homepage to inspect my featured engineering work and commercial experience.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
              <Home className="h-4 w-4" />
              <span>Return to Homepage</span>
            </Button>
          </Link>
          <Link href="/#projects" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2 font-mono text-xs">
              <Code2 className="h-4 w-4 text-primary" />
              <span>Explore Projects</span>
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
