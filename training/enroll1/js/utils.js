// ---- Sanitization (XSS-safe) ----
function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = String(str || '').trim();
  return div.innerHTML;
}

// ---- ID generators ----
function generateEnrollmentId() {
  const year = new Date().getFullYear();
  const rand = (crypto.randomUUID ? crypto.randomUUID() : String(Math.random())).replace(/-/g, '').slice(0, 8).toUpperCase();
  return `SOF-${year}-${rand}`;
}
function generateInvoiceNumber() {
  const year = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `INV-${year}-${rand}`;
}

// ---- Unicode-safe base64 for embedding JSON in the verify URL ----
function b64encode(obj) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
}
function b64decode(str) {
  return JSON.parse(decodeURIComponent(escape(atob(str))));
}

// ---- HMAC-style signing so the verify link can't be trivially edited ----
async function signPayload(payloadStr) {
  const enc = new TextEncoder();
  const data = enc.encode(payloadStr + VERIFY_SECRET);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

// ---- localStorage "database" (best-effort; only visible on the device that
// submitted the form — the verify link itself carries the authoritative
// data since there is no shared server storage) ----
const DB_KEY = 'sof_enrollments';
function dbGetAll() {
  try { return JSON.parse(localStorage.getItem(DB_KEY) || '[]'); } catch (e) { return []; }
}
function dbSave(record) {
  const all = dbGetAll();
  all.push(record);
  localStorage.setItem(DB_KEY, JSON.stringify(all));
}
function dbUpdate(enrollmentId, updates) {
  const all = dbGetAll();
  const idx = all.findIndex((r) => r.enrollmentId === enrollmentId);
  if (idx !== -1) {
    all[idx] = Object.assign({}, all[idx], updates);
    localStorage.setItem(DB_KEY, JSON.stringify(all));
  }
}

// ---- Duplicate-submission guard (per browser) ----
function alreadySubmittedRecently(fingerprint) {
  const key = 'sof_submit_' + fingerprint;
  if (sessionStorage.getItem(key)) return true;
  sessionStorage.setItem(key, '1');
  return false;
}
