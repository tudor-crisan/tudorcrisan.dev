import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Types matching the Resend webhook payload structure
// https://resend.com/docs/api-reference/webhooks/introduction
// ---------------------------------------------------------------------------
interface ResendEmailData {
  id?: string;
  from?: string;
  to?: string[];
  subject?: string;
  html?: string;
  text?: string;
  reply_to?: string[];
  created_at?: string;
}

interface ResendWebhookPayload {
  type: string;
  data?: ResendEmailData;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Svix signature verification
// Resend signs webhooks using the Svix scheme:
//   signed_content = "{svix-id}.{svix-timestamp}.{raw-body}"
//   signature      = Base64( HMAC-SHA256( Base64Decode(secret), signed_content ) )
// ---------------------------------------------------------------------------
async function verifySignature(
  secret: string,
  svixId: string,
  svixTimestamp: string,
  svixSignature: string,
  rawBody: string
): Promise<boolean> {
  const encoder = new TextEncoder();

  // The secret is Base64-encoded after the "whsec_" prefix
  const secretBytes = Uint8Array.from(
    atob(secret.replace(/^whsec_/, "")),
    (c) => c.charCodeAt(0)
  );

  const key = await crypto.subtle.importKey(
    "raw",
    secretBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signedContent = `${svixId}.${svixTimestamp}.${rawBody}`;
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(signedContent)
  );

  const computedSig = btoa(
    String.fromCharCode(...new Uint8Array(signatureBuffer))
  );

  // svix-signature can be a space-separated list of "v1,<base64>" entries
  return svixSignature
    .split(" ")
    .some((sig) => sig.split(",")[1] === computedSig);
}

// ---------------------------------------------------------------------------
// POST /webhook/resend
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const signingSecret = process.env.RESEND_WEBHOOK;

  if (!signingSecret) {
    return NextResponse.json(
      { error: "RESEND_WEBHOOK secret not configured" },
      { status: 500 }
    );
  }

  const svixId = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json(
      { error: "Missing Svix signature headers" },
      { status: 400 }
    );
  }

  const rawBody = await req.text();

  const valid = await verifySignature(
    signingSecret,
    svixId,
    svixTimestamp,
    svixSignature,
    rawBody
  );

  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: ResendWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as ResendWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Only forward events for incoming emails to avoid loops
  if (payload.type !== "email.received") {
    return NextResponse.json({ received: true, forwarded: false });
  }

  const data = payload.data ?? {};

  // Determine reply_to: prefer the original reply_to array, fall back to from
  const replyTo: string[] =
    data.reply_to && data.reply_to.length > 0
      ? data.reply_to
      : data.from
      ? [data.from]
      : [];

  const subject = data.subject
    ? `Fwd: ${data.subject}`
    : `[Resend] ${payload.type}`;

  // Build a readable plain-text fallback
  const textBody = [
    `Event: ${payload.type}`,
    `Email ID: ${data.id ?? "—"}`,
    `From: ${data.from ?? "—"}`,
    `To: ${(data.to ?? []).join(", ")}`,
    `Subject: ${data.subject ?? "—"}`,
    `Sent at: ${data.created_at ?? "—"}`,
    "",
    "— Original message body —",
    data.text ?? "(no plain-text body)",
  ].join("\n");

  // Build HTML body: wrap original HTML or fall back to <pre>
  const htmlBody = data.html
    ? `
<div style="font-family:sans-serif;font-size:14px;color:#333;border-bottom:1px solid #e5e5e5;padding-bottom:16px;margin-bottom:16px;">
  <p style="margin:0"><strong>Event:</strong> ${payload.type}</p>
  <p style="margin:0"><strong>Email ID:</strong> ${data.id ?? "—"}</p>
  <p style="margin:0"><strong>From:</strong> ${data.from ?? "—"}</p>
  <p style="margin:0"><strong>To:</strong> ${(data.to ?? []).join(", ")}</p>
  <p style="margin:0"><strong>Subject:</strong> ${data.subject ?? "—"}</p>
  <p style="margin:0"><strong>Sent at:</strong> ${data.created_at ?? "—"}</p>
</div>
<div>${data.html}</div>`
    : `<pre style="font-family:monospace;white-space:pre-wrap">${textBody}</pre>`;

  await resend.emails.send({
    from: "noreply@tudorcrisan.dev",
    to: "tudor.crisan.webdev@gmail.com",
    ...(replyTo.length > 0 ? { reply_to: replyTo } : {}),
    subject,
    html: htmlBody,
    text: textBody,
  });

  return NextResponse.json({ received: true, forwarded: true });
}
