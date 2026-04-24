import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const recipientEmail = process.env.CONTACT_EMAIL;

    console.log("Test endpoint - Environment check:", {
      hasGmailUser: !!gmailUser,
      gmailUser: gmailUser,
      hasGmailPass: !!gmailPass,
      hasRecipient: !!recipientEmail,
      recipientEmail: recipientEmail,
    });

    if (!gmailUser || !gmailPass || !recipientEmail) {
      return NextResponse.json({
        error: "Missing environment variables",
        hasGmailUser: !!gmailUser,
        hasGmailPass: !!gmailPass,
        hasRecipient: !!recipientEmail,
        note: "Make sure .env.local has GMAIL_USER, GMAIL_APP_PASSWORD, and CONTACT_EMAIL",
      }, { status: 500 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    console.log("Attempting to send test email...");

    // Send test email
    const info = await transporter.sendMail({
      from: `"Portfolio Test" <${gmailUser}>`,
      to: recipientEmail,
      subject: "Test Email from Portfolio",
      html: "<p>This is a test email. If you received this, your contact form is working!</p>",
      text: "This is a test email. If you received this, your contact form is working!",
    });

    console.log("Test email sent:", info.messageId);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      from: gmailUser,
      to: recipientEmail,
      message: "Test email sent successfully! Check your inbox.",
    });

  } catch (error: any) {
    console.error("Test endpoint error:", error);
    
    let errorMessage = error.message;
    let suggestion = "";
    
    if (error.code === "EAUTH") {
      suggestion = "Gmail authentication failed. Make sure you're using an App Password, not your regular Gmail password. Visit: https://myaccount.google.com/apppasswords";
    } else if (error.code === "ESOCKET" || error.code === "ETIMEDOUT") {
      suggestion = "Network error. Check your internet connection.";
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      code: error.code,
      suggestion: suggestion,
      stack: error.stack,
    }, { status: 500 });
  }
}
