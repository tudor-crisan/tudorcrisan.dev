
import { processWebhook } from "./logic";
import assert from "assert";

console.log("Running Webhook Logic Tests...");

const TARGET_EMAIL = "tudor.crisan.webdev@gmail.com";
const NOREPLY_EMAIL = "noreply@tudorcrisan.dev";

// Test 1: Normal forwarding
const test1 = processWebhook(
  "email.received",
  {
    from: "sender@example.com",
    subject: "Hello",
    text: "Body",
  },
  TARGET_EMAIL,
  NOREPLY_EMAIL
);
assert.strictEqual(test1.forwarded, true);
assert.strictEqual(test1.replyTo, "sender@example.com");
assert.ok(test1.textBody?.includes("— Original message body —\nBody"));
console.log("Test 1 Passed: Normal forwarding");

// Test 2: Loop prevention (self-sent)
const test2 = processWebhook(
  "email.received",
  {
    from: TARGET_EMAIL,
    subject: "Loop",
  },
  TARGET_EMAIL,
  NOREPLY_EMAIL
);
assert.strictEqual(test2.forwarded, false);
assert.strictEqual(test2.reason, "Loop prevention: self-sent");
console.log("Test 2 Passed: Loop prevention (self-sent)");

// Test 3: Loop prevention (noreply sent)
const test3 = processWebhook(
  "email.received",
  {
    from: NOREPLY_EMAIL,
    subject: "Loop 2",
  },
  TARGET_EMAIL,
  NOREPLY_EMAIL
);
assert.strictEqual(test3.forwarded, false);
assert.strictEqual(test3.reason, "Loop prevention: self-sent");
console.log("Test 3 Passed: Loop prevention (noreply sent)");

// Test 4: Loop prevention (header)
const test4 = processWebhook(
  "email.received",
  {
    from: "sender@example.com",
    headers: [{ name: "X-Resend-Forwarded", value: "true" }],
  },
  TARGET_EMAIL,
  NOREPLY_EMAIL
);
assert.strictEqual(test4.forwarded, false);
assert.strictEqual(test4.reason, "Loop prevention: already forwarded");
console.log("Test 4 Passed: Loop prevention (header)");

// Test 5: Body extraction (HTML only)
const test5 = processWebhook(
  "email.received",
  {
    from: "sender@example.com",
    html: "<strong>HTML Body</strong>",
  },
  TARGET_EMAIL,
  NOREPLY_EMAIL
);
assert.strictEqual(test5.forwarded, true);
assert.ok(test5.htmlBody?.includes("<strong>HTML Body</strong>"));
assert.ok(test5.textBody?.includes("— Original message body —\n<strong>HTML Body</strong>"));
console.log("Test 5 Passed: Body extraction (HTML only)");

// Test 6: Reply-To array
const test6 = processWebhook(
  "email.received",
  {
    from: "sender@example.com",
    reply_to: ["reply1@example.com", "reply2@example.com"],
  },
  TARGET_EMAIL,
  NOREPLY_EMAIL
);
assert.deepStrictEqual(test6.replyTo, ["reply1@example.com", "reply2@example.com"]);
console.log("Test 6 Passed: Reply-To array");

console.log("All Webhook Logic Tests Passed!");
