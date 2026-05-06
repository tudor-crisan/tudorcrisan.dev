
export interface ResendEmailHeader {
  name: string;
  value: string;
}

export interface ResendEmailData {
  id?: string;
  email_id?: string;
  from?: string;
  to?: string[];
  subject?: string;
  html?: string;
  text?: string;
  reply_to?: string[];
  created_at?: string;
  headers?: ResendEmailHeader[];
}

export interface WebhookResult {
  forwarded: boolean;
  reason?: string;
  replyTo?: string | string[];
  subject?: string;
  textBody?: string;
  htmlBody?: string;
}

export function processWebhook(
  payloadType: string,
  data: ResendEmailData,
  targetEmail: string,
  noReplyEmail: string
): WebhookResult {
  if (payloadType !== "email.received") {
    return { forwarded: false, reason: "Not an email.received event" };
  }

  const fromAddress = data.from || "";

  // 1. Loop prevention: skip if email is from ourselves or our target address
  if (
    fromAddress.toLowerCase().includes(targetEmail.toLowerCase()) ||
    fromAddress.toLowerCase().includes(noReplyEmail.toLowerCase())
  ) {
    return { forwarded: false, reason: "Loop prevention: self-sent" };
  }

  // 2. Loop prevention: check for our custom forwarding header
  const isForwarded = data.headers?.some(
    (h) => h.name.toLowerCase() === "x-resend-forwarded" && h.value === "true"
  );
  if (isForwarded) {
    return { forwarded: false, reason: "Loop prevention: already forwarded" };
  }

  // Determine reply_to: prefer the original reply_to, fall back to from
  const replyToValue =
    data.reply_to && data.reply_to.length > 0
      ? data.reply_to.length === 1
        ? data.reply_to[0]
        : data.reply_to
      : fromAddress || undefined;

  console.log(`Processing email from: ${fromAddress}, setting Reply-To:`, replyToValue);

  const subject = data.subject
    ? `Fwd: ${data.subject}`
    : `[Resend] ${payloadType}`;

  // Extract body more robustly
  const bodyText = data.text || "";
  const bodyHtml = data.html || "";

  const textBody = [
    `Event: ${payloadType}`,
    `Email ID: ${data.id || data.email_id || "—"}`,
    `From: ${fromAddress}`,
    `To: ${(data.to ?? []).join(", ")}`,
    `Subject: ${data.subject ?? "—"}`,
    `Sent at: ${data.created_at ?? "—"}`,
    "",
    "— Original message body —",
    bodyText || bodyHtml || "(no message body content found)",
  ].join("\n");

  const htmlBody = bodyHtml
    ? `
<div style="font-family:sans-serif;font-size:14px;color:#333;border-bottom:1px solid #e5e5e5;padding-bottom:16px;margin-bottom:16px;">
  <p style="margin:0"><strong>Event:</strong> ${payloadType}</p>
  <p style="margin:0"><strong>Email ID:</strong> ${data.id ?? "—"}</p>
  <p style="margin:0"><strong>From:</strong> ${fromAddress}</p>
  <p style="margin:0"><strong>To:</strong> ${(data.to ?? []).join(", ")}</p>
  <p style="margin:0"><strong>Subject:</strong> ${data.subject ?? "—"}</p>
  <p style="margin:0"><strong>Sent at:</strong> ${data.created_at ?? "—"}</p>
</div>
<div>${bodyHtml}</div>`
    : `<pre style="font-family:monospace;white-space:pre-wrap">${textBody}</pre>`;

  return {
    forwarded: true,
    replyTo: replyToValue,
    subject,
    textBody,
    htmlBody,
  };
}
