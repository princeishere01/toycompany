import type { ReactNode } from "react";
import { BigNum, CheckIcon, Counter, Head, Rv, Slide, dly } from "../components/ui";
import { AUDIT } from "../data";
import type { Check } from "../data";

function Checklist({
  num,
  title,
  intro,
  items,
  d = 2,
  tag,
}: {
  num: string;
  title: string;
  intro: ReactNode;
  items: Check[];
  d?: number;
  tag?: string;
}) {
  return (
    <Rv d={d} className="glass rounded-3xl p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mono text-[11px] tracking-[0.2em] text-lime">{num}</div>
          <h3 className="display mt-2 text-[clamp(1.7rem,2.6vw,2.5rem)] leading-[0.95] text-ink">{title}</h3>
        </div>
        {tag && (
          <span className="mono rounded-full border border-coral/40 bg-coral/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-coral">
            {tag}
          </span>
        )}
      </div>
      <p className="mt-4 text-[14.5px] leading-relaxed text-ink/60">{intro}</p>
      <ul className="mt-5 space-y-1">
        {items.map((it) => (
          <li key={it.title} className="group flex gap-3.5 border-t border-white/[0.08] py-3.5">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-lime/40 bg-lime/10 text-lime transition group-hover:bg-lime group-hover:text-void">
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
            <div>
              <div className="text-[15px] font-semibold text-ink">{it.title}</div>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink/60">{it.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </Rv>
  );
}

export function AuditIntro() {
  const issues = [
    { n: "A", t: "A global site problem", b: "would suppress performance across all campaigns equally." },
    { n: "B", t: "A product-page problem", b: "affects individual campaigns." },
    { n: "C", t: "A checkout problem", b: "may affect specific products depending on pricing, weight, or regional shipping rules." },
  ];
  const bars = [
    { name: "Must-Run Sale", v: 0.41, c: "#ff4d2e" },
    { name: "Flash Cards", v: 4.82, c: "#c8ff2e" },
  ];
  return (
    <Slide id="s-audit" title="Website & Funnel Audit" chapter="06">
      <BigNum n="06" />
      <Head
        n="06"
        label="Website & Funnel Audit Recommendations"
        title={["One website.", "Two very different", "results."]}
        sub="All five campaigns send traffic to the same website. However, the data shows purchase CVRs ranging from 0.41% (Must-Run Sale) to 4.82% (Flash Cards) — more than a tenfold difference. This proves that the website is not fundamentally broken. The variation is campaign- and product-specific."
        size="text-[clamp(2.4rem,6.2vw,5.8rem)]"
      />

      <div className="relative z-10 grid gap-5 lg:grid-cols-12">
        <Rv d={3} className="glass rounded-3xl p-6 sm:p-8 lg:col-span-7">
          <div className="mono mb-6 text-[10.5px] uppercase tracking-[0.24em] text-lime">Purchase CVR · same site, same checkout</div>
          <div className="space-y-7">
            {bars.map((b, i) => (
              <div key={b.name}>
                <div className="flex items-baseline justify-between">
                  <span className="text-[16px] font-semibold text-ink">{b.name}</span>
                  <span className="display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-none" style={{ color: b.c }}>
                    <Counter to={b.v} decimals={2} suffix="%" />
                  </span>
                </div>
                <div className="relative mt-3 h-4 rounded-full bg-white/[0.06]">
                  <div
                    className="grow-x absolute inset-y-0 left-0 rounded-full"
                    style={{ ...dly(i + 3), width: `${(b.v / 5) * 100}%`, background: `linear-gradient(90deg,${b.c}55,${b.c})`, boxShadow: `0 0 24px ${b.c}55` }}
                  />
                  <div className="absolute -inset-y-2 w-[2px] bg-ink" style={{ left: "60%" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mono relative mt-3 h-4 text-[9.5px] uppercase tracking-[0.16em] text-ink/50">
            <span className="absolute -translate-x-1/2" style={{ left: "60%" }}>Benchmark 3%+</span>
          </div>
        </Rv>

        <div className="flex flex-col gap-3 lg:col-span-5">
          <Rv d={4} className="mono text-[10.5px] uppercase tracking-[0.24em] text-lime">Three types of website issues</Rv>
          {issues.map((x, i) => (
            <Rv key={x.n} d={5 + i} className="glass spot flex gap-4 rounded-2xl p-5">
              <span className="display text-4xl leading-none text-lime/90">{x.n}</span>
              <div className="text-[14.5px] leading-snug text-ink/65">
                <b className="text-ink">{x.t}</b> {x.b}
              </div>
            </Rv>
          ))}
          <Rv d={8} className="text-[13.5px] text-ink/50">
            The audit that follows reflects that nuance.
          </Rv>
        </div>
      </div>
    </Slide>
  );
}

export function AuditOne() {
  return (
    <Slide id="s-audit-1" title="Audit — Global & Product Page" chapter="6.1 · 6.2">
      <BigNum n="6.1" />
      <Head n="06" label="Audit · Global & Product Page Checks" title={["Rule out the", "site first."]} size="text-[clamp(2.4rem,6vw,5.4rem)]" />
      <div className="relative z-10 grid items-start gap-5 lg:grid-cols-2">
        <Checklist
          num="6.1"
          title="Global Website Checks"
          intro="These items would affect all campaigns if they exist. Rule them out first."
          items={AUDIT.global}
        />
        <Checklist
          num="6.2"
          title="Product Page Checks (Per-Campaign)"
          intro="These checks apply on a product-by-product basis. The Baby and Flash Cards campaigns are converting well, suggesting their product pages are functional and persuasive. Wordament and Tangram/Stacking Stones have lower ATC rates, which makes their specific pages the priority for this audit."
          items={AUDIT.product}
          d={3}
        />
      </div>
    </Slide>
  );
}

export function AuditTwo() {
  return (
    <Slide id="s-audit-2" title="Audit — Checkout & Tracking" chapter="6.3 · 6.4">
      <BigNum n="6.3" />
      <Head n="06" label="Audit · Cart, Checkout & Tracking" title={["Where buyers", "get stuck."]} size="text-[clamp(2.4rem,6vw,5.4rem)]" />
      <div className="relative z-10 grid items-start gap-5 lg:grid-cols-2">
        <Checklist
          num="6.3"
          title="Cart & Checkout Checks"
          tag="Priority: Must-Run, Tangram"
          intro="The Must-Run Sale's 21.28% ATC → Checkout rate and 10% checkout completion make this an urgent audit. The Tangram campaign's 32.86% checkout completion also warrants investigation. The Baby and Flash Cards campaigns check out cleanly at 51.56% and 50.00% ATC → Checkout respectively — use these as a reference for what a healthy checkout flow looks like."
          items={AUDIT.checkout}
        />
        <Checklist
          num="6.4"
          title="Tracking & Attribution Checks"
          intro="Accurate tracking is the foundation of every decision in this strategy. If events are misfiring, the ROAS figures and funnel metrics in this report may not reflect reality."
          items={AUDIT.tracking}
          d={3}
        />
      </div>
    </Slide>
  );
}
