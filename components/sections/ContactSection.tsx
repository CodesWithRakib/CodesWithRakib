"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MapPin,
  Send,
  TriangleAlert,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { GsapReveal } from "@/components/motion/GsapReveal";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/shared/Icons";
import {
  contactFormSchema,
  ContactFormData,
  ContactApiResponse,
} from "@/lib/validations/contact";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full rounded-none border-0 border-b border-border bg-transparent px-0 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-0 disabled:opacity-60";

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [serverStatus, setServerStatus] =
    React.useState<ContactApiResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [messageLength, setMessageLength] = React.useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      botField: "",
    },
  });

  React.useEffect(() => {
    if (!copiedEmail) return;
    const timer = window.setTimeout(() => setCopiedEmail(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copiedEmail]);

  const copyEmail = () => {
    navigator.clipboard?.writeText(siteConfig.author.email);
    setCopiedEmail(true);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setServerStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result: ContactApiResponse = await response.json();
      setServerStatus(result);

      if (result.success) {
        reset();
        setMessageLength(0);
      }
    } catch {
      setServerStatus({
        success: false,
        error:
          "The contact server could not be reached. Email me directly and I will reply from there.",
        deliveryStatus: "fallback_required",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden border-t border-border/70 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="wash-light absolute inset-0 -z-10 opacity-70"
      />
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          <GsapReveal className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <div data-reveal className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-primary">06</span>
                <span aria-hidden="true" className="h-px w-8 bg-primary/45" />
                <span className="eyebrow">Contact</span>
              </div>

              <h2
                data-reveal
                className="mt-6 max-w-lg text-balance font-display text-[clamp(2.7rem,5.6vw,4.6rem)] leading-[0.9] tracking-[-0.03em] text-foreground"
              >
                Let&apos;s build something{" "}
                <span className="italic text-primary">worth shipping.</span>
              </h2>

              <p
                data-reveal
                className="mt-6 max-w-md text-pretty text-[13.5px] leading-relaxed text-muted-foreground"
              >
                I&apos;m open to frontend and full-stack roles, and to selective
                contract work. The fastest way to reach me is email — the form
                works too.
              </p>

              <div data-reveal className="mt-8">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${siteConfig.author.email}`}
                    className="underline-sweep font-display text-[clamp(1.35rem,2.6vw,1.9rem)] leading-none text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    {siteConfig.author.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={
                      copiedEmail ? "Email copied" : "Copy email address"
                    }
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {copiedEmail ? (
                      <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                  </button>
                  <span aria-live="polite" className="sr-only">
                    {copiedEmail ? "Email address copied to clipboard" : ""}
                  </span>
                </div>
              </div>

              <dl
                data-reveal
                className="mt-8 grid max-w-md grid-cols-1 gap-3 border-t border-border/80 pt-5 sm:grid-cols-2"
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <div>
                    <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                      Availability
                    </dt>
                    <dd className="mt-1 text-[11px] font-medium text-foreground">
                      Frontend &amp; full-stack roles
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                      Location
                    </dt>
                    <dd className="mt-1 text-[11px] font-medium text-foreground">
                      Dhaka, Bangladesh · UTC+6
                    </dd>
                  </div>
                </div>
              </dl>

              <div
                data-reveal
                className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3"
              >
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[11px] font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <Icons.linkedIn className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="underline-sweep">LinkedIn</span>
                  <ArrowUpRight
                    className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[11px] font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <Icons.gitHub className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="underline-sweep">GitHub</span>
                  <ArrowUpRight
                    className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
                <Link
                  href="/resume"
                  className="underline-sweep text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  Résumé &amp; CV
                </Link>
              </div>
            </div>
          </GsapReveal>

          <GsapReveal className="lg:col-span-6" delay={0.1}>
            <div data-reveal className="border-t border-border/80 pt-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl text-foreground">
                  Send a note
                </h3>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                  Validated · rate limited
                </span>
              </div>
              <p className="mt-2 text-[11.5px] leading-relaxed text-muted-foreground">
                Share the role, the product, or the problem. No newsletters, no
                spam lists.
              </p>

              <AnimatePresence initial={false}>
                {serverStatus && (
                  <motion.div
                    key="contact-status"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <div
                      role="alert"
                      className={cn(
                        "mt-5 flex items-start gap-2.5 border-l-2 py-1 pl-3 text-[11.5px] leading-relaxed",
                        serverStatus.success
                          ? "border-accent text-foreground"
                          : "border-error text-foreground"
                      )}
                    >
                      {serverStatus.success ? (
                        <CheckCircle2
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                      ) : (
                        <TriangleAlert
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-error"
                          aria-hidden="true"
                        />
                      )}
                      <div>
                        <p>{serverStatus.message ?? serverStatus.error}</p>
                        {serverStatus.deliveryStatus ===
                          "fallback_required" &&
                          !serverStatus.error?.includes(
                            siteConfig.author.email
                          ) && (
                          <p className="mt-1 text-muted-foreground">
                            You can also email{" "}
                            <a
                              href={`mailto:${siteConfig.author.email}`}
                              className="font-medium text-primary underline underline-offset-2"
                            >
                              {siteConfig.author.email}
                            </a>
                            .
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 space-y-5"
                noValidate
              >
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="pointer-events-none hidden"
                  aria-hidden="true"
                  aria-label="Do not fill this field"
                  {...register("botField")}
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      disabled={isSubmitting}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={cn(
                        fieldClass,
                        errors.name && "border-error"
                      )}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p
                        id="name-error"
                        role="alert"
                        className="mt-1.5 font-mono text-[9px] text-error"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      disabled={isSubmitting}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={cn(
                        fieldClass,
                        errors.email && "border-error"
                      )}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        role="alert"
                        className="mt-1.5 font-mono text-[9px] text-error"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    Subject <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="Role, project or collaboration"
                    disabled={isSubmitting}
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={
                      errors.subject ? "subject-error" : undefined
                    }
                    className={cn(
                      fieldClass,
                      errors.subject && "border-error"
                    )}
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p
                      id="subject-error"
                      role="alert"
                      className="mt-1.5 font-mono text-[9px] text-error"
                    >
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <label
                      htmlFor="contact-message"
                      className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      Message <span className="text-primary">*</span>
                    </label>
                    <span className="font-mono text-[8px] text-muted-foreground">
                      {messageLength} / 2000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="A little context about the team, product or problem…"
                    disabled={isSubmitting}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={cn(
                      fieldClass,
                      "resize-y",
                      errors.message && "border-error"
                    )}
                    {...register("message", {
                      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setMessageLength(event.target.value.length),
                    })}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      role="alert"
                      className="mt-1.5 font-mono text-[9px] text-error"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="group w-full gap-2 sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2
                          className="h-4 w-4 animate-spin"
                          aria-hidden="true"
                        />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <span>Send message</span>
                        <Send
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Button>

                  <a
                    href={`mailto:${siteConfig.author.email}?subject=Inquiry%20via%20Portfolio`}
                    className="inline-flex items-center gap-1.5 text-[10.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Mail className="h-3 w-3" aria-hidden="true" />
                    Prefer your email app?
                  </a>
                </div>
              </form>
            </div>
          </GsapReveal>
        </div>
      </Container>
    </section>
  );
}
