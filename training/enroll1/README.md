# School of Freelancing — Static Enrollment System (No Backend)

Pure HTML5 + Bootstrap 5 + vanilla JavaScript. No Node.js, no server, no SQL — works on any static host (GitHub Pages, Netlify, cPanel, S3, etc.).

## Setup (required before it works)
1. Sign up free at **https://www.emailjs.com**.
2. Create an Email Service (Gmail/Outlook/SMTP) → copy the **Service ID**.
3. Create 3 templates and copy each **Template ID**:
   - `template_office_notify` — office notification (vars: `enrollment_id`, `full_name`, `student_email`, `phone`, `country`, `course_name`, `price_usd`, `payment_method`, `payment_currency`, `note`, `created_at`, `verify_url`). Put `{{verify_url}}` as a link/button in this template.
   - `template_student_ack` — student acknowledgment (vars: `full_name`, `enrollment_id`, `course_name`, `price_usd`).
   - `template_student_invoice` — paid invoice (vars: `full_name`, `enrollment_id`, `invoice_number`, `course_name`, `price_usd`, `payment_date`, plus the PDF attached via the `invoice_pdf` file field — enable **Attachments** on this template in the EmailJS dashboard).
4. Copy your **Public Key** (Account → API Keys).
5. Edit `js/config.js`:
   - Fill in `EMAILJS_CONFIG` (publicKey, serviceId, template IDs, office email).
   - Replace `VERIFY_SECRET` with a long random string.
   - Replace wallet address placeholders (`REPLACEME`) with real BTC/ETH/USDT-TRC20 addresses.
   - Edit `COURSES` for your real pricing.
6. Upload the folder to any static host (or open `index.html` directly for local testing — EmailJS still works over `file://`, but `crypto.subtle` signing requires HTTPS or `localhost`).

## How it works without a server
- **"Database"**: enrollment records are saved to `localStorage` in the visitor's browser. There is no central admin dashboard — the source of truth for the office is the **email itself** plus the data embedded in the verify link.
- **Verify link**: the enrollment data is base64-encoded directly into the `verify.html` URL, plus a SHA-256 token signed with `VERIFY_SECRET`. Opening the link recomputes the signature and rejects it if the URL was edited.
- **Invoice**: generated entirely in the browser with `jsPDF` when the admin clicks "Confirm Payment," then auto-downloaded and emailed to the student as an attachment via EmailJS.
- **Emails**: sent directly from the browser via EmailJS's API — no backend mail server needed.

## Honest limitations of a backend-free system
Be aware of these before relying on it for a real paying business:
- **`VERIFY_SECRET` is visible in browser devtools.** Anyone who reads your JS source can forge a "verified" link. This blocks casual tampering, not a determined attacker. A real backend is the only way to keep a signing secret private.
- **No real database.** `localStorage` is per-browser/per-device — if the admin verifies on a different device than the student's browser used to submit, the "record update" only exists in the link/email, not a shared store.
- **No server-side validation.** All validation (required fields, sanitization) happens in the browser and can be bypassed by anyone calling EmailJS directly with their own script. Sanitization here only protects your own displayed HTML from XSS — it doesn't stop a bad actor from emailing your office fake enrollments.
- **CSRF/SQL-injection**: not applicable in the traditional sense since there's no server or SQL database, but that also means there is no server-side gatekeeping at all.
- **EmailJS free tier** has a monthly send limit and may not support attachments — check your plan.

If you outgrow these limits, the Node.js/Express version delivered earlier in this conversation adds a real backend, database-equivalent JSON store with file-locking, and a signing secret that never reaches the browser.
