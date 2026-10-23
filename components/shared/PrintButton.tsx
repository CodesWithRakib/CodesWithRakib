"use client";

import * as React from "react";
import { Printer } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={buttonVariants({
        variant: "secondary",
        size: "md",
        className: "print-hidden",
      })}
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      Print / save PDF
    </button>
  );
}
