"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/shared/Icons";
import {
  contactFormSchema,
  ContactFormData,
  ContactApiResponse,
} from "@/lib/validations/contact";
import {
  Mail,
  Copy,
  Check,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  Briefcase,
  FileText,
  ExternalLink,
} from "lucide-react";

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [serverStatus, setServerStatus] = React.useState<ContactApiResponse | null>(null);
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

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(siteConfig.author.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
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
          "Unable to reach the contact server. Please reach out directly to codeswithrakib@gmail.com.",
        deliveryStatus: "fallback_required",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 border-t border-border bg-surface/30">
      <Container>
        {/* Section Header */}
        <ScrollReveal direction="up">
          <SectionHeader
            badge="GET IN TOUCH & CONNECT"
            title="Let's Discuss Engineering Opportunities"
            description="I am actively considering Frontend and full-stack software engineering opportunities. Send a message through the form below, reach out directly via email, or connect on LinkedIn."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Direct Verified Channels & Recruiter Profile (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="left" delayMs={100}>
              <Card className="border-border bg-card p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="space-y-2">
                <Badge variant="primary" className="text-xs font-mono">
                  DIRECT ACCESS
                </Badge>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Recruiter & Team Quick Contact
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Feel free to reach out directly through any of these verified communication channels.
                </p>
              </div>

              {/* Status Context List */}
              <div className="space-y-3 pt-2 border-t border-border/80">
                <div className="flex items-center gap-2.5 text-xs text-foreground/85">
                  <Briefcase className="h-4 w-4 text-primary shrink-0" />
                  <span>
                    <strong>Availability: </strong>Frontend & Full-Stack Roles
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-foreground/85">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>
                    <strong>Location: </strong>Dhaka, Bangladesh (UTC+6)
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-foreground/85">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <span>
                    <strong>Response SLA: </strong>Within 24 hours guaranteed
                  </span>
                </div>
              </div>

              {/* Verified Action Channels */}
              <div className="space-y-3 pt-2 border-t border-border/80">
                {/* One-Click Copy Email */}
                <div className="p-3.5 rounded-xl border border-border bg-surface flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-xs font-mono font-medium truncate text-foreground">
                      {siteConfig.author.email}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1.5 font-mono text-[11px] shrink-0"
                    onClick={handleCopyEmail}
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>

                {/* Direct Link Buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="w-full gap-2 font-mono text-xs">
                      <Icons.linkedIn className="h-3.5 w-3.5" />
                      <span>LinkedIn</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                    </Button>
                  </a>

                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="w-full gap-2 font-mono text-xs">
                      <Icons.gitHub className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto" />
                    </Button>
                  </a>
                </div>

                {/* Resume Access Button */}
                <div className="pt-2">
                  <Link href="/resume" className="block w-full">
                    <Button variant="secondary" size="sm" className="w-full gap-2 font-mono text-xs">
                      <FileText className="h-3.5 w-3.5" />
                      <span>Access Resume / CV Overview</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
            </ScrollReveal>
          </div>

          {/* Right Column: Production Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delayMs={150}>
            <Card className="border-border bg-card p-6 sm:p-8 shadow-xs">
              <CardHeader className="p-0 pb-6 space-y-1">
                <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Send a Direct Message
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Validated with React Hook Form and Zod with server-side rate limiting.
                </p>
              </CardHeader>

              {/* Server Status Feedback Banner */}
              {serverStatus && (
                <div
                  className={`p-4 rounded-xl border mb-6 text-xs leading-relaxed flex items-start gap-3 ${
                    serverStatus.success
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                      : "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400"
                  }`}
                  role="alert"
                >
                  {serverStatus.success ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <p className="font-medium">{serverStatus.message || serverStatus.error}</p>
                    {serverStatus.deliveryStatus === "fallback_required" && (
                      <p className="text-[11px] opacity-90">
                        You can also send your message directly via email to{" "}
                        <a
                          href={`mailto:${siteConfig.author.email}`}
                          className="underline font-mono font-semibold"
                        >
                          {siteConfig.author.email}
                        </a>
                        .
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Form Element */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                {/* Honeypot field (hidden from human users) */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden pointer-events-none"
                  aria-hidden="true"
                  aria-label="Do not fill this field"
                  {...register("botField")}
                />

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-mono font-medium text-foreground block"
                    >
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Sarah Jenkins"
                      disabled={isSubmitting}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-surface border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 transition-colors ${
                        errors.name ? "border-red-500" : "border-border"
                      }`}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="text-[11px] text-red-600 dark:text-red-400 font-mono">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-mono font-medium text-foreground block"
                    >
                      Your Email <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      placeholder="e.g. sarah@company.com"
                      disabled={isSubmitting}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-surface border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 transition-colors ${
                        errors.email ? "border-red-500" : "border-border"
                      }`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="text-[11px] text-red-600 dark:text-red-400 font-mono">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="text-xs font-mono font-medium text-foreground block"
                  >
                    Subject <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Frontend Engineering Opportunity / Contract"
                    disabled={isSubmitting}
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-surface border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 transition-colors ${
                      errors.subject ? "border-red-500" : "border-border"
                    }`}
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p id="subject-error" role="alert" className="text-[11px] text-red-600 dark:text-red-400 font-mono">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-mono font-medium text-foreground block"
                    >
                      Message <span className="text-primary">*</span>
                    </label>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {messageLength} / 2000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Provide details about your project, engineering role, or collaboration request..."
                    disabled={isSubmitting}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-surface border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/40 transition-colors resize-y min-h-[120px] ${
                      errors.message ? "border-red-500" : "border-border"
                    }`}
                    {...register("message", {
                      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setMessageLength(e.target.value.length),
                    })}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="text-[11px] text-red-600 dark:text-red-400 font-mono">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto gap-2 font-mono text-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>

                  <a
                    href={`mailto:${siteConfig.author.email}?subject=Inquiry%20via%20Portfolio`}
                    className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors underline"
                  >
                    Prefer your native email app?
                  </a>
                </div>
              </form>
            </Card>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
