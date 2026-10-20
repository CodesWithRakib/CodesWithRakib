import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

const contactFormSchema = z.object({
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
  botField: z.string().max(0, { message: "Bot activity detected." }).optional(),
});

test("Contact Validation - Valid Payload passes validation", () => {
  const validData = {
    name: "Sarah Jenkins",
    email: "sarah@techcorp.com",
    subject: "Frontend Engineering Opportunity",
    message: "Hi Rakib, we loved your work on OgroniEdu and want to discuss an open role.",
  };

  const result = contactFormSchema.safeParse(validData);
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.email, "sarah@techcorp.com");
    assert.equal(result.data.name, "Sarah Jenkins");
  }
});

test("Contact Validation - Rejects empty submission", () => {
  const result = contactFormSchema.safeParse({});
  assert.equal(result.success, false);
  if (!result.success) {
    const fields = result.error.issues.map((i) => i.path[0]);
    assert.ok(fields.includes("name"));
    assert.ok(fields.includes("email"));
    assert.ok(fields.includes("subject"));
    assert.ok(fields.includes("message"));
  }
});

test("Contact Validation - Rejects invalid email formats", () => {
  const invalidEmails = ["not-an-email", "user@", "@domain.com", "user@domain..com"];
  for (const email of invalidEmails) {
    const result = contactFormSchema.safeParse({
      name: "John Doe",
      email,
      subject: "Valid Subject Here",
      message: "Valid message content with enough length.",
    });
    assert.equal(result.success, false, `Expected ${email} to be rejected`);
  }
});

test("Contact Validation - Rejects short name (< 2 characters)", () => {
  const result = contactFormSchema.safeParse({
    name: "J",
    email: "john@example.com",
    subject: "Valid Subject",
    message: "Valid message content with enough length.",
  });
  assert.equal(result.success, false);
  if (!result.success) {
    assert.equal(result.error.issues[0].message, "Name must be at least 2 characters.");
  }
});

test("Contact Validation - Rejects short message (< 10 characters)", () => {
  const result = contactFormSchema.safeParse({
    name: "John Doe",
    email: "john@example.com",
    subject: "Valid Subject",
    message: "Too short",
  });
  assert.equal(result.success, false);
  if (!result.success) {
    assert.equal(result.error.issues[0].message, "Message must be at least 10 characters.");
  }
});

test("Contact Validation - Rejects oversized message (> 2000 characters)", () => {
  const longMessage = "a".repeat(2001);
  const result = contactFormSchema.safeParse({
    name: "John Doe",
    email: "john@example.com",
    subject: "Valid Subject",
    message: longMessage,
  });
  assert.equal(result.success, false);
  if (!result.success) {
    assert.equal(result.error.issues[0].message, "Message cannot exceed 2000 characters.");
  }
});

test("Contact Validation - Bot honeypot triggers rejection when filled", () => {
  const botData = {
    name: "Bot User",
    email: "bot@spammer.com",
    subject: "SEO Services",
    message: "Buy cheap backlinks now from our spam engine.",
    botField: "I am a bot filling every input field",
  };

  const result = contactFormSchema.safeParse(botData);
  assert.equal(result.success, false);
  if (!result.success) {
    assert.equal(result.error.issues[0].path[0], "botField");
  }
});
