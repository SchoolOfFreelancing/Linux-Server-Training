/**
 * School of Freelancing — verify-link signer (Cloudflare Worker)
 * ---------------------------------------------------------------
 * Holds VERIFY_SECRET server-side. Never sent to the browser.
 *   wrangler secret put VERIFY_SECRET
 *
 * Endpoints:
 *   POST /sign       body: { record }                -> { url, d, s }
 *   GET  /verify      ?d=...&s=...                    -> { valid, record? }
 *   POST /mark-paid   body: { d, s, invoiceNumber }    -> { url, d, s }
 *        Re-signs the record with status:"paid", paidAt, invoiceNumber.
 *        Only succeeds if the original (d,s) verifies first.
 */

const ALLOWED_ORIGIN = "https://www.schooloffreelancing.com";
const VERIFY_BASE_URL = "https://www.schooloffreelancing.com/verify/";

function cors(resp) {
  resp.headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  resp.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  resp.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return resp;
}
function json(data, status = 200) {
  return cors(new Response(JSON.stringify(data), {
    status, headers: { "Content-Type": "application/json" }
  }));
}
function b64urlEncode(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  bytes.forEach(b => bin += String.fromCharCode(b));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(b64url) {
  let b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}
function toHex(buffer) {
  return [...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2, "0")).join("");
}
async function hmacSignHex(message, secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return toHex(sig);
}
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
async function signRecord(record, secret) {
  const d = b64urlEncode(JSON.stringify(record));
  const s = await hmacSignHex(d, secret);
  return { d, s, url: `${VERIFY_BASE_URL}?d=${d}&s=${s}` };
}
async function verifyPair(d, s, secret) {
  const expected = await hmacSignHex(d, secret);
  if (!timingSafeEqual(expected, s)) return { valid: false, reason: "bad_signature" };
  try {
    return { valid: true, record: JSON.parse(b64urlDecode(d)) };
  } catch {
    return { valid: false, reason: "bad_payload" };
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }));

    if (url.pathname === "/sign" && request.method === "POST") {
      let body;
      try { body = await request.json(); } catch { return json({ error: "invalid_json" }, 400); }
      if (!body || typeof body.record !== "object") return json({ error: "missing_record" }, 400);
      const out = await signRecord(body.record, env.VERIFY_SECRET);
      return json(out);
    }

    if (url.pathname === "/verify" && request.method === "GET") {
      const d = url.searchParams.get("d");
      const s = url.searchParams.get("s");
      if (!d || !s) return json({ valid: false, reason: "missing_params" });
      return json(await verifyPair(d, s, env.VERIFY_SECRET));
    }

    if (url.pathname === "/mark-paid" && request.method === "POST") {
      let body;
      try { body = await request.json(); } catch { return json({ error: "invalid_json" }, 400); }
      const { d, s, invoiceNumber } = body || {};
      if (!d || !s) return json({ error: "missing_params" }, 400);
      const check = await verifyPair(d, s, env.VERIFY_SECRET);
      if (!check.valid) return json({ error: "invalid_signature" }, 403);

      const updated = Object.assign({}, check.record, {
        status: "paid",
        paidAt: new Date().toISOString(),
        invoiceNumber: invoiceNumber || null
      });
      const out = await signRecord(updated, env.VERIFY_SECRET);
      return json(out);
    }

    return json({ error: "not_found" }, 404);
  }
};
