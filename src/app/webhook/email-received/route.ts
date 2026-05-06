import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Types matching the Resend webhook payload structure
// https://resend.com/docs/api-reference/webhooks/introduction
// ---------------------------------------------------------------------------
interface ResendEmailHeader {
  name: string;
  value: string;
}

interface ResendEmailData {
  id?: string;
  from?: string;
  to?: string[];
  subject?: string;
  html?: string;
  text?: string;
  reply_to?: string[];
  created_at?: string;
  headers?: ResendEmailHeader[];
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
// POST /webhook/email-received
// ---------------------------------------------------------------------------
import { processWebhook } from "./logic";

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

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const data = payload.data ?? {};
  const emailId = data.id;
  let emailToProcess = data;

  // Resend 'email.received' webhooks only contain metadata. 
  // We must fetch the full email to get the body, headers, and attachments.
  if (payload.type === "email.received" && emailId) {
    try {
      // Small delay to ensure Resend has processed the inbound content fully
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { data: fullEmail, error: fetchError } = await resend.emails.get(emailId);
      if (!fetchError && fullEmail) {
        emailToProcess = fullEmail;
        console.log("Successfully fetched full email body for ID:", emailId);
      } else {
        console.error("Resend API error fetching email:", fetchError);
      }
    } catch (err) {
      console.error("Exception fetching full email:", err);
    }
  }

  const result = processWebhook(
    payload.type,
    emailToProcess,
    "tudor.crisan.webdev@gmail.com",
    "noreply@tudorcrisan.dev"
  );

  if (!result.forwarded) {
    return NextResponse.json({ received: true, forwarded: false, reason: result.reason });
  }

  // Use replyTo (camelCase) as required by the Resend Node.js SDK
  await resend.emails.send({
    from: "noreply@tudorcrisan.dev",
    to: "tudor.crisan.webdev@gmail.com",
    ...(result.replyTo ? { replyTo: result.replyTo } : {}),
    subject: result.subject!,
    html: result.htmlBody!,
    text: result.textBody!,
    headers: {
      "X-Resend-Forwarded": "true",
      "Reply-To": Array.isArray(result.replyTo) ? result.replyTo.join(", ") : (result.replyTo as string),
    },
  });

  return NextResponse.json({ received: true, forwarded: true });
}
