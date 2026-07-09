# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The public website for School of Freelancing (https://www.schooloffreelancing.com) — a marketing/training site for a paid Linux/IT freelancing course. Pure static HTML5 + Bootstrap 5 + vanilla JS. There is **no build system, no package manager, no test suite, and no linter** — files are edited directly and served as-is by Apache (this repo lives at the Apache docroot `/var/www/html`).

To preview locally, just open a file in a browser, or serve the directory (e.g. `python3 -m http.server`). Note that `.htaccess` clean-URL rewrites only work under Apache.

## Site structure (post 2026-07-10 restructure)

The repo went through a large URL/IA overhaul (still **uncommitted** as of 2026-07-10). The old flat sections (`/about/`, `/contact/`, `/faq/`, `/tech-support/`, `/testimonials/`, `/training/` and all its enrollment sub-variants, `/terms/`, `/privacy/`, `/refund/`, `/training-rules/`, `/verify/`, `/images/`) are **deleted** from the working tree; `.htaccess` 301-redirects all of them to their new equivalents below.

Current sections, all fully populated (no empty placeholder pages remain anywhere in the repo):
- `about-us/`, `get-started/` (replaces `/contact/`; also the de facto enrollment funnel — see below), `register/` (registration walkthrough, same contact channels)
- `legal/` — privacy-policy, refund-policy, terms-and-conditions, training-rules, credential-verification
- `resource-center/` — hub page, `faqs/`, `testimonials/`
- `freelancing-training/` — hub page (`index.html`) + 18 per-technology subpages, e.g. `linux-freelancing-training/`, `hermes-agent-training/`; replaces `/training/`
- `linux-it-services/` — hub page + 23 per-technology subpages, e.g. `linux-server-services/`, `gitlab-support/`; replaces `/tech-support/`
- `location/` — hub page + 20 per-country pages (all remote/online delivery, USD pricing, no local offices — don't add location-specific claims beyond that)
- `sitemaps/` — per-category sitemap fragments (`sitemap-main.xml`, `sitemap-training.xml`, `sitemap-service.xml`, `sitemap-local.xml`); `sitemap-blog.xml` is intentionally an empty valid `<urlset>` since this site has no blog. **Root `sitemap.xml`** (the one `robots.txt` actually references) is the comprehensive one — it lists every page directly, not via a sitemap index, so update it (or regenerate from the directory listing) whenever a page is added/removed.
- `llms.txt` / `llms-full.txt` — site index for LLM consumption; keep in sync with the catalog if training/support items are added or removed.

All hub-page cards link to their matching detail subpage (via the card title) in addition to the external GitHub repo link; the shared footer's Training/Tech Support columns link to 4-5 specific subpages plus a "View All" link to the hub. When adding a new training/support item, update: the hub page's card grid, the footer block (if it should be one of the featured items), `sitemap.xml`, and `llms-full.txt`.

The homepage (`index.html`) also features 3 support items — DigitalOcean Cloud Support, Hummingbot Installation Support, Vapi Platform Support — that were originally homepage-only teasers with no matching hub/subpage entry; they were added to the `/linux-it-services/` hub catalog and given their own subpages on 2026-07-10, so the count above (23) includes them.

## Enrollment system has been removed

`/training/enroll/`, `/training/oldenroll/`, `/training/enroll1/`, and `/training/files/` (the Cloudflare Worker-backed verify flow) are all gone — there is currently **no enrollment backend**. Every "Enroll Now" / "Get Support" CTA across the site now points to `/get-started/` (a static contact page with Telegram/WhatsApp links) or `/register/`, whichever fits the context — the closest functioning equivalents. If enrollment is rebuilt, decide where it should live before wiring CTAs to it.

## Page conventions

- Each page is a folder with an `index.html`. Clean URLs (e.g. `/about-us/` instead of `/about-us/index.html`) are enforced by `.htaccess` rewrites.
- Every page carries its own full `<head>` (title, canonical, OG tags, JSON-LD) and duplicated nav/footer markup — there is no templating. A change to shared chrome (nav, footer, analytics) must be repeated in every page's `index.html`.
- Shared assets live in `/assets` (`css/style.css`, `js/main.js` — matrix-rain canvas background and UI effects, favicons in `assets/icons/`, logos in `assets/images/`). Pages reference these with absolute paths (`/assets/css/style.css`, `/assets/js/main.js`, `/assets/icons/favicon.ico`) — always use absolute paths; a relative `css/style.css` link 404s outside its own directory (this happened on all 5 `legal/*` pages and was fixed 2026-07-10).
- No per-page OG images exist; every page's `og:image`/`twitter:image` falls back to the one real image, `/assets/images/og-home.jpg`.
- When adding or renaming a page, update `sitemap.xml` (comprehensive, not an index — see above) and `llms-full.txt`, and add a redirect in `.htaccess` if an old URL is being replaced.

## CI / GitHub

- `.github/workflows/claude.yml` runs Claude Code on issues/comments mentioning `@claude`; `claude-review.yml` reviews PRs with a "focus on security" system prompt. There is no build/test CI for the site itself.
- Remote: `SchoolOfFreelancing/Linux-Freelancing-Training`, single `main` branch.
