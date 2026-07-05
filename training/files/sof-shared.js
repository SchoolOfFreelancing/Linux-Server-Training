/* =====================================================================
   School of Freelancing — Enrollment System — shared helpers
   =====================================================================
   SECURITY NOTE
   ---------------------------------------------------------------------
   This site is otherwise 100% static. The one exception is signing —
   a real secret CANNOT be hidden in browser JS (anyone can open
   DevTools and read it). buildVerifyLink()/verifyFromQuery() below
   call a tiny serverless function (Cloudflare Worker, see
   /worker/worker.js) that holds VERIFY_SECRET server-side and is
   never sent to the browser. That is the only way to make the
   verify link actually tamper-proof.
   ===================================================================== */

(function (global) {
  "use strict";

  /* ---- 1. Serverless signer endpoint --------------------------------
     Deploy /worker/worker.js (see wrangler.toml) then put its URL here.
  ------------------------------------------------------------------ */
  var SIGNER_URL = "https://sof-verify-signer.YOUR-SUBDOMAIN.workers.dev";
  // After attaching a custom route:
  // var SIGNER_URL = "https://api.schooloffreelancing.com";

  /* ---- 2. EmailJS configuration ------------------------------------
     Fill these in from your EmailJS dashboard (emailjs.com).
  ------------------------------------------------------------------ */
  var CONFIG = {
    EMAILJS_PUBLIC_KEY: "YOUR_EMAILJS_PUBLIC_KEY",
    EMAILJS_SERVICE_ID: "YOUR_EMAILJS_SERVICE_ID",
    TEMPLATE_OFFICE_NOTIFY: "YOUR_TEMPLATE_ID_OFFICE_NOTIFY",
    TEMPLATE_STUDENT_RECEIVED: "YOUR_TEMPLATE_ID_STUDENT_RECEIVED",
    TEMPLATE_STUDENT_INVOICE: "YOUR_TEMPLATE_ID_STUDENT_INVOICE",
    OFFICE_EMAIL: "office@schooloffreelancing.com",
    VERIFY_BASE_URL: "https://www.schooloffreelancing.com/verify/",
    TELEGRAM_URL: "https://t.me/SchoolOfFreelancingTraining"
  };

  /* ---- 3. Build & verify a signed verify-link -----------------------
     Both operations call the serverless signer. No secret material
     ever ships to the browser.
  ------------------------------------------------------------------ */
  async function buildVerifyLink(record) {
    var res = await fetch(SIGNER_URL + "/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ record: record })
    });
    if (!res.ok) throw new Error("sign_request_failed");
    var data = await res.json();
    return data.url;
  }

  async function verifyFromQuery(search) {
    var params = new URLSearchParams(search);
    var d = params.get("d");
    var s = params.get("s");
    if (!d || !s) return { valid: false, reason: "missing_params" };
    var res = await fetch(SIGNER_URL + "/verify?d=" + encodeURIComponent(d) + "&s=" + encodeURIComponent(s));
    if (!res.ok) return { valid: false, reason: "verify_request_failed" };
    return res.json();
  }

  async function markPaid(d, s, invoiceNumber) {
    var res = await fetch(SIGNER_URL + "/mark-paid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ d: d, s: s, invoiceNumber: invoiceNumber })
    });
    if (!res.ok) throw new Error("mark_paid_failed");
    return res.json();
  }

  /* ---- 4. ID generators ---------------------------------------------- */
  function randomBase36(len) {
    var s = "";
    var arr = new Uint8Array(len);
    crypto.getRandomValues(arr);
    for (var i = 0; i < len; i++) s += (arr[i] % 36).toString(36);
    return s.toUpperCase();
  }
  function generateEnrollmentId() {
    var d = new Date();
    var stamp = d.getFullYear().toString() +
      String(d.getMonth() + 1).padStart(2, "0") +
      String(d.getDate()).padStart(2, "0");
    return "SOF-" + stamp + "-" + randomBase36(5);
  }
  function generateInvoiceNumber() {
    var d = new Date();
    var stamp = d.getFullYear().toString() +
      String(d.getMonth() + 1).padStart(2, "0");
    return "INV-" + stamp + "-" + randomBase36(6);
  }

  /* ---- 5. localStorage "database" ------------------------------------
     Per-browser activity log only. The verify link itself carries the
     full record so the admin's browser doesn't need to share a DB
     with the student's browser.
  ------------------------------------------------------------------ */
  var STORAGE_KEY = "sof_enrollments_v1";
  function getAllEnrollments() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) { return []; }
  }
  function saveEnrollment(record) {
    var all = getAllEnrollments();
    all.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
  function upsertEnrollment(id, patch) {
    var all = getAllEnrollments();
    var found = false;
    for (var i = 0; i < all.length; i++) {
      if (all[i].id === id) {
        all[i] = Object.assign({}, all[i], patch);
        found = true;
      }
    }
    if (!found) all.push(Object.assign({ id: id }, patch));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
  function hasSubmittedRecently(email, windowMs) {
    var all = getAllEnrollments();
    var cutoff = Date.now() - (windowMs || 60000);
    return all.some(function (r) {
      return r.email === email && new Date(r.createdAt).getTime() > cutoff;
    });
  }

  /* ---- 6. Basic input sanitization ---------------------------------- */
  function sanitizeText(str) {
    if (str == null) return "";
    return String(str)
      .replace(/[<>]/g, "")
      .replace(/javascript:/gi, "")
      .trim()
      .slice(0, 500);
  }
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ---- 7. Dial codes (common set — extend as needed) ----------------- */
  var DIAL_CODES = [
    ["+1","US/CA"],["+7","RU/KZ"],["+20","EG"],["+27","ZA"],["+30","GR"],
    ["+31","NL"],["+32","BE"],["+33","FR"],["+34","ES"],["+36","HU"],
    ["+39","IT"],["+40","RO"],["+41","CH"],["+43","AT"],["+44","GB"],
    ["+45","DK"],["+46","SE"],["+47","NO"],["+48","PL"],["+49","DE"],
    ["+51","PE"],["+52","MX"],["+53","CU"],["+54","AR"],["+55","BR"],
    ["+56","CL"],["+57","CO"],["+58","VE"],["+60","MY"],["+61","AU"],
    ["+62","ID"],["+63","PH"],["+64","NZ"],["+65","SG"],["+66","TH"],
    ["+81","JP"],["+82","KR"],["+84","VN"],["+86","CN"],["+90","TR"],
    ["+91","IN"],["+92","PK"],["+93","AF"],["+94","LK"],["+95","MM"],
    ["+98","IR"],["+211","SS"],["+212","MA"],["+213","DZ"],["+216","TN"],
    ["+218","LY"],["+220","GM"],["+221","SN"],["+222","MR"],["+223","ML"],
    ["+224","GN"],["+225","CI"],["+226","BF"],["+227","NE"],["+228","TG"],
    ["+229","BJ"],["+230","MU"],["+231","LR"],["+232","SL"],["+233","GH"],
    ["+234","NG"],["+235","TD"],["+236","CF"],["+237","CM"],["+238","CV"],
    ["+239","ST"],["+240","GQ"],["+241","GA"],["+242","CG"],["+243","CD"],
    ["+244","AO"],["+248","SC"],["+249","SD"],["+250","RW"],["+251","ET"],
    ["+252","SO"],["+253","DJ"],["+254","KE"],["+255","TZ"],["+256","UG"],
    ["+257","BI"],["+258","MZ"],["+260","ZM"],["+261","MG"],["+263","ZW"],
    ["+264","NA"],["+265","MW"],["+266","LS"],["+267","BW"],["+268","SZ"],
    ["+269","KM"],["+351","PT"],["+352","LU"],["+353","IE"],
    ["+354","IS"],["+355","AL"],["+356","MT"],["+357","CY"],["+358","FI"],
    ["+359","BG"],["+370","LT"],["+371","LV"],["+372","EE"],["+373","MD"],
    ["+374","AM"],["+375","BY"],["+376","AD"],["+377","MC"],["+378","SM"],
    ["+380","UA"],["+381","RS"],["+382","ME"],["+383","XK"],["+385","HR"],
    ["+386","SI"],["+387","BA"],["+389","MK"],["+420","CZ"],["+421","SK"],
    ["+423","LI"],["+880","BD"],["+886","TW"],["+960","MV"],["+961","LB"],
    ["+962","JO"],["+963","SY"],["+964","IQ"],["+965","KW"],["+966","SA"],
    ["+967","YE"],["+968","OM"],["+970","PS"],["+971","AE"],["+972","IL"],
    ["+973","BH"],["+974","QA"],["+975","BT"],["+976","MN"],["+977","NP"],
    ["+992","TJ"],["+993","TM"],["+994","AZ"],["+995","GE"],["+996","KG"],
    ["+998","UZ"]
  ];

  /* ---- 8. Export ----------------------------------------------------- */
  global.SOF = {
    CONFIG: CONFIG,
    buildVerifyLink: buildVerifyLink,
    verifyFromQuery: verifyFromQuery,
    markPaid: markPaid,
    generateEnrollmentId: generateEnrollmentId,
    generateInvoiceNumber: generateInvoiceNumber,
    getAllEnrollments: getAllEnrollments,
    saveEnrollment: saveEnrollment,
    upsertEnrollment: upsertEnrollment,
    hasSubmittedRecently: hasSubmittedRecently,
    sanitizeText: sanitizeText,
    isValidEmail: isValidEmail,
    DIAL_CODES: DIAL_CODES
  };

})(window);
