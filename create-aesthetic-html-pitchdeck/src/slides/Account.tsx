import { BigNum, Counter, Head, Rv, Slide, dly } from "../components/ui";
import { ACCOUNT as A } from "../data";

export function AccountGrid() {
  const hero = [
    { k: "Total Ad Spend", n: <Counter to={A.spend} decimals={2} prefix="RM" /> },
    { k: "Total Purchases", n: <Counter to={A.purchases} /> },
    { k: "Total Revenue (Purchase Conversion Value)", n: <Counter to={A.revenue} prefix="RM" /> },
    { k: "Overall ROAS", n: <Counter to={A.roas} decimals={2} suffix="x" />, accent: true },
  ];
  const small = [
    { k: "Overall CPA (Cost per Purchase)", n: <Counter to={A.cpa} decimals={2} prefix="RM" /> },
    { k: "Total Impressions", n: <Counter to={A.impressions} /> },
    { k: "Total Link Clicks", n: <Counter to={A.clicks} /> },
    { k: "Overall CPM", n: <Counter to={A.cpm} decimals={2} prefix="RM" /> },
    { k: "Overall Link CPC", n: <Counter to={A.cpc} decimals={2} prefix="RM" /> },
    { k: "Overall Link CTR", n: <Counter to={A.ctr} decimals={2} suffix="%" /> },
    { k: "Total Landing Page Views (LPV)", n: <Counter to={A.lpv} /> },
    { k: "LPV / Click Rate", n: <Counter to={A.lpvRate} decimals={2} suffix="%" /> },
    { k: "Total Add to Carts", n: <Counter to={A.atc} /> },
    { k: "ATC Rate (ATC ÷ LPV)", n: <Counter to={A.atcRate} decimals={2} suffix="%" /> },
    { k: "Total Checkouts Initiated", n: <Counter to={A.checkouts} /> },
    { k: "ATC → Checkout Rate", n: <Counter to={A.atcCheckout} decimals={2} suffix="%" /> },
    { k: "Checkout → Purchase Rate", n: <Counter to={A.checkoutPurchase} decimals={2} suffix="%" /> },
    { k: "Purchase CVR (Purchases ÷ LPV)", n: <Counter to={A.cvr} decimals={2} suffix="%" /> },
  ];
  return (
    <Slide id="s-account" title="Current Account Performance" chapter="02">
      <BigNum n="02" />
      <Head
        n="02"
        label="Current Account Performance"
        title={["Account totals,", "30 days."]}
        sub="All figures below have been independently calculated from campaign-level data and verified against the account totals. Every metric reconciles correctly."
      />
      <div className="relative z-10 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {hero.map((h, i) => (
          <Rv
            key={h.k}
            d={2 + i}
            className={`glass spot rounded-3xl p-5 sm:p-7 ${h.accent ? "!border-lime/40 bg-lime/[0.07]" : ""}`}
          >
            <div className="mono text-[10px] uppercase leading-snug tracking-[0.18em] text-ink/50">{h.k}</div>
            <div
              className={`display mt-5 text-[clamp(2rem,4.2vw,4.4rem)] leading-[0.9] ${h.accent ? "text-lime" : "text-ink"}`}
            >
              {h.n}
            </div>
          </Rv>
        ))}
      </div>
      <div className="relative z-10 mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-4 lg:grid-cols-7 lg:gap-4">
        {small.map((s, i) => (
          <Rv key={s.k} d={5 + (i % 7)} className="spot rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <div className="mono min-h-[2.6em] text-[9.5px] uppercase leading-snug tracking-[0.14em] text-ink/45">{s.k}</div>
            <div className="display mt-3 text-[clamp(1.35rem,2vw,1.9rem)] leading-none text-ink">{s.n}</div>
          </Rv>
        ))}
      </div>
    </Slide>
  );
}

export function AccountFunnel() {
  const stages = [
    { k: "Impressions", v: A.impressions },
    { k: "Link Clicks", v: A.clicks },
    { k: "Landing Page Views", v: A.lpv },
    { k: "Add to Carts", v: A.atc },
    { k: "Checkouts Initiated", v: A.checkouts },
    { k: "Purchases", v: A.purchases },
  ];
  const rates = [
    { k: "Link CTR", v: "1.03%", f: "Link Clicks ÷ Impressions" },
    { k: "LPV / Click", v: "75.62%", f: "LPV ÷ Link Clicks" },
    { k: "ATC Rate", v: "14.40%", f: "ATC ÷ LPV" },
    { k: "ATC → Checkout", v: "43.31%", f: "Checkouts ÷ ATC" },
    { k: "Checkout → Purchase", v: "37.08%", f: "Purchases ÷ Checkouts" },
  ];
  const max = Math.log10(stages[0].v);
  return (
    <Slide id="s-funnel" title="The Account Funnel" chapter="02">
      <BigNum n="↓" className="!text-[clamp(10rem,30vw,32rem)]" />
      <Head
        n="02"
        label="The Account Funnel"
        title={["736,229 impressions.", "132 purchases."]}
        size="text-[clamp(2.4rem,6.4vw,6rem)]"
      />
      <div className="relative z-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {stages.map((s, i) => {
            const w = (Math.log10(s.v) / max) * 100;
            const last = i === stages.length - 1;
            return (
              <div key={s.k}>
                <Rv d={2 + i} className="grid grid-cols-[88px_1fr] items-center gap-3 sm:grid-cols-[150px_1fr_130px] sm:gap-5">
                  <div className="mono text-[10px] uppercase leading-snug tracking-[0.18em] text-ink/55">
                    <span className="text-lime">0{i + 1}</span>
                    <br />
                    {s.k}
                  </div>
                  <div className="relative h-11 sm:h-12">
                    <div
                      className="grow-x absolute inset-y-0 left-1/2 -translate-x-1/2 rounded-xl"
                      style={{
                        ...dly(i + 2),
                        width: `${w}%`,
                        transformOrigin: "center",
                        background: last
                          ? "linear-gradient(90deg,#c8ff2e,#9be000)"
                          : `linear-gradient(90deg, rgba(243,241,234,${0.16 - i * 0.015}), rgba(243,241,234,${0.07}))`,
                        boxShadow: last ? "0 0 40px rgba(200,255,46,.45)" : "none",
                        border: last ? "none" : "1px solid rgba(255,255,255,.12)",
                      }}
                    />
                  </div>
                  <div className={`display hidden text-right text-[clamp(1.6rem,2.4vw,2.4rem)] leading-none sm:block ${last ? "text-lime" : "text-ink"}`}>
                    <Counter to={s.v} />
                  </div>
                </Rv>
                <div className={`display -mt-1 mb-1 text-right text-2xl leading-none sm:hidden ${last ? "text-lime" : "text-ink"}`}>
                  {s.v.toLocaleString("en-US")}
                </div>
                {!last && (
                  <Rv d={3 + i} className="my-1.5 grid grid-cols-[88px_1fr] items-center gap-3 sm:grid-cols-[150px_1fr_130px] sm:gap-5">
                    <div />
                    <div className="flex items-center justify-center gap-3">
                      <span className="h-5 w-px bg-white/20" />
                      <span className="mono rounded-full border border-lime/30 bg-lime/[0.08] px-3 py-1 text-[10.5px] uppercase tracking-[0.14em] text-lime">
                        {rates[i].k} · {rates[i].v}
                      </span>
                      <span className="mono hidden text-[10px] text-ink/35 md:inline">{rates[i].f}</span>
                    </div>
                    <div />
                  </Rv>
                )}
              </div>
            );
          })}
          <Rv d={9} className="mono mt-5 text-[10px] uppercase tracking-[0.2em] text-ink/35">
            Bars are drawn on a log scale so every stage stays visible.
          </Rv>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-4">
          <Rv d={3} className="glass rounded-3xl border-lime/30 p-6">
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-ink/50">Purchase CVR (Purchases ÷ LPV)</div>
            <div className="display mt-3 text-[clamp(4rem,7vw,6.5rem)] leading-[0.85] text-lime">
              <Counter to={A.cvr} decimals={2} suffix="%" />
            </div>
          </Rv>
          <div className="grid grid-cols-2 gap-4">
            <Rv d={4} className="glass rounded-2xl p-5">
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-ink/50">Overall CPM</div>
              <div className="display mt-2 text-3xl text-ink">RM19.13</div>
            </Rv>
            <Rv d={5} className="glass rounded-2xl p-5">
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-ink/50">Link CPC</div>
              <div className="display mt-2 text-3xl text-ink">RM1.87</div>
            </Rv>
          </div>
          <Rv d={6} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-[14px] leading-relaxed text-ink/65">
            <b className="text-ink">Data integrity note:</b> All totals above reconcile precisely with the sum of individual campaign figures. One discrepancy was identified and is noted in Section 5.3 (Baby Campaign CPA). Independent calculations are used throughout this report.
          </Rv>
        </div>
      </div>
    </Slide>
  );
}
