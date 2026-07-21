# Agent Discovery — implementation notes

What this repo adds so AI agents can discover the site's resources, what is
verified, and what still depends on the production edge / DNS.

> Scope note: this is a static training & marketing site. It has **no public
> API, no OAuth/OIDC server, no MCP server, and no in-page tools**. So OAuth
> discovery, OAuth Protected Resource, `auth.md`, MCP Server Cards, an Agent
> Skills index, and WebMCP are intentionally **not** implemented — publishing
> discovery metadata for capabilities that don't exist would mislead agents.

## Implemented (Apache layer — verified at origin)

1. **RFC 8288 `Link` headers** on every HTML page (`.htaccess`, set
   unconditionally so it survives the DirectoryIndex sub-request; stripped from
   static assets via `assets/.htaccess`):
   - `</llms.txt>; rel="service-doc"`
   - `</llms-full.txt>; rel="describedby"`
   - `</.well-known/api-catalog>; rel="api-catalog"`

2. **RFC 9727 API catalog** at `/.well-known/api-catalog`
   (`application/linkset+json`, MIME set by `.well-known/.htaccess`). It points
   to the real `llms.txt` / `llms-full.txt` (`service-doc`), the sitemap
   (`describedby`), and the homepage (`status`). It advertises **no REST API**
   because there isn't one — it catalogs the site's actual agent resources.

3. **Markdown for Agents** — content negotiation on `Accept: text/markdown`.
   Each page has a pre-rendered `index.md` (generated from its `<main>`); the
   `.htaccess` rewrite serves the `.md` variant to markdown requests while
   browsers (which send `text/html`) still get HTML. Responses send
   `Vary: Accept`.

## Depends on the PRODUCTION edge (nginx + Varnish) — verify after deploy

The origin (Apache) serves all of the above correctly. Production sits behind
nginx + Varnish, which may need small changes:

- **`/.well-known/` must reach Apache.** Many nginx configs deny dotfile paths
  (`location ~ /\. { deny all; }`). Add an exception so `/.well-known/` is
  served/proxied:
  ```nginx
  location ^~ /.well-known/ { try_files $uri @backend; }  # or proxy_pass to Apache/Varnish
  ```
- **`.md` variants must be proxied to Apache** (not 404'd by static handling),
  and the `Accept` request header **must be forwarded** to the backend so the
  negotiation rewrite can fire.
- **Varnish must vary on `Accept`** so the HTML and Markdown variants are cached
  separately. To avoid cache fragmentation from browsers' long `Accept` strings,
  normalize `Accept` in VCL to a single flag first:
  ```vcl
  sub vcl_recv {
      if (req.http.Accept ~ "text/markdown") { set req.http.Accept = "text/markdown"; }
      else { unset req.http.Accept; }
  }
  ```
- Confirm nginx/Varnish do **not** strip the `Link` header.

Post-deploy checks:
```bash
curl -sI https://www.schooloffreelancing.com/ | grep -i '^link:'
curl -s  https://www.schooloffreelancing.com/.well-known/api-catalog -H 'Accept: application/linkset+json' -i | head
curl -s  https://www.schooloffreelancing.com/about-us/ -H 'Accept: text/markdown' -i | head
```

## DNS for AI Discovery (DNS-AID) — guidance only (needs your DNS provider)

DNS-AID (draft-mozleywilliams-dnsop-dnsaid) advertises the discovery entrypoint
via ServiceMode SVCB/HTTPS records under `_agents`, pointing agents at the API
catalog above. Publish at your authoritative DNS, then **sign the zone with
DNSSEC** so validating resolvers get authenticated answers.

Example (adjust TTL/params to the current draft — SvcParamKeys are still
evolving; the discovery-endpoint param below is illustrative):
```dns
; Entry point that resolves to the site host serving /.well-known/api-catalog
_index._agents.schooloffreelancing.com. 3600 IN HTTPS 1 www.schooloffreelancing.com. (
                                                     alpn="h2,h3" )
; (Optional) A2A-specific entry if/when an A2A endpoint exists:
; _a2a._agents.schooloffreelancing.com.  3600 IN HTTPS 1 www.schooloffreelancing.com. alpn="h2,h3"
```
Then enable DNSSEC for the zone at your DNS provider and confirm:
```bash
dig +dnssec HTTPS _index._agents.schooloffreelancing.com
```
Caveat: only publish `_a2a`/other service-specific records once those endpoints
actually exist — DNS-AID should advertise real, reachable services.

## Regenerating the per-page Markdown

The `.md` files are generated from each page's `<main>` element. If page content
changes, regenerate with an HTML→Markdown pass (e.g. `markdownify` over
`main#main`) so the Markdown stays in sync with the HTML (the HTML remains the
source of truth).
