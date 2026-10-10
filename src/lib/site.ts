// Central site config. Domain: water-filter-guide.pages.dev
// (also update `SITE` in astro.config.mjs and public/robots.txt).
export const SITE_NAME = "Whole House Water Filter Guide";
export const SITE_URL = "https://water-filter-guide.pages.dev";
export const SITE_TAGLINE = "Whole-house water filter guides, comparisons, and calculators.";
export const SITE_DESCRIPTION =
  "Independent guides to whole-house water filtration: system comparisons, flow-rate sizers, cost calculators, and certification-first reviews so you buy the right filter the first time.";
export const OG_DEFAULT = `${SITE_URL}/og-default.png`;

// Amazon Associates Store ID. Every product link on the site picks it up.
// After changing it, clear Astro's content cache (rm -rf node_modules/.astro)
// so already-rendered markdown links are rebuilt with the new tag.
export const AMAZON_TAG = "room4205-20";

// Primary navigation, shared by header and footer.
export const NAV = [
  { href: "/posts/best-whole-house-water-filters-2026/", label: "Best Filters" },
  { href: "/filters/", label: "Compare" },
  { href: "/guides/", label: "Guides" },
  { href: "/tools/", label: "Tools" },
];
