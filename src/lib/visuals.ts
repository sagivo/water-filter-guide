/**
 * Charts and diagrams rendered to HTML strings at build time, so they work both
 * in Astro pages (via <Visual />) and inside markdown (via `[[chart:flow]]`
 * placeholders, see rehype-visuals.ts). Hover/focus tooltips come from the
 * global [data-tip] handler in BaseLayout.
 *
 * Palette: tank systems = #0e7fb8, cartridge systems = #0d9488.
 * Text always uses ink tokens.
 */
import { MODELS, priceTier, formatPrice, type FilterModel } from "../data/models";

const TANK = "#0e7fb8";
const CART = "#0d9488";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function figure(title: string, sub: string, body: string, note?: string) {
  return `<figure class="viz">
  <figcaption class="viz-head"><strong>${esc(title)}</strong><span>${esc(sub)}</span></figcaption>
  ${body}
  ${note ? `<p class="viz-note">${note}</p>` : ""}
</figure>`;
}

/** Horizontal bar chart of rated service flow, tank vs cartridge systems. */
export function flowChart(models: FilterModel[] = MODELS): string {
  const rows = [...models].sort((a, b) => b.flowRateGpm - a.flowRateGpm || a.shortName.localeCompare(b.shortName));
  const max = 20;
  const ticks = [0, 5, 10, 15, 20];
  const legend = `<div class="viz-legend" aria-hidden="true">
    <span><i style="background:${TANK}"></i>Tank system</span>
    <span><i style="background:${CART}"></i>Cartridge system</span>
  </div>`;
  const bars = rows
    .map((m) => {
      const tank = m.capacityGallons >= 500000;
      return `<a class="hbar" href="/filters/${m.id}/" data-tip-value="${m.flowRateGpm} GPM service flow" data-tip-label="${esc(m.shortName)} · ${tank ? "tank" : "cartridge"}">
      <span class="hbar-label">${esc(m.shortName)}</span>
      <span class="hbar-track"><span class="hbar-fill" style="width:${(m.flowRateGpm / max) * 100}%;background:${tank ? TANK : CART}"></span></span>
      <span class="hbar-val">${m.flowRateGpm} GPM</span>
    </a>`;
    })
    .join("");
  const axis = `<div class="hbar-axis" aria-hidden="true"><span></span><span class="hbar-ticks">${ticks
    .map((t) => `<i style="left:${(t / max) * 100}%">${t}</i>`)
    .join("")}</span><span></span></div>`;
  return figure(
    "Rated service flow by system",
    "Gallons per minute, manufacturer ratings. Size for your peak demand, not the average.",
    `${legend}<div class="hbar-chart" role="list">${bars}</div>${axis}`,
    `Most homes need 8–12 GPM at peak (showers + dishwasher + laundry). Use the <a href="/tools/flow-sizer/">flow-rate sizer</a> to match your bathrooms.`
  );
}

/** Scatter: Guide score vs upfront price. Single series, priced models only. */
export function valueChart(models: FilterModel[] = MODELS): string {
  const priced = models.filter((m) => m.priceLow != null);
  const xMax = 10;
  const yMax = 3200;
  const labels: Record<string, "right" | "left" | "above" | "below"> = {
    "springwell-cf1": "above",
    "ispring-wgb32b": "right",
    "aquasana-healthshield": "left",
    "pelican-pse2000": "below",
    "kind-e1000": "right",
  };
  const dots = priced
    .map((m) => {
      const x = (m.score / xMax) * 100;
      const y = (m.priceLow! / yMax) * 100;
      const label = labels[m.id] ? `<span class="sc-lbl ${labels[m.id]}">${esc(m.shortName)}</span>` : "";
      return `<a class="sc-dot" href="/filters/${m.id}/" style="left:${x}%;bottom:${y}%" data-tip-value="${formatPrice(m)} · score ${m.score.toFixed(1)}/10" data-tip-label="${esc(m.shortName)}" aria-label="${esc(m.shortName)}: ${formatPrice(m)}, score ${m.score.toFixed(1)}"><i></i>${label}</a>`;
    })
    .join("");
  const yTicks = [0, 800, 1600, 2400, 3200];
  const xTicks = [7, 8, 9, 10];
  const grid =
    yTicks.map((t) => `<span class="sc-gy" style="bottom:${(t / yMax) * 100}%"><em>$${t.toLocaleString()}</em></span>`).join("") +
    xTicks.map((t) => `<span class="sc-gx" style="left:${(t / xMax) * 100}%"><em>${t}</em></span>`).join("");
  return figure(
    "Guide score vs. upfront price",
    "Each dot is one system. Up and to the right is better — but the sticker price isn't the whole story.",
    `<div class="sc-wrap"><div class="sc-plot">${grid}${dots}</div><div class="sc-xlab">Guide score (out of 10)</div></div>`,
    `Cartridge systems look cheap until you add yearly filter packs. Run the <a href="/tools/cost-calculator/">5-year cost calculator</a> before deciding.`
  );
}

/** 5-year cost comparison: upfront + annual filter cost × 5. */
export function costChart(models: FilterModel[] = MODELS): string {
  const rows = models
    .filter((m) => m.priceLow != null && m.annualFilterCost != null)
    .map((m) => ({ m, total: m.priceLow! + m.annualFilterCost! * 5 }))
    .sort((a, b) => a.total - b.total);
  const max = Math.max(...rows.map((r) => r.total));
  const bars = rows
    .map(({ m, total }) => {
      const upfront = (m.priceLow! / max) * 100;
      const upkeep = ((m.annualFilterCost! * 5) / max) * 100;
      return `<a class="hbar" href="/filters/${m.id}/" data-tip-value="~$${total.toLocaleString()} over 5 years" data-tip-label="${esc(m.shortName)}">
      <span class="hbar-label">${esc(m.shortName)}</span>
      <span class="hbar-track"><span class="hbar-fill" style="width:${upfront}%;background:${TANK}"></span><span class="hbar-fill" style="width:${upkeep}%;background:${CART}"></span></span>
      <span class="hbar-val">~$${total.toLocaleString()}</span>
    </a>`;
    })
    .join("");
  const legend = `<div class="viz-legend" aria-hidden="true">
    <span><i style="background:${TANK}"></i>Upfront</span>
    <span><i style="background:${CART}"></i>5 yrs of filters</span>
  </div>`;
  return figure(
    "True 5-year cost by system",
    "Upfront price plus five years of replacement filters. Estimates — verify current prices.",
    `${legend}<div class="hbar-chart" role="list">${bars}</div>`,
    `The cheapest sticker price rarely wins. See the <a href="/tools/cost-calculator/">cost calculator</a> for the full math.`
  );
}

export const VISUALS: Record<string, () => string> = {
  "chart:flow": () => flowChart(),
  "chart:value": () => valueChart(),
  "chart:cost": () => costChart(),
};
