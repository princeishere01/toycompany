import { BigNum, Head, Rv, Slide } from "../components/ui";
import { METHOD } from "../data";

export function Method() {
  const chain = ["Impressions", "Link Clicks", "LPV", "Add to Cart", "Checkout", "Purchase"];
  return (
    <Slide id="s-method" title="Funnel Analysis Method" chapter="03">
      <BigNum n="03" />
      <Head
        n="03"
        label="Funnel Analysis Method"
        title={["Calculated from", "raw data."]}
        sub="Rather than relying on Meta's exported conversion rate column — which can produce inconsistencies — all funnel metrics in this report are calculated directly from raw data. This method makes it easy to identify exactly which stage of the funnel is underperforming for each campaign."
      />

      {/* chain */}
      <Rv d={3} className="relative z-10 mb-8 overflow-x-auto pb-2">
        <div className="flex min-w-[760px] items-center">
          {chain.map((c, i) => (
            <div key={c} className="flex flex-1 items-center">
              <div className="mono whitespace-nowrap rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[10.5px] uppercase tracking-[0.18em] text-ink">
                {c}
              </div>
              {i < chain.length - 1 && (
                <div className="relative mx-1 h-px flex-1 bg-gradient-to-r from-lime/70 to-lime/20">
                  <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rotate-45 border-r border-t border-lime" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Rv>

      <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {METHOD.map((m, i) => (
          <Rv key={m.metric} d={3 + i} className="glass spot group rounded-3xl p-6 sm:p-7">
            <div className="flex items-start justify-between">
              <div className="display text-[clamp(1.6rem,2.3vw,2.2rem)] leading-none text-ink">{m.metric}</div>
              <div className="mono text-[11px] text-lime">0{i + 1}</div>
            </div>
            <div className="mono mt-6 rounded-xl border border-lime/20 bg-lime/[0.06] px-4 py-3 text-[13px] leading-snug tracking-normal text-lime">
              {m.formula}
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-ink/65">{m.measures}</p>
          </Rv>
        ))}
      </div>
      <Rv d={10} className="relative z-10 mt-8 max-w-3xl text-[15px] text-ink/60">
        This framework is what allows us to pinpoint a specific bottleneck in each campaign and make targeted recommendations — rather than applying generic fixes across the account.
      </Rv>
    </Slide>
  );
}
