# Robot Lawn Mower Guide — robotlawnmowerguide.com

Wire-free robot lawn mower buyer's guide: Astro static site with buying guides,
comparisons, a review page per model, a sortable comparison chart, and 3 interactive
calculators (size matcher, cost vs. lawn service, slope checker).
Deploys to Cloudflare Pages on every merge to `main`.

## Develop

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # outputs to dist/
```

## Content structure

| What | Where | URL |
|---|---|---|
| Model database (specs, tiers, prices, scores, pros/cons) | `src/data/models.ts` | drives `/mowers/`, `/mowers/<id>/`, all tools |
| Homepage top picks | `src/data/picks.ts` | `/` |
| Guides & comparisons | `src/content/posts/*.md` | `/posts/<file>/` |
| Long-form model reviews | `src/content/reviews/<model-id>.md` | appended to `/mowers/<model-id>/` |

Post frontmatter supports `category`, `tag`, `order`, `picks` (model ids rendered as
product cards + sidebar + sticky mobile CTA), `takeaways`, and `faq` (rendered + FAQPage schema).
See `src/content.config.ts`.

In markdown, link products as `[LUBA 3 AWD](amazon:mammotion-luba-3-awd)`. The build
resolves the model id to its Amazon link, adds the Associates tag and
`rel="sponsored nofollow"`, and fails on unknown ids.

Regenerate social images (`og-default.png`, `logo.png`, `apple-touch-icon.png`) with
`node scripts/make-images.mjs`.

## Amazon Associates

Product links are built by `src/lib/amazon.ts`. Set your Associates tag in
`src/lib/site.ts` (`AMAZON_TAG`) once approved; every product link on the
site picks it up automatically. Until then, links are untagged.

Add an `asin` to a model in `src/data/models.ts` to link straight to its Amazon
product page instead of a search results page (converts much better).

## Amazon product photos

Product photos come from Amazon's Creators API (PA-API's replacement). Amazon's
Associates policies forbid downloading or storing product images and allow keeping
an image link for at most 24 hours, so the site hotlinks the URLs the API returns
at build time and rebuilds twice a day.

To enable (requires 10+ qualifying sales in the past 30 days):
1. Associates Central → Tools → Creators API → Create application → add credential.
2. Cloudflare Pages → Settings → Environment variables (Production): set
   `AMAZON_CREATORS_CREDENTIAL_ID` and `AMAZON_CREATORS_CREDENTIAL_SECRET`.
3. Cloudflare Pages → Settings → Builds → Deploy hooks: create one for `main`, and
   save its URL as the GitHub Actions secret `CF_DEPLOY_HOOK`
   (`.github/workflows/rebuild.yml` calls it twice a day).

Only models with an `asin` get photos. Without credentials, or if the API fails,
the build falls back to illustrations. A licensed photo placed at
`src/assets/mowers/<model-id>.jpg` takes priority over both.

## Analytics (PostHog)

Visitors, link clicks, and performance are tracked with PostHog via
`src/components/PostHog.astro` (included in `BaseLayout`):

- **Visitors:** automatic `$pageview` / `$pageleave`.
- **Links:** autocapture plus a custom `affiliate_click` event for Amazon /
  `.aff` / `data-model` links (destination, model id, link text, page) and
  `outbound_click` for other external links.
- **Performance:** navigation timing plus `$web_vitals` (LCP, INP, CLS…).

Setup:

1. Create a PostHog project and copy its project API key.
2. Set build env vars (locally in `.env`, in Cloudflare Pages under
   Settings → Environment variables):
   `PUBLIC_POSTHOG_KEY=<key>` and `PUBLIC_POSTHOG_HOST=https://us.i.posthog.com`
   (or `https://eu.i.posthog.com`).
3. In PostHog: Project settings → Autocapture & heatmaps → enable
   **Web vitals autocapture**.

Without `PUBLIC_POSTHOG_KEY` the site builds and runs with analytics
disabled. Session recording stays off and Do Not Track is respected.

## Search

`npm run build` runs Pagefind after Astro to index pages marked `data-pagefind-body`;
the UI lives at `/search/`.

## Deploy

Cloudflare Pages project `robot-mower-guide` is connected to this repo:
- Production branch: `main`
- Build command: `npm run build`
- Build output: `dist`

## Pushing from the sandbox

Native `git push` is blocked here; use the REST push script:

```bash
python3 scripts/gh_push.py sagivo/robot-mower-guide ~/workspace/robot-mower-guide "message"
```
