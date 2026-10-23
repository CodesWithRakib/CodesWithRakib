"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Icons } from "@/components/shared/Icons";
import { siteConfig } from "@/config/site";
import { EASE_OUT } from "@/lib/motion";

export function ContactSection() {
  const [copied, setCopied] = React.useState(false);
  const [copyFailed, setCopyFailed] = React.useState(false);
  const email = siteConfig.author.email;

  React.useEffect(() => {
    if (!copied && !copyFailed) return;
    const timer = window.setTimeout(() => {
      setCopied(false);
      setCopyFailed(false);
    }, 2400);
    return () => window.clearTimeout(timer);
  }, [copied, copyFailed]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopyFailed(true);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 bg-[var(--inverse-bg)] text-[var(--inverse-fg)]"
    >
      <Container className="py-24 sm:py-28 lg:py-36">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4">
              <span className="type-label text-[var(--inverse-primary)]">
                04
              </span>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-[var(--inverse-border)]"
              />
              <span className="type-label text-[var(--inverse-muted)]">
                Contact
              </span>
            </div>

            <h2
              id="contact-heading"
              className="type-h2 mt-7 max-w-[15ch] text-[var(--inverse-fg)]"
            >
              Let&apos;s build something worth shipping.
            </h2>

            <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-[1.7] text-[var(--inverse-muted)]">
              I&apos;m open to frontend and full-stack roles, plus selective
              contract work. Tell me what you&apos;re building and where I can
              help.
            </p>

            <div className="mt-11">
              <p className="type-label text-[var(--inverse-muted)]">
                Email — fastest route
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-4">
                <a
                  href={`mailto:${email}`}
                  className="group inline-flex max-w-full items-center gap-3 font-display text-[clamp(1.6rem,4.2vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.04em] text-[var(--inverse-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inverse-primary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--inverse-bg)]"
                >
                  <span className="break-all border-b border-[var(--inverse-border)] pb-1 transition-colors group-hover:border-[var(--inverse-primary)]">
                    {email}
                  </span>
                  <Mail
                    className="hidden h-6 w-6 shrink-0 text-[var(--inverse-primary)] sm:block"
                    aria-hidden="true"
                  />
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-xs border border-[var(--inverse-border)] px-4 py-2.5 text-[0.9375rem] font-medium text-[var(--inverse-fg)] transition-colors hover:border-[var(--inverse-primary)] hover:text-[var(--inverse-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inverse-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--inverse-bg)]"
                >
                  <AnimatePresence initial={false} mode="wait">
                    <motion.span
                      key={copied ? "copied" : "copy"}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.18, ease: EASE_OUT }}
                      className="grid place-items-center"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Copy className="h-4 w-4" aria-hidden="true" />
                      )}
                    </motion.span>
                  </AnimatePresence>
                  {copied ? "Copied" : "Copy email"}
                </button>
              </div>

              <p
                aria-live="polite"
                className="mt-3 min-h-[1.5rem] text-[0.9375rem] text-[var(--inverse-muted)]"
              >
                {copied && "Email address copied to clipboard."}
                {copyFailed && (
                  <>
                    Copy unavailable — use{" "}
                    <a
                      href={`mailto:${email}`}
                      className="underline underline-offset-4"
                    >
                      mailto
                    </a>{" "}
                    instead.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 lg:pt-16">
            <div className="border-t border-[var(--inverse-border)] pt-6">
              <p className="type-label text-[var(--inverse-muted)]">
                Elsewhere
              </p>
              <ul className="mt-4">
                {[
                  {
                    label: "LinkedIn",
                    href: siteConfig.links.linkedin,
                    external: true,
                  },
                  {
                    label: "GitHub",
                    href: siteConfig.links.github,
                    external: true,
                  },
                  {
                    label: "Résumé",
                    href: siteConfig.links.resume,
                    external: false,
                  },
                ].map((link) => (
                  <li
                    key={link.label}
                    className="border-b border-[var(--inverse-border)]"
                  >
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-4 py-4 text-[1.0625rem] font-medium text-[var(--inverse-fg)] transition-colors hover:text-[var(--inverse-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inverse-primary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--inverse-bg)]"
                      >
                        <span className="inline-flex items-center gap-2.5">
                          {link.label === "LinkedIn" ? (
                            <Icons.linkedIn
                              className="h-4 w-4 text-[var(--inverse-muted)]"
                              aria-hidden="true"
                            />
                          ) : (
                            <Icons.gitHub
                              className="h-4 w-4 text-[var(--inverse-muted)]"
                              aria-hidden="true"
                            />
                          )}
                          {link.label}
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        prefetch={false}
                        className="group flex items-center justify-between gap-4 py-4 text-[1.0625rem] font-medium text-[var(--inverse-fg)] transition-colors hover:text-[var(--inverse-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--inverse-primary)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--inverse-bg)]"
                      >
                        {link.label}
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <dl className="mt-7 space-y-5">
                <div>
                  <dt className="type-label text-[var(--inverse-muted)]">
                    Based in
                  </dt>
                  <dd className="mt-1.5 text-[1rem] text-[var(--inverse-fg)]">
                    Dhaka, Bangladesh · UTC+6
                  </dd>
                </div>
                <div>
                  <dt className="type-label text-[var(--inverse-muted)]">
                    Currently
                  </dt>
                  <dd className="mt-1.5 text-[1rem] text-[var(--inverse-fg)]">
                    Junior Frontend Developer, SOFOF Tech
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
