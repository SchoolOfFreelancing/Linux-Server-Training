# School of Freelancing — SEO & AI Search Optimization Guide

**Last Updated:** 2026-07-22
**Status:** ✓ Optimization in progress
**Target:** Google Search visibility, Generative AI (SGE) discoverability, Rich Results

---

## 📋 Executive Summary

This guide addresses key optimization areas to improve:
1. **Rich Results** — Enable structured data for training courses, services, FAQs
2. **Indexation** — Fix "crawled but not indexed" and noindex issues
3. **Alternate Content** — Proper handling of HTML + Markdown variants
4. **AI Discoverability** — Optimize for Google's generative AI features
5. **Canonical Tags** — Ensure proper URL canonicalization

---

## 🎯 Optimization Areas

### 1. Rich Results & Structured Data (JSON-LD)

**Current Status:** Partial coverage
**Target:** All pages with appropriate schema types

#### Schemas to Implement:

##### A. Organization (Every Page)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "School of Freelancing",
  "url": "https://www.schooloffreelancing.com/",
  "description": "Linux & AI training and remote IT support services",
  "sameAs": ["https://www.facebook.com/SchoolOfFreelancing/", ...],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "linuxguns@gmail.com"
  }
}
```

##### B. Course (Training Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Linux Freelancing Training",
  "description": "...",
  "provider": {
    "@type": "Organization",
    "name": "School of Freelancing"
  },
  "duration": "PT180H",
  "courseLevel": "Beginner to Intermediate",
  "offers": {
    "@type": "Offer",
    "price": "600",
    "priceCurrency": "USD"
  }
}
```

##### C. Service (Support Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Linux Server Services",
  "description": "...",
  "provider": {
    "@type": "Organization",
    "name": "School of Freelancing"
  },
  "areaServed": "Worldwide",
  "offers": {
    "@type": "Offer",
    "price": "500",
    "priceCurrency": "USD"
  }
}
```

##### D. BreadcrumbList (All Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.schooloffreelancing.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Freelancing Training",
      "item": "https://www.schooloffreelancing.com/freelancing-training/"
    }
  ]
}
```

##### E. FAQPage (FAQ Pages Only)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is School of Freelancing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

**Implementation:** Add these JSON-LD blocks in `<head>` before closing `</head>` tag

---

### 2. Indexation Issues — "Crawled But Not Indexed"

**Common Causes:**
1. ✓ **Noindex Meta Tags** — Only 404.html (correct)
2. ✓ **Robots.txt Blocking** — No, everything is allowed
3. ✗ **Thin Content** — Some pages may have < 300 words
4. ✓ **Duplicate Content** — Proper canonical tags in place
5. ✗ **Poor Mobile Experience** — Verify mobile rendering
6. ✗ **Low Crawl Efficiency** — Check for redirect chains

**Actions:**

#### A. Verify Page Quality (Minimum 300 words)
- Training pages should have:
  - Course overview (100+ words)
  - Curriculum details (100+ words)
  - What you'll learn section
  - Who it's for section
  - Pricing and duration

- Service pages should have:
  - Service description (100+ words)
  - What's included
  - Benefits
  - Pricing information
  - Contact/CTA

#### B. Add Breadcrumbs to All Pages
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
</script>
```

#### C. Verify Mobile-Friendly Rendering
- All pages should render properly on mobile
- No overflow or horizontal scrolling
- Touch-friendly buttons/links (48x48px minimum)

#### D. Check for Redirect Chains
- Audit redirects in .htaccess
- Should be: client → final URL (1 redirect max)
- Not: client → redirect1 → redirect2 → final

---

### 3. Alternate Content — HTML + Markdown Variants

**Current Setup:** Content negotiation via Accept headers

**Files Involved:**
- `.htaccess` — Handles content negotiation
- `index.html` — Primary format (browsers)
- `index.md` — Markdown variant (AI crawlers)

**Proper Implementation Checklist:**

```apache
# In .htaccess
RewriteCond %{HTTP_ACCEPT} text/markdown [NC]
RewriteCond %{DOCUMENT_ROOT}/$1/index.md -f
RewriteRule ^(.+?)/?$ $1/index.md [L]
```

**HTTP Headers:** Must include `Vary: Accept`

```apache
<FilesMatch "\.html?$">
  Header add Vary "Accept"
  Header set Cache-Control "public, max-age=3600"
</FilesMatch>
```

**Verification:**
```bash
# Test HTML delivery
curl -H "Accept: text/html" https://www.schooloffreelancing.com/about-us/ | head -1

# Test Markdown delivery
curl -H "Accept: text/markdown" https://www.schooloffreelancing.com/about-us/

# Check Vary header
curl -I https://www.schooloffreelancing.com/ | grep Vary
```

---

### 4. AI-Friendly Content & Discoverability

Google's generative AI models need:

#### A. Clear Topic Coverage
✓ Pages should have:
- Descriptive `<title>` (60-70 chars)
- Meta description (150-160 chars)
- H1 headings for main topic
- H2-H3 for subtopics
- Clear paragraphs (not just lists)

#### B. E-E-A-T Signals
- **Experience** — Mention real deployments, client projects
- **Expertise** — Highlight credentials, certifications, instructor bios
- **Authoritativeness** — Link to industry resources, testimonials
- **Trustworthiness** — Privacy policy, security certifications, reviews

#### C. Structured FAQ Content
Instead of:
```html
<p>Q: What is Linux?</p>
<p>A: Linux is...</p>
```

Use:
```html
<h3 id="what-is-linux">What is Linux?</h3>
<p>Linux is...</p>
```

Plus JSON-LD FAQPage schema

#### D. How-To Content
Create detailed how-to pages if not already present:
- "How to Deploy a Linux Server"
- "How to Set Up Docker"
- "How to Configure FusionPBX"

---

### 5. Canonical Tags & URL Standardization

**Current Status:** ✓ 81 of 83 pages have canonical tags

**Missing Canonicals:**
- `index.nginx-debian.html` — Default nginx page (safe to exclude)
- `404.html` — Already has noindex (correct)

**Canonical Tag Format:**
```html
<link rel="canonical" href="https://www.schooloffreelancing.com/about-us/">
```

**Key Rules:**
1. ✓ Every page points to itself (self-canonical)
2. ✓ Always use HTTPS + www
3. ✓ Trailing slash for directories
4. ✓ No query parameters (unless pagination)

---

### 6. File Format Optimization

#### llms.txt ✓
- **Status:** Markdown file with H1 header
- **Content:** Summary with key links
- **Location:** `/var/www/html/llms.txt`
- **Purpose:** AI crawler discovery

#### llms-full.txt ✓
- **Status:** Complete directory listing
- **Content:** All training + service pages
- **Location:** `/var/www/html/llms-full.txt`
- **Purpose:** AI model training data, comprehensive reference

**Content-Type Headers** (should be):
```
llms.txt  → text/plain; charset=utf-8
llms-full.txt → text/plain; charset=utf-8
```

---

## 📊 Optimization Checklist

### Rich Results & Structured Data
- [ ] Organization schema on every page (< head>)
- [ ] BreadcrumbList schema on all pages (< head>)
- [ ] Course schema on all training pages
- [ ] Service schema on all support pages
- [ ] FAQPage schema on FAQ pages only
- [ ] LocalBusiness schema (if applicable)
- [ ] Validate all JSON-LD with Google's Rich Results Tester

### Indexation & Crawlability
- [ ] All pages have < 300 words minimum content
- [ ] No noindex meta tags (except 404)
- [ ] robots.txt allows all public pages
- [ ] No redirect chains (max 1 redirect)
- [ ] Mobile-friendly rendering verified
- [ ] All internal links are follow (not nofollow)
- [ ] sitemap.xml is up-to-date
- [ ] Submit sitemap to Google Search Console

### Alternate Content
- [ ] Content negotiation in .htaccess working
- [ ] Vary: Accept header present
- [ ] All .md files are valid Markdown
- [ ] HTML and Markdown content matches
- [ ] Test with curl -H "Accept: text/markdown"

### AI-Friendly Content
- [ ] All titles are descriptive (50-70 chars)
- [ ] All meta descriptions present (150-160 chars)
- [ ] All pages have H1 headings
- [ ] Content organized with H2/H3 headings
- [ ] FAQ schema on FAQ content
- [ ] E-E-A-T signals present (credentials, reviews, etc.)
- [ ] llms.txt has H1 header ✓
- [ ] llms-full.txt comprehensive ✓

### URL & Canonicalization
- [ ] 100% of pages have canonical tags
- [ ] All canonicals use https://www. (no apex)
- [ ] All directory URLs have trailing slash
- [ ] No query parameters in canonical URLs

---

## 🔍 Testing & Verification

### 1. Rich Results Testing
```
https://search.google.com/test/rich-results
```
Upload any HTML page and verify structured data is recognized

### 2. Mobile-Friendly Test
```
https://search.google.com/mobile-friendly-test/
```
Test a few key pages to ensure proper mobile rendering

### 3. URL Inspection (Google Search Console)
1. Sign in to Google Search Console
2. Enter any URL from the site
3. Click "Inspect"
4. Check: "URL is on Google" status
5. Request indexation if "URL not on Google"

### 4. Sitemap Validation
```
https://www.schooloffreelancing.com/sitemap.xml
```
Ensure it loads and contains all public URLs

### 5. Content Negotiation Test
```bash
# HTML variant
curl -I -H "Accept: text/html" https://www.schooloffreelancing.com/about-us/
# Should return: Content-Type: text/html

# Markdown variant
curl -I -H "Accept: text/markdown" https://www.schooloffreelancing.com/about-us/
# Should return: Content-Type: text/markdown
```

---

## 📈 Expected Results

**Before Optimization:**
- Pages crawled but not indexed
- No rich results
- Limited AI discoverability
- Missing structured data

**After Optimization:**
- ✓ Rich results enabled (FAQs, courses, services)
- ✓ All pages indexed
- ✓ AI crawlers get Markdown variants
- ✓ Course pages show in Google results
- ✓ Service offerings visible in search
- ✓ Increased click-through rates (CTR)

---

## 🚀 Implementation Timeline

**Phase 1: Immediate (Today)**
- ✓ Update llms.txt with H1 header
- ✓ Create comprehensive llms-full.txt
- ✓ Verify canonical tags
- ✓ Verify robots.txt

**Phase 2: Short-term (This Week)**
- [ ] Add Organization schema to all pages
- [ ] Add BreadcrumbList to all pages
- [ ] Add Course schema to training pages
- [ ] Add Service schema to support pages
- [ ] Verify Vary: Accept headers

**Phase 3: Medium-term (This Month)**
- [ ] Audit content quality (min 300 words)
- [ ] Add E-E-A-T signals
- [ ] Enhance FAQ with schema
- [ ] Test mobile rendering
- [ ] Submit all URLs to Google Search Console

**Phase 4: Ongoing**
- [ ] Monitor Google Search Console
- [ ] Track indexation status
- [ ] Update lastmod dates in sitemap
- [ ] Keep llms-full.txt current

---

## 📞 Support & Troubleshooting

**Issue:** "Pages crawled but not indexed"
- **Solution:** Add BreadcrumbList schema, ensure > 300 words per page, check E-E-A-T signals

**Issue:** "Rich results not showing"
- **Solution:** Validate JSON-LD with Google's Rich Results Tester, ensure correct schema types

**Issue:** "AI crawlers not getting Markdown variants"
- **Solution:** Verify Content-type negotiation in .htaccess, add Vary: Accept header

**Issue:** "URLs not indexed"
- **Solution:** Use Google Search Console URL Inspection tool, request indexation, check noindex meta tags

---

## 📚 Resources

- [Google Structured Data](https://developers.google.com/search/docs/appearance/structured-data)
- [Schema.org](https://schema.org/)
- [Google Search Central](https://support.google.com/webmasters)
- [RFC 9309 - robots.txt](https://tools.ietf.org/html/rfc9309)
- [Content Negotiation Guide](https://httpwg.org/specs/rfc7231.html#content-negotiation)

---

**Status:** ✓ Optimization Guide Completed
**Next:** Implement recommended changes and test in Google Search Console
