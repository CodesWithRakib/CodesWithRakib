import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";

// Lightweight in-memory rate limiting map: IP -> timestamp
const ipRateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 30000; // 30 seconds between submissions per IP

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting Check
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const lastRequestTime = ipRateLimitMap.get(ip);
    const now = Date.now();

    if (lastRequestTime && now - lastRequestTime < RATE_LIMIT_WINDOW_MS) {
      const waitSeconds = Math.ceil(
        (RATE_LIMIT_WINDOW_MS - (now - lastRequestTime)) / 1000
      );
      return NextResponse.json(
        {
          success: false,
          error: `Please wait ${waitSeconds} seconds before submitting another message.`,
          deliveryStatus: "fallback_required",
        },
        { status: 429 }
      );
    }

    // 2. Parse and Validate Request Body
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request payload format.",
          deliveryStatus: "fallback_required",
        },
        { status: 400 }
      );
    }

    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string[]> = {};
      validationResult.error.issues.forEach((err) => {
        const path = err.path.join(".");
        if (!fieldErrors[path]) {
          fieldErrors[path] = [];
        }
        fieldErrors[path].push(err.message);
      });

      return NextResponse.json(
        {
          success: false,
          error: "Please correct the errors in the form.",
          fieldErrors,
          deliveryStatus: "fallback_required",
        },
        { status: 422 }
      );
    }

    const { name, email, subject, message, botField } = validationResult.data;

    // 3. Honeypot Bot Mitigation
    if (botField && botField.length > 0) {
      // Silently drop bot submissions with generic rejection
      return NextResponse.json(
        {
          success: false,
          error: "Submission rejected.",
        },
        { status: 400 }
      );
    }

    // Record submission timestamp for rate limiting
    ipRateLimitMap.set(ip, now);

    // Clean up stale IP records if map exceeds 1000 entries
    if (ipRateLimitMap.size > 1000) {
      for (const [key, timestamp] of ipRateLimitMap.entries()) {
        if (now - timestamp > RATE_LIMIT_WINDOW_MS * 2) {
          ipRateLimitMap.delete(key);
        }
      }
    }

    // 4. Delivery Gateway Execution
    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_TO_EMAIL || "codeswithrakib@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    if (apiKey) {
      // Live third-party provider delivery via Resend
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: recipientEmail,
          reply_to: email,
          subject: `[Portfolio Contact] ${subject} - from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        }),
      });

      if (!resendResponse.ok) {
        console.error(
          `[Contact API] Resend dispatch failed with HTTP ${resendResponse.status}`
        );
        return NextResponse.json(
          {
            success: false,
            error:
              "Email delivery service temporarily unavailable. Please reach out directly to codeswithrakib@gmail.com.",
            deliveryStatus: "fallback_required",
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Thank you! Your message has been sent successfully. I will respond to your email promptly.",
        deliveryStatus: "delivered",
      });
    }

    // 5. Staging / Development Test Mode
    const isSimulation =
      process.env.CONTACT_SIMULATION === "true" ||
      process.env.NODE_ENV === "development";

    if (isSimulation) {
      console.log(`[Contact API Test Mode] Message received from ${name} <${email}>`);
      return NextResponse.json({
        success: true,
        message:
          "Test Mode: Your message was successfully validated by the server endpoint. Note: Configure RESEND_API_KEY in .env.local to dispatch live emails.",
        deliveryStatus: "simulated",
      });
    }

    // Production without credentials: transparently inform visitor to use direct email
    return NextResponse.json(
      {
        success: false,
        error:
          "Live contact form delivery is currently undergoing maintenance. Please reach out directly via email to codeswithrakib@gmail.com.",
        deliveryStatus: "fallback_required",
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("[Contact API] Unexpected error:", error instanceof Error ? error.message : "Unknown");
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request. Please try emailing codeswithrakib@gmail.com directly.",
        deliveryStatus: "fallback_required",
      },
      { status: 500 }
    );
  }
}
