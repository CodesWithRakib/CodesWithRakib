import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name cannot exceed 100 characters." })
    .trim(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .max(100, { message: "Email cannot exceed 100 characters." })
    .trim()
    .toLowerCase(),
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters." })
    .max(150, { message: "Subject cannot exceed 150 characters." })
    .trim(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(2000, { message: "Message cannot exceed 2000 characters." })
    .trim(),
  // Honeypot field for bot mitigation. Must remain empty.
  botField: z.string().max(0, { message: "Bot activity detected." }).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  deliveryStatus?: "delivered" | "simulated" | "fallback_required";
}
