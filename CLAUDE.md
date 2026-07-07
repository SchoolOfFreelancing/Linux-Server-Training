# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The public website for School of Freelancing (https://www.schooloffreelancing.com) — a marketing/training site for a paid Linux freelancing course. Pure static HTML5 + Bootstrap 5 + vanilla JS. There is **no build system, no package manager, no test suite, and no linter** — files are edited directly and served as-is by Apache (this repo lives at the Apache docroot `/var/www/html`).

To preview locally, just open a file in a browser, or serve the directory (e.g. `python3 -m http.server`). Note that `.htaccess` clean-URL rewrites only work under Apache.

## Site structure

- Each page is a folder with an `index.html` (`/about/`, `/faq/`, `/training/`, `/contact/`, `/terms/`, `/privacy/`, `/refund/`, `/testimonials/`, `/training-rules/`, `/tech-support/`, etc.). Clean URLs (`/about/` instead of `/about/index.html`) are enforced by `.htaccess` rewrites, which also 301-redirect legacy flat URLs like `/training.html`.
- Every page carries its own full `<head>` (title, canonical, OG tags) and duplicated nav/footer markup — there is no templating. A change to shared chrome (nav, footer, analytics) must be repeated in every page's `index.html`.
- Shared assets live in `/assets` (`css/style.css`, `js/main.js` — matrix-rain canvas and UI effects, partner logos in `images/`).
- When adding or renaming a page, update `sitemap.xml` and add a redirect in `.htaccess` if an old URL is being replaced.

## Enrollment/verification system — multiple generations coexist

The paid-enrollment flow has been rebuilt several times; older versions are still in the tree. Confirm with the user which one is live before editing:

- `/training/oldenroll/` — oldest, standalone page.
- `/training/enroll/` — EmailJS-based, uses `sof-shared.js`; the verify secret is client-side (HMAC in the browser).
- `/training/enroll1/` — refactored variant (`js/config.js`, `enroll.js`, `verify.js`, `utils.js`) with its own README documenting EmailJS template setup.
- `/training/files/` — newest: `worker.js` + `wrangler.toml` define a **Cloudflare Worker** (`sof-verify-signer`) that holds `VERIFY_SECRET` server-side. Deploy with `wrangler deploy`; set the secret with `wrangler secret put VERIFY_SECRET` (never commit it). Endpoints: `POST /sign`, `GET /verify`, `POST /mark-paid`.
- `/verify/` — the admin-facing verify/invoice page linked from enrollment emails.

How it works (no backend except the Worker): the enrollment form sends emails via EmailJS directly from the browser; the enrollment record is base64-encoded into a verify-link URL and HMAC-signed; the invoice PDF is generated in-browser with jsPDF. The pre-Worker versions ship the signing secret to the browser — comments in those files already document this limitation; don't present client-side signing as tamper-proof.

Config placeholders (EmailJS keys/template IDs, crypto wallet addresses marked `REPLACEME`, `VERIFY_SECRET`) live in `training/enroll1/js/config.js` and `training/enroll/sof-shared.js`.

## CI / GitHub

- `.github/workflows/claude.yml` runs Claude Code on issues/comments mentioning `@claude`; `claude-review.yml` reviews PRs. There is no build/test CI for the site itself.
- Remote: `SchoolOfFreelancing/Linux-Freelancing-Training`, single `main` branch.
