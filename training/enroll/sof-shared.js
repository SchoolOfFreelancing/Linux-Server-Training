/* School of Freelancing — shared enrollment utilities
   Used by: /training/enroll/ (enrollment.html) and /verify/ (admin invoice page)

   SECURITY NOTE (read before launch):
   This is a static, no-backend site. VERIFY_SECRET below is shipped to every
   visitor's browser and IS readable via view-source / devtools by anyone who
   looks. The HMAC signing here only stops a non-technical person from hand-editing
   the verify link (e.g. changing the amount) — it cannot stop someone who reads
   this file and extracts the secret. There is no static-site way around that.
   If real tamper-proofing is required, verification must move server-side.
*/
(function (global) {
  'use strict';

  var SOF = {};

  // ---- CONFIG — replace placeholders before going live ----
  SOF.CONFIG = {
    OFFICE_EMAIL: 'office@schooloffreelancing.com',
    TELEGRAM_URL: 'https://t.me/SchoolOfFreelancingTraining',
    VERIFY_BASE_URL: 'https://www.schooloffreelancing.com/verify/',

    // EmailJS — https://dashboard.emailjs.com
    EMAILJS_PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY',
    EMAILJS_SERVICE_ID: 'YOUR_EMAILJS_SERVICE_ID',
    TEMPLATE_OFFICE_NOTIFY: 'YOUR_TEMPLATE_OFFICE_NOTIFY_ID',
    TEMPLATE_STUDENT_RECEIVED: 'YOUR_TEMPLATE_STUDENT_RECEIVED_ID',
    TEMPLATE_INVOICE_SENT: 'YOUR_TEMPLATE_INVOICE_SENT_ID', // must have a File/attachment variable named invoice_pdf

    // Casual-tampering deterrent only — see security note above.
    VERIFY_SECRET: 'REPLACE_WITH_A_LONG_RANDOM_STRING_BEFORE_LAUNCH'
  };

  // ---- Sanitization / validation ----
  SOF.sanitizeText = function (str) {
    if (!str) return '';
    return String(str)
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .trim()
      .slice(0, 500);
  };

  SOF.isValidEmail = function (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ''));
  };

  // ---- Enrollment IDs ----
  SOF.generateEnrollmentId = function () {
    var ts = Date.now().toString(36).toUpperCase();
    var rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return 'SOF-' + ts + '-' + rand;
  };

  SOF.generateInvoiceNumber = function () {
    var d = new Date();
    var ymd = d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
    var rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return 'INV-' + ymd + '-' + rand;
  };

  // ---- Local "database" (this browser only — see saveEnrollment note) ----
  var STORE_KEY = 'sof_enrollments';

  SOF.saveEnrollment = function (record) {
    try {
      var all = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
      all.push(record);
      localStorage.setItem(STORE_KEY, JSON.stringify(all));
    } catch (e) { /* localStorage unavailable — enrollment still emailed */ }
  };

  SOF.updateEnrollmentStatus = function (id, patch) {
    try {
      var all = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
      var idx = all.findIndex(function (r) { return r.id === id; });
      if (idx !== -1) {
        all[idx] = Object.assign({}, all[idx], patch);
        localStorage.setItem(STORE_KEY, JSON.stringify(all));
      }
    } catch (e) { /* ignore */ }
  };

  // Duplicate-submit guard: blocks the same email submitting twice within windowMs
  SOF.hasSubmittedRecently = function (email, windowMs) {
    try {
      var key = 'sof_last_submit_' + email.toLowerCase();
      var last = parseInt(localStorage.getItem(key) || '0', 10);
      var now = Date.now();
      if (now - last < windowMs) return true;
      localStorage.setItem(key, String(now));
      return false;
    } catch (e) { return false; }
  };

  // ---- Base64url helpers (payload travels inside the verify link itself) ----
  function toBase64Url(str) {
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function fromBase64Url(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return decodeURIComponent(escape(atob(str)));
  }

  // ---- HMAC-SHA256 signing (Web Crypto) ----
  function hmacSign(payloadStr) {
    var enc = new TextEncoder();
    return crypto.subtle.importKey(
      'raw', enc.encode(SOF.CONFIG.VERIFY_SECRET),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    ).then(function (key) {
      return crypto.subtle.sign('HMAC', key, enc.encode(payloadStr));
    }).then(function (sigBuf) {
      var bytes = new Uint8Array(sigBuf);
      var binary = '';
      bytes.forEach(function (b) { binary += String.fromCharCode(b); });
      return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    });
  }

  // Builds the signed verify link. Enrollment data rides inside the link (d=),
  // so the admin can open it on any device without needing localStorage access.
  SOF.buildVerifyLink = function (record) {
    var payload = {
      id: record.id,
      name: record.fullName,
      email: record.email,
      phone: record.phone,
      country: record.country,
      training: record.trainingName,
      fee: record.trainingFeeUSD,
      method: record.paymentMethod,
      tx: record.txId,
      ts: record.createdAt
    };
    var payloadStr = JSON.stringify(payload);
    var d = toBase64Url(payloadStr);
    return hmacSign(payloadStr).then(function (sig) {
      return SOF.CONFIG.VERIFY_BASE_URL + '?d=' + encodeURIComponent(d) + '&s=' + encodeURIComponent(sig);
    });
  };

  SOF.decodeVerifyPayload = function (dParam) {
    return JSON.parse(fromBase64Url(dParam));
  };

  // Resolves true/false. Always recompute — never trust the s= param alone.
  SOF.verifySignature = function (dParam, sParam) {
    var payloadStr = fromBase64Url(dParam);
    return hmacSign(payloadStr).then(function (expected) {
      return expected === sParam;
    });
  };

  // ---- Phone country codes (dial code, country name) ----
  SOF.DIAL_CODES = [
    ['+1', 'United States/Canada'], ['+7', 'Russia/Kazakhstan'], ['+20', 'Egypt'],
    ['+27', 'South Africa'], ['+30', 'Greece'], ['+31', 'Netherlands'], ['+32', 'Belgium'],
    ['+33', 'France'], ['+34', 'Spain'], ['+36', 'Hungary'], ['+39', 'Italy'], ['+40', 'Romania'],
    ['+41', 'Switzerland'], ['+44', 'United Kingdom'], ['+45', 'Denmark'], ['+46', 'Sweden'],
    ['+47', 'Norway'], ['+48', 'Poland'], ['+49', 'Germany'], ['+51', 'Peru'], ['+52', 'Mexico'],
    ['+53', 'Cuba'], ['+54', 'Argentina'], ['+55', 'Brazil'], ['+56', 'Chile'], ['+57', 'Colombia'],
    ['+58', 'Venezuela'], ['+60', 'Malaysia'], ['+61', 'Australia'], ['+62', 'Indonesia'],
    ['+63', 'Philippines'], ['+64', 'New Zealand'], ['+65', 'Singapore'], ['+66', 'Thailand'],
    ['+81', 'Japan'], ['+82', 'South Korea'], ['+84', 'Vietnam'], ['+86', 'China'],
    ['+90', 'Turkey'], ['+91', 'India'], ['+92', 'Pakistan'], ['+93', 'Afghanistan'],
    ['+94', 'Sri Lanka'], ['+95', 'Myanmar'], ['+880', 'Bangladesh'],
    ['+960', 'Maldives'], ['+961', 'Lebanon'], ['+962', 'Jordan'], ['+963', 'Syria'],
    ['+964', 'Iraq'], ['+965', 'Kuwait'], ['+966', 'Saudi Arabia'], ['+967', 'Yemen'],
    ['+968', 'Oman'], ['+970', 'Palestine'], ['+971', 'United Arab Emirates'], ['+972', 'Israel'],
    ['+973', 'Bahrain'], ['+974', 'Qatar'], ['+975', 'Bhutan'], ['+976', 'Mongolia'],
    ['+977', 'Nepal'], ['+234', 'Nigeria'], ['+254', 'Kenya'],
    ['+233', 'Ghana'], ['+256', 'Uganda'], ['+255', 'Tanzania'],
    ['+212', 'Morocco'], ['+213', 'Algeria'], ['+216', 'Tunisia'], ['+218', 'Libya'],
    ['+98', 'Iran']
  ];

  global.SOF = SOF;
})(window);
