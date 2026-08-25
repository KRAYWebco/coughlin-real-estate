// Supabase Edge Function: send-lead-notification
// Triggered by a database webhook on contact_submissions INSERT
// Sends an email notification to Christine via Resend

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RECIPIENT_EMAIL = "nwi.broker.chris@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev"; // Replace with your verified domain

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

serve(async (req) => {
  try {
    // Parse the webhook payload from Supabase
    const payload = await req.json();
    const record = payload.record;

    if (!record) {
      return new Response(JSON.stringify({ error: "No record in payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { name, email, phone, service, message, created_at } = record;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Email service is not configured" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Build the email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', system-ui, sans-serif; background: #faf9f7; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 4px; overflow: hidden; border: 1px solid #e6e1d6; }
          .header { background: #2a2a2a; padding: 24px 32px; }
          .header h1 { color: #d78032; font-size: 20px; margin: 0; font-family: Georgia, serif; }
          .header p { color: #b1a185; font-size: 13px; margin: 4px 0 0; }
          .body { padding: 32px; }
          .field { margin-bottom: 16px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888; font-weight: 600; margin-bottom: 4px; }
          .value { font-size: 15px; color: #2a2a2a; }
          .message-box { background: #f3f1ec; border-left: 3px solid #d78032; padding: 16px; margin-top: 16px; border-radius: 0 4px 4px 0; }
          .message-box .value { line-height: 1.6; }
          .footer { padding: 16px 32px; background: #faf9f7; border-top: 1px solid #e6e1d6; font-size: 12px; color: #888; text-align: center; }
          a { color: #d78032; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Lead Submission</h1>
            <p>christinecoughlin.realtor — Contact Form</p>
          </div>
          <div class="body">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${safeName}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone</div>
              <div class="value"><a href="tel:${safePhone}">${safePhone}</a></div>
            </div>
            <div class="field">
              <div class="label">Service Requested</div>
              <div class="value">${safeService}</div>
            </div>
            <div class="message-box">
              <div class="label">Message</div>
              <div class="value">${safeMessage}</div>
            </div>
          </div>
          <div class="footer">
            Submitted on ${new Date(created_at).toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email via Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [RECIPIENT_EMAIL],
        subject: `🏠 New Lead: ${safeName} — ${safeService}`,
        html: emailHtml,
        reply_to: email,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend error:", resendData);
      return new Response(JSON.stringify({ error: resendData }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, id: resendData.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Function error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
