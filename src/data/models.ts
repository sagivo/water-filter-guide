export type Tier = "budget" | "mid" | "premium";
export type WaterType = "city" | "well" | "both";

export interface FilterModel {
  /** URL slug: /filters/<id>/ */
  id: string;
  name: string;
  /** Compact name for tables and buttons, e.g. "CF1". */
  shortName: string;
  brand: string;
  tier: Tier;
  releaseYear: number;
  /** Rated service flow in gallons per minute */
  flowRateGpm: number;
  /** Peak flow (when published) */
  peakFlowGpm?: number;
  /** Rated media capacity in gallons */
  capacityGallons: number;
  /** Human-readable media summary */
  media: string;
  /** Short media label for table chips */
  mediaShort: string;
  /** Certification claims, e.g. "NSF/ANSI 42 (97% chlorine)" */
  certifications: string[];
  /** One-line certification highlight for chips */
  certShort: string;
  warranty: string;
  /** "city" | "well" | "both" */
  waterType: WaterType;
  /** Typical US street price range; undefined when unverified — use "check price" wording */
  priceLow?: number;
  priceHigh?: number;
  /** Estimated annual replacement-filter spend (USD); undefined when unknown */
  annualFilterCost?: number;
  /** Human filter-life summary, e.g. "1,000,000 gal (~10 yrs)" */
  filterLife: string;
  /** Caveats shown under the spec table (variant differences, unverified figures). */
  specNotes?: string[];
  /** Amazon search query for the buy link */
  query: string;
  /** Amazon ASIN — when set, links go straight to the product page */
  asin?: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  /** Editorial score out of 10 — research-based, see /how-we-research/ */
  score: number;
  scores: { filtration: number; flow: number; value: number };
  /** One-paragraph verdict */
  verdict: string;
  sources: string[];
}

/** Back-compat alias for components not yet renamed. */
export type MowerModel = FilterModel;

/**
 * Specs compiled October 2026 from manufacturer spec pages and dated
 * retailer/review listings (see `sources` on each model). Prices move
 * constantly — treat as guidance and verify before buying. Models without a
 * price range link to an Amazon search instead of a fixed figure.
 */
export const MODELS: FilterModel[] = [
  {
    id: "springwell-cf1",
    name: "SpringWell CF1 Whole House Water Filter",
    shortName: "CF1",
    brand: "SpringWell",
    tier: "mid",
    releaseYear: 2019,
    flowRateGpm: 9,
    peakFlowGpm: 20,
    capacityGallons: 1000000,
    media: "Catalytic coconut-shell carbon + KDF media in an upflow tank, with a 5-micron sediment pre-filter",
    mediaShort: "Catalytic carbon + KDF",
    certifications: [
      "Components certified to NSF/ANSI 42",
      "Components certified to NSF/ANSI 53",
      "Manufacturer-tested for chlorine, chloramine, PFOA/PFOS",
    ],
    certShort: "NSF 42/53 components",
    warranty: "Lifetime on tank, valves and housings; 6-month satisfaction guarantee",
    waterType: "city",
    priceLow: 1144,
    priceHigh: 1160,
    annualFilterCost: 35,
    filterLife: "1,000,000 gal (~6–10 yrs); pre-filter every 6–9 mo",
    query: "SpringWell CF1 whole house water filter",
    bestFor: "Best overall for city water — the set-and-forget tank system",
    pros: [
      "One-million-gallon media capacity means a decade between main media changes",
      "Spec sheet names chlorine, chloramine and PFAS/PFOA/PFOS specifically",
      "Lifetime warranty on tank and valves plus a 6-month money-back guarantee",
      "Low upkeep: only the cheap 5-micron pre-filter needs swapping (about $35/yr)",
      "Three sizes (9/12/20 GPM) so you size by bathrooms, not guesswork",
    ],
    cons: [
      "Not a certified whole system — NSF marks apply to components, not the assembled unit",
      "Won't remove fluoride, soften hard water, or kill bacteria",
      "Point-of-entry install is real plumbing work; most owners hire a plumber",
    ],
    score: 9.2,
    scores: { filtration: 9, flow: 9, value: 9 },
    verdict:
      "The CF1 is the whole-house filter we recommend to most city-water homes: a simple upflow carbon tank with the longest media life in its class, honest specs, and the lowest long-term cost of any premium system. Just know the NSF badges cover components, not the whole unit.",
    sources: [
      "https://qualitywaterlab.com/whole-house/springwell-filter-system-review/",
      "https://worldwaterreserve.com/best-whole-house-water-filter/",
      "https://waterfilters.systems/springwell-whole-house-water-filter-reviews/",
    ],
  },
  {
    id: "springwell-cf4",
    name: "SpringWell CF4 Whole House Water Filter",
    shortName: "CF4",
    brand: "SpringWell",
    tier: "mid",
    releaseYear: 2019,
    flowRateGpm: 12,
    capacityGallons: 1000000,
    media: "Catalytic coconut-shell carbon + KDF media in an upflow tank, with a 5-micron sediment pre-filter",
    mediaShort: "Catalytic carbon + KDF",
    certifications: [
      "Components certified to NSF/ANSI 42",
      "Components certified to NSF/ANSI 53",
      "Manufacturer-tested for chlorine, chloramine, PFOA/PFOS",
    ],
    certShort: "NSF 42/53 components",
    warranty: "Lifetime on tank, valves and housings; 6-month satisfaction guarantee",
    waterType: "city",
    annualFilterCost: 35,
    filterLife: "1,000,000 gal (~6–10 yrs); pre-filter every 6–9 mo",
    specNotes: ["Priced above the CF1; verify the current price on the maker page before buying."],
    query: "SpringWell CF4 whole house water filter",
    bestFor: "Best for larger homes — the CF1's formula at 12 GPM for 4–6 bathrooms",
    pros: [
      "Same catalytic-carbon + KDF media and lifetime warranty as the CF1",
      "12 GPM service flow handles 4–6 bathroom homes without pressure sag",
      "One-million-gallon capacity with minimal maintenance",
      "No electricity, no backwashing, no drain line needed",
    ],
    cons: [
      "Priced above the CF1 for the same media — you pay for the bigger tank",
      "Component-level NSF marks, not a whole-system certification",
      "Won't soften hard water or remove fluoride",
    ],
    score: 8.8,
    scores: { filtration: 9, flow: 10, value: 8 },
    verdict:
      "If the CF1 fits 1–3 bathroom homes, the CF4 is its big sibling: identical media and warranty with 12 GPM of flow for 4–6 bathrooms. Buy it when your household actually needs the flow — otherwise the CF1 costs less for the same water.",
    sources: [
      "https://waterfilters.systems/springwell-whole-house-water-filter-reviews/",
      "https://worldwaterreserve.com/best-whole-house-water-filter/",
    ],
  },
  {
    id: "aquasana-healthshield",
    name: "Aquasana HealthShield Whole House Water Filter",
    shortName: "HealthShield",
    brand: "Aquasana",
    tier: "premium",
    releaseYear: 2025,
    flowRateGpm: 6,
    capacityGallons: 165000,
    media: "Specialized granular activated carbon blend in a compact single tank, with Smart Flow Monitor touchscreen",
    mediaShort: "GAC blend + smart monitor",
    certifications: [
      "WQA certified to NSF/ANSI 53 (PFAS, VOCs)",
      "WQA certified to NSF/ANSI 401 (pharmaceuticals, microplastics)",
      "Reduces up to 99.9% of 61 contaminants per maker",
    ],
    certShort: "WQA: NSF/ANSI 53 + 401",
    warranty: "10-year limited warranty",
    waterType: "city",
    priceLow: 2099,
    priceHigh: 2099,
    annualFilterCost: 260,
    filterLife: "165,000 gal; media replacement roughly every 3–5 yrs",
    specNotes: [
      "The most expensive system in our guide; replacement media is a major line item in the 5-year cost.",
    ],
    query: "Aquasana HealthShield whole house water filter",
    bestFor: "Best certified PFAS reduction — the only whole-house system WQA-certified to NSF/ANSI 53 for PFAS",
    pros: [
      "First whole-house system certified to reduce PFAS and VOCs from every tap",
      "WQA certification to NSF/ANSI 53 and 401 — independent, whole-system, not component-level",
      "Smart Flow Monitor tracks usage and remaining capacity on a color touchscreen",
      "Compact single-tank design keeps steady pressure in busy households",
    ],
    cons: [
      "Highest upfront price in our guide at about $2,099",
      "165,000-gallon capacity means pricier media replacements than million-gallon tanks",
      "Lower rated flow than big tank systems — size carefully for large homes",
    ],
    score: 9.0,
    scores: { filtration: 10, flow: 8, value: 7 },
    verdict:
      "If PFAS is your primary worry, HealthShield is the one system with independent whole-system certification to back the claim. You pay for that certainty — upfront and in media replacements — but no other whole-house filter carries this certification story.",
    sources: [
      "https://worldwaterreserve.com/best-whole-house-water-filter/",
      "https://www.kitchenstewardship.com/aquasana-water-filter/",
      "https://pr.wvcjournal.com/article/Aquasana-Launches-the-First-Whole-House-Water-Filtration-System-Certified-to-Reduce-PFAS-and-VOCs-From-Every-Tap/6a7b10c62e905784f149af7d",
    ],
  },
  {
    id: "aquasana-rhino-eq1000",
    name: "Aquasana Rhino EQ-1000 Whole House Water Filter",
    shortName: "Rhino EQ-1000",
    brand: "Aquasana",
    tier: "mid",
    releaseYear: 2016,
    flowRateGpm: 7,
    peakFlowGpm: 14.6,
    capacityGallons: 1000000,
    media: "Carbon + KDF + catalytic carbon dual-tank system with sediment pre-filter and 0.35-micron post-filter",
    mediaShort: "Carbon + KDF, dual tank",
    certifications: [
      "NSF/ANSI 42 certified (97% chlorine reduction, 1M gal)",
      "Tank WQA certified to NSF/ANSI 61 (material safety)",
    ],
    certShort: "NSF/ANSI 42 certified",
    warranty: "10-year limited warranty; 90-day guarantee",
    waterType: "city",
    priceLow: 999,
    priceHigh: 1998,
    annualFilterCost: 120,
    filterLife: "1,000,000 gal (~10 yrs); pre/post filters every 2–6 mo",
    specNotes: [
      "Street price swings widely with promotions — listed here from about $999 on sale to about $1,998 at list.",
    ],
    query: "Aquasana Rhino EQ-1000 whole house water filter",
    asin: "B0FYHBLSK3",
    bestFor: "Best certified chlorine reduction — NSF/ANSI 42 tested to 97% for a million gallons",
    pros: [
      "Independently certified to NSF/ANSI 42 for 97% chlorine reduction",
      "Million-gallon dual-tank capacity with upflow design that resists clogging",
      "Optional salt-free conditioner and UV add-ons from the same maker",
      "0.35-micron post-filter polishes fine sediment other tanks miss",
    ],
    cons: [
      "Pre/post filters need swapping every 2–6 months (~$120/yr) — the busiest maintenance schedule here",
      "7 GPM service flow is modest; big households should look at the Max Flow version",
      "No PFAS certification story — HealthShield is Aquasana's answer for that",
    ],
    score: 8.6,
    scores: { filtration: 9, flow: 7, value: 8 },
    verdict:
      "The Rhino is the certification-first pick for chlorine-heavy city water: NSF/ANSI 42 tested, not just claimed. The trade-off is maintenance — its cartridge pre/post filters need attention every few months, where tank systems ask almost nothing.",
    sources: [
      "https://qualitywaterlab.com/whole-house/aquasana-eq-1000-review/",
      "https://modernize.com/water-treatment/best-water-filtration-system-brands/aquasana-rhino-filtration-system",
    ],
  },
  {
    id: "kind-e1000",
    name: "Kind Water E-1000 Whole House Water Filter",
    shortName: "E-1000",
    brand: "Kind Water",
    tier: "mid",
    releaseYear: 2020,
    flowRateGpm: 15,
    capacityGallons: 100000,
    media: "High-surface-area carbon block + washable 20-inch pleated sediment filter; optional salt-free softener module",
    mediaShort: "Carbon block cartridges",
    certifications: [
      "Components certified NSF/ANSI 61 and 372 (lead-free)",
      "CSA B483.1 compliant",
    ],
    certShort: "NSF 61/372 components",
    warranty: "Limited lifetime warranty",
    waterType: "both",
    priceLow: 770,
    priceHigh: 976,
    annualFilterCost: 180,
    filterLife: "~100,000 gal; cartridges roughly yearly",
    specNotes: [
      "Maker-direct pricing moves often; seen from about $770 on sale to $976 list in 2026.",
    ],
    query: "Kind Water E-1000 whole house water filter",
    bestFor: "Best for DIY install — wall-mount cartridges, no tank, take it when you move",
    pros: [
      "15 GPM flow covers 1–6 bathrooms — the highest flow per dollar here",
      "Wall-mount cartridge design: only 2 plumbing connections, zero floor space",
      "Washable pleated sediment pre-filter cuts replacement costs",
      "Portable enough to take with you when you move",
    ],
    cons: [
      "Cartridge media costs more over time than million-gallon tank media",
      "Component-level certifications, not whole-system contaminant claims",
      "Not the pick for heavy well-water iron — pair with a dedicated iron stage",
    ],
    score: 8.5,
    scores: { filtration: 8, flow: 10, value: 8 },
    verdict:
      "The E-1000 is the renter-friendly, DIY-friendly outlier: a wall-mounted cartridge system with 15 GPM of flow and no tank to plumb. Cartridge replacements cost more long-term than tank media, but nothing here is easier to install.",
    sources: [
      "https://worldwaterreserve.com/best-whole-house-water-filter/",
      "https://kindwater.com/products/whole-house-iron-carbon-filter-salt-free-water-softener-with-uv",
    ],
  },
  {
    id: "ispring-wgb32b",
    name: "iSpring WGB32B 3-Stage Whole House Water Filter",
    shortName: "WGB32B",
    brand: "iSpring",
    tier: "budget",
    releaseYear: 2017,
    flowRateGpm: 15,
    capacityGallons: 100000,
    media: "3-stage 20\"x4.5\" Big Blue: sediment + coconut-shell GAC + carbon block",
    mediaShort: "3-stage Big Blue",
    certifications: ["Meets NSF/ANSI standards (per maker)"],
    certShort: "Meets NSF/ANSI standards",
    warranty: "1-year limited warranty; lifetime US-based tech support",
    waterType: "both",
    priceLow: 420,
    priceHigh: 517,
    annualFilterCost: 126,
    filterLife: "100,000 gal (~1 yr for a family of 4)",
    specNotes: ["Yearly filter-pack cost of about $126 is the real price of this system — budget for it."],
    query: "iSpring WGB32B whole house water filter",
    bestFor: "Best budget pick — the Amazon favorite for simple chlorine/sediment filtration",
    pros: [
      "Lowest upfront cost of any full-size system in our guide",
      "15 GPM through 1-inch ports — no meaningful pressure drop",
      "Standard 20\"x4.5\" housings accept third-party cartridges",
      "Straightforward DIY install with 1-inch NPT fittings",
    ],
    cons: [
      "Cartridges last about a year — the ~$126/yr replacement pack is mandatory budgeting",
      "No independent certification marks on contaminant claims",
      "Variants (KDS, PB, KS) target different contaminants — easy to buy the wrong one",
    ],
    score: 8.2,
    scores: { filtration: 8, flow: 9, value: 9 },
    verdict:
      "The WGB32B is the best-selling budget whole-house filter on Amazon for a reason: real 15 GPM flow and honest 3-stage filtration for around $450. Go in knowing the cartridges are a yearly subscription, and it earns its price.",
    sources: [
      "https://www.dealmoon.com/en/420-ispring-wgb32b-whole-house-water-filter-system-3-stage-20x4-5-inch-1-inch-inlet-outlet/6033184.html?target_sites=us",
      "https://www.youtube.com/watch?v=xa7HtrRhivk",
    ],
  },
  {
    id: "ispring-wgb32b-kds",
    name: "iSpring WGB32B-KDS 3-Stage Whole House Water Filter",
    shortName: "WGB32B-KDS",
    brand: "iSpring",
    tier: "budget",
    releaseYear: 2022,
    flowRateGpm: 15,
    capacityGallons: 250000,
    media: "Sediment + FWDS150K anti-scale + GAC/KDF compound + carbon block; targets lead, mercury, chloramine, H2S",
    mediaShort: "Anti-scale + KDF compound",
    certifications: ["Meets NSF/ANSI standards (per maker)"],
    certShort: "Meets NSF/ANSI standards",
    warranty: "1-year limited warranty; lifetime US-based tech support",
    waterType: "both",
    priceLow: 633,
    priceHigh: 690,
    annualFilterCost: 150,
    filterLife: "250,000 gal",
    query: "iSpring WGB32B-KDS whole house water filter",
    asin: "B0BGYH7DVZ",
    bestFor: "Best budget pick for hard water — anti-scale plus heavy-metal reduction",
    pros: [
      "Patented anti-scale media protects pipes and appliances without salt",
      "Targets lead, mercury, chloramine and hydrogen sulfide — broader than the base WGB32B",
      "250,000-gallon capacity stretches cartridge changes further",
      "Same easy 1-inch NPT DIY install as the standard WGB32B",
    ],
    cons: [
      "Costs ~50% more than the base WGB32B — only worth it if you need scale/heavy-metal help",
      "Still a yearly cartridge system, not a decade-long tank",
      "Anti-scale is scale prevention, not softening — won't remove hardness minerals",
    ],
    score: 8.4,
    scores: { filtration: 9, flow: 9, value: 8 },
    verdict:
      "The KDS is the WGB32B for harder water: anti-scale media plus heavy-metal reduction at a still-reasonable price. If your water is just chlorinated city water, save the money and buy the base model.",
    sources: [
      "https://www.amazon.com/dp/B0BGYH7DVZ/",
    ],
  },
  {
    id: "express-water-heavy-metal",
    name: "Express Water Heavy Metal 3-Stage Whole House Water Filter",
    shortName: "Heavy Metal 3-Stage",
    brand: "Express Water",
    tier: "budget",
    releaseYear: 2019,
    flowRateGpm: 15,
    capacityGallons: 100000,
    media: "KDF heavy-metal + polyphosphate anti-scale + activated carbon block, on a stainless stand with pressure gauges",
    mediaShort: "KDF + anti-scale + carbon",
    certifications: ["Filters NSF certified (per maker)"],
    certShort: "NSF certified filters",
    warranty: "1-year limited warranty",
    waterType: "both",
    priceLow: 548,
    priceHigh: 550,
    annualFilterCost: 140,
    filterLife: "100,000 gal; cartridges every 6–12 mo",
    query: "Express Water whole house water filter heavy metal 3 stage",
    asin: "B01LFMTYBM",
    bestFor: "Best budget heavy-metal system — KDF + anti-scale with gauges on every stage",
    pros: [
      "KDF media specifically targets heavy metals (lead, iron, nickel)",
      "Pressure gauges on every stage — you can see when a cartridge is clogging",
      "Stainless stand and pressure-release buttons make cartridge swaps easy",
      "Polyphosphate stage fights scale without a softener",
    ],
    cons: [
      "100,000-gallon capacity means yearly cartridge costs like other Big Blue systems",
      "Maker's 'NSF certified' claim needs the specific standard checked on the listing",
      "Bulkier footprint than wall-mount cartridge systems",
    ],
    score: 8.1,
    scores: { filtration: 8, flow: 9, value: 8 },
    verdict:
      "Express Water's Heavy Metal system is the tinkerer's budget pick: KDF for metals, anti-scale for hardness, and gauges that tell you exactly when to change cartridges. Solid value if you want visibility into your system.",
    sources: [
      "https://www.amazon.com/dp/B01LFMTYBM/",
      "https://slickdeals.net/f/16971262-express-water-ultimate-protection-heavy-metal-antiscale-whole-house-water-filter-3-stage-filtration-system-440-free-shipping",
    ],
  },
  {
    id: "apec-cb3",
    name: "APEC CB3-SED-KDF-CAB20-BB Whole House Water Filter",
    shortName: "CB3 Big Blue",
    brand: "APEC",
    tier: "budget",
    releaseYear: 2018,
    flowRateGpm: 12,
    capacityGallons: 100000,
    media: "3-stage 20\"x4.5\" Big Blue: pleated sediment + KDF85 + sediment/carbon 2-in-1",
    mediaShort: "Sediment + KDF85 + carbon",
    certifications: ["Housings: industry-standard Big Blue"],
    certShort: "Standard Big Blue housings",
    warranty: "1-year limited warranty",
    waterType: "both",
    annualFilterCost: 220,
    filterLife: "100,000 gal; replacement set ~$220",
    specNotes: ["System street price was not verifiable at research time — check the current price on Amazon."],
    query: "APEC CB3 whole house water filter",
    asin: "B07YYPWM19",
    bestFor: "Best for iron-heavy well water on a budget — KDF85 targets iron, lead and H2S",
    pros: [
      "KDF85 stage is strong on iron, lead, hydrogen sulfide and heavy metals",
      "Washable pleated sediment pre-filter extends cartridge life",
      "Industry-standard 20\"x4.5\" housings — cartridges available everywhere",
      "From APEC, a long-established US water filtration maker",
    ],
    cons: [
      "Replacement set runs about $220 — the priciest upkeep among budget systems",
      "No whole-system contaminant certifications published",
      "System price fluctuates; verify before comparing",
    ],
    score: 8.0,
    scores: { filtration: 8, flow: 8, value: 7 },
    verdict:
      "APEC's Big Blue 3-stage is the well-water budget pick: KDF85 handles iron and sulfur smells that plain carbon can't. Budget the $220 replacement set honestly and it's a capable system.",
    sources: [
      "https://www.amazon.com/dp/B07YYPWM19/",
      "https://www.apecwater.com/products/apec-20-whole-house-sediment-kdf-carbon-replacement-filter-set-for-cb3-sed-kdf-cab20-bb",
    ],
  },
  {
    id: "pelican-pse2000",
    name: "Pelican PSE2000 Filter + Salt-Free Conditioner",
    shortName: "PSE2000",
    brand: "Pelican (Pentair)",
    tier: "premium",
    releaseYear: 2017,
    flowRateGpm: 15,
    capacityGallons: 1324800,
    media: "GAC + KDF-55 carbon tank + 5-micron sediment pre-filter + NaturSoft salt-free scale conditioning tank",
    mediaShort: "Carbon + salt-free conditioner",
    certifications: ["NaturSoft scale prevention third-party tested (99.6% effective per maker)"],
    certShort: "Third-party scale testing",
    warranty: "Limited lifetime on tanks; 5-year performance guarantee",
    waterType: "both",
    priceLow: 2599,
    priceHigh: 3099,
    annualFilterCost: 60,
    filterLife: "~1.3M gal / 5 yrs media; sediment every 6–9 mo",
    query: "Pelican PSE2000 whole house water filter",
    bestFor: "Best filter + softener-alternative combo — chlorine filtration and scale control in one",
    pros: [
      "Combines whole-house carbon filtration with salt-free scale conditioning — no separate softener",
      "15 GPM with a 1.3M-gallon treatment capacity suits 4–6 bathroom homes",
      "No salt, no electricity, no drain, no wastewater",
      "NaturSoft scale prevention is third-party tested at 99.6% effectiveness",
    ],
    cons: [
      "Premium price — $2,599+ before installation",
      "Conditions scale rather than removing hardness minerals — not a true softener",
      "Two-tank footprint needs real utility-room space",
    ],
    score: 8.3,
    scores: { filtration: 8, flow: 9, value: 7 },
    verdict:
      "The PSE2000 is for homes that want one system to do two jobs: filter chlorine and tame hard-water scale without salt. It's expensive, and it's a conditioner not a softener — but as a combo it's the most complete package here.",
    sources: [
      "https://healthierelements.com/products/pelican-whole-house-filter-water-softener-alternative",
      "https://watertechadvice.com/pelican-pse2000-review/",
    ],
  },
  {
    id: "softpro-chlorine-fluoride",
    name: "SoftPro Chlorine+ Fluoride SUPER Filter",
    shortName: "Chlorine+ Fluoride",
    brand: "SoftPro",
    tier: "mid",
    releaseYear: 2021,
    flowRateGpm: 10,
    capacityGallons: 1000000,
    media: "Upflow catalytic carbon + bone char dual media; targets chloramine, chlorine, fluoride, PFAS",
    mediaShort: "Catalytic carbon + bone char",
    certifications: ["Upflow design for maximum media contact (per maker)"],
    certShort: "Catalytic carbon + bone char",
    warranty: "Lifetime warranty",
    waterType: "city",
    priceLow: 1267,
    priceHigh: 1267,
    annualFilterCost: 40,
    filterLife: "1,000,000 gal",
    query: "SoftPro whole house chlorine fluoride filter",
    bestFor: "Best for fluoridated city water — bone char targets fluoride where carbon can't",
    pros: [
      "Bone char stage adsorbs fluoride — something standard carbon filters can't do",
      "Catalytic carbon handles chloramine, which regular carbon struggles with",
      "Million-gallon media rating with a lifetime warranty",
      "Upflow design maximizes contaminant contact time",
    ],
    cons: [
      "Niche pick — overkill if your city doesn't fluoridate",
      "No published independent certification marks found",
      "10 GPM is mid-pack for the price",
    ],
    score: 8.4,
    scores: { filtration: 9, flow: 8, value: 8 },
    verdict:
      "The rare whole-house filter that actually targets fluoride, via bone char. If your water report shows fluoride and chloramine, this is the most direct answer. If not, the SpringWell CF1 does the rest for less.",
    sources: [
      "https://softprowatersystems.com/products/whole-house-upflow-catalytic-bone-char-carbon-water-filter",
      "https://www.youtube.com/watch?v=CYGED9GOmA0",
    ],
  },
  {
    id: "springwell-lcr",
    name: "SpringWell LCR Whole House Lead & Cyst Filter",
    shortName: "LCR",
    brand: "SpringWell",
    tier: "premium",
    releaseYear: 2022,
    flowRateGpm: 8,
    capacityGallons: 100000,
    media: "Ultra-dense 2-stage carbon block; rated 99.95% lead reduction plus cysts",
    mediaShort: "Carbon block, lead + cyst",
    certifications: [
      "Components certified to NSF/ANSI 53",
      "Rated 99.95% lead reduction (per maker)",
    ],
    certShort: "NSF/ANSI 53 components",
    warranty: "Lifetime on tank and housings",
    waterType: "city",
    priceLow: 1544,
    priceHigh: 1544,
    annualFilterCost: 400,
    filterLife: "100,000 gal per cartridge set",
    specNotes: ["The ~$400/yr cartridge cost is the highest upkeep in our guide — price it into your decision."],
    query: "SpringWell LCR whole house lead filter",
    bestFor: "Best for lead concerns — purpose-built for old pipes and city infrastructure",
    pros: [
      "Purpose-built for lead: 99.95% reduction of soluble and particulate lead",
      "Also targets microbial cysts most whole-house filters ignore",
      "8 GPM keeps up with small to mid-size homes",
      "Lifetime warranty on tank and housings",
    ],
    cons: [
      "~$400/yr in replacement cartridges — the steepest upkeep here",
      "100,000-gallon capacity means cartridge swaps, not a decade of neglect",
      "Overkill (and overpriced) if lead isn't your problem — test first",
    ],
    score: 8.2,
    scores: { filtration: 10, flow: 7, value: 6 },
    verdict:
      "The LCR exists for one job — lead — and does it better than any general whole-house filter. In an old home with lead service lines, it's worth every penny. For everyone else, it's the wrong system.",
    sources: [
      "https://qualitywaterlab.com/whole-house/springwell-lead-cyst-removal-system/",
    ],
  },
];

export function getModel(id: string): FilterModel {
  const m = MODELS.find((m) => m.id === id);
  if (!m) throw new Error(`Unknown model id "${id}"`);
  return m;
}

export function formatMoney(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

/** "~$1,144–$1,160" or "Check price" when unverified. */
export function formatPrice(m: FilterModel): string {
  if (m.priceLow == null) return "Check price";
  if (m.priceHigh != null && m.priceHigh !== m.priceLow)
    return `~${formatMoney(m.priceLow)}–${formatMoney(m.priceHigh)}`;
  return `~${formatMoney(m.priceLow)}`;
}

export function formatGallons(n: number): string {
  return n.toLocaleString("en-US") + " gal";
}

export const PRICE_TIERS = [
  { sym: "$", label: "Budget", range: "under ~$600", level: 1 },
  { sym: "$$", label: "Mid-range", range: "~$600–$1,300", level: 2 },
  { sym: "$$$", label: "Premium", range: "~$1,300–$2,200", level: 3 },
  { sym: "$$$$", label: "Flagship", range: "over ~$2,200", level: 4 },
] as const;
export type PriceTier = (typeof PRICE_TIERS)[number];

export function priceTier(m: FilterModel): PriceTier | null {
  if (m.priceLow == null) return null;
  if (m.priceLow < 600) return PRICE_TIERS[0];
  if (m.priceLow < 1300) return PRICE_TIERS[1];
  if (m.priceLow < 2200) return PRICE_TIERS[2];
  return PRICE_TIERS[3];
}
