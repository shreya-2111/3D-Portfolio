"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200, "Subject is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
  honeypot: z.string().max(0, "Bot detected").optional(), // Anti-spam honeypot
});

type ContactFormData = z.infer<typeof contactSchema>;

export type ContactActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function sendContactEmail(formData: FormData): Promise<ContactActionResult> {
  try {
    // Extract and validate form data
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      honeypot: formData.get("website"), // Honeypot field
    };

    const validationResult = contactSchema.safeParse(rawData);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Please check your form inputs",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const data = validationResult.data;

    // Check environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const recipientEmail = process.env.CONTACT_EMAIL;

    console.log("Environment check:", {
      hasGmailUser: !!gmailUser,
      hasGmailPass: !!gmailPass,
      hasRecipient: !!recipientEmail,
    });

    if (!gmailUser || !gmailPass || !recipientEmail) {
      console.error("Missing environment variables: GMAIL_USER, GMAIL_APP_PASSWORD, or CONTACT_EMAIL");
      return {
        success: false,
        message: "Email service is not configured. Please contact the administrator.",
      };
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    console.log("Attempting to send email to:", recipientEmail);

    // Send email
    const info = await transporter.sendMail({
      from: `"${data.name}" <${gmailUser}>`,
      to: recipientEmail,
      replyTo: data.email,
      subject: `Portfolio Contact: ${data.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: 600; color: #4b5563; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
              .value { margin-top: 5px; padding: 12px; background: white; border-radius: 6px; border: 1px solid #e5e7eb; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">From your portfolio website</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${escapeHtml(data.name)}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color: #667eea; text-decoration: none;">${escapeHtml(data.email)}</a></div>
                </div>
                <div class="field">
                  <div class="label">Subject</div>
                  <div class="value">${escapeHtml(data.subject)}</div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value" style="white-space: pre-wrap;">${escapeHtml(data.message)}</div>
                </div>
                <div class="footer">
                  <p>This email was sent from your portfolio contact form.</p>
                  <p>Reply directly to this email to respond to ${escapeHtml(data.name)}.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
Reply to: ${data.email}
      `.trim(),
    });

    console.log("Email sent successfully:", info.messageId);

    return {
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    };
  } catch (error: any) {
    console.error("Contact form error:", error);
    
    // Provide specific error messages
    if (error.code === "EAUTH") {
      return {
        success: false,
        message: "Email authentication failed. Please check your Gmail credentials.",
      };
    }
    
    if (error.code === "ESOCKET" || error.code === "ETIMEDOUT") {
      return {
        success: false,
        message: "Network error. Please check your internet connection.",
      };
    }
    
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
