import { BigNum, Chip, Counter, Head, Rv, Slide } from "../components/ui";
import { BUDGET } from "../data";

export function Budget() {
  return (
    <Slide id="s-budget" title="Budget & Scaling Strategy" chapter="10">
      <BigNum n="10" />
      <Head
        n="10"
        label="Budget & Scaling Strategy"
        title={["Performance earns", "the budget."]}
        sub={null}
      />

      <div className="relative z-10 mb-5 grid gap-5 lg:grid-cols-12">
        <Rv d={2} className="glass rounded-3xl border-lime/30 p-6 sm:p-8 lg:col-span-4">
          <div className="mono text-[10.5px] uppercase tracking-[0.22em] text-ink/50">Current total daily budget</div>
          <div className="display mt-4 text-[clamp(4rem,8vw,7.5rem)] leading-[0.85] text-lime">
            <Counter to={300} prefix="≈RM" />
          </div>
          <div className="mono mt-3 text-[11px] uppercase tracking-[0.2em] text-ink/50">per day</div>
        </Rv>
        <div className="flex flex-col gap-4 lg:col-span-8">
          <Rv d={3} className="glass rounded-3xl p-6 text-[14.5px] leading-relaxed text-ink/70">
            Equal allocation across all five campaigns would not be the right approach — budget should be distributed based on demonstrated performance and the specific actions each campaign requires this month.
          </Rv>
          <Rv d={4} className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 text-[14.5px] leading-relaxed text-ink/65">
            <b className="text-ink">What we know and what we do not:</b> exact campaign-level budget allocation requires visibility into daily spend history, current learning-phase status, and campaign-level budget caps — data not included in the 30-day summary provided. The guidance below reflects principles and direction rather than precise RM/day figures for each campaign.
          </Rv>
        </div>
      </div>

      <Rv d={5} className="glass relative z-10 overflow-hidden rounded-3xl">
        <div className="overflow-x-auto">
          <div className="min-w-[860px]">
            <div className="grid grid-cols-[1fr_1.6fr_0.7fr_2fr] border-b border-white/10 bg-white/[0.04]">
              {["Campaign", "October Direction", "Priority", "Rationale"].map((h) => (
                <div key={h} className="mono px-4 py-3.5 text-[10px] uppercase tracking-[0.18em] text-ink/50">
                  {h}
                </div>
              ))}
            </div>
            {BUDGET.map((b) => (
              <div key={b.campaign} className="grid grid-cols-[1fr_1.6fr_0.7fr_2fr] items-center border-b border-white/[0.06] transition hover:bg-white/[0.035]">
                <div className="display px-4 py-4 text-[19px] tracking-normal text-ink" style={{ fontStretch: "85%" }}>{b.campaign}</div>
                <div className="px-4 py-4 text-[14px] leading-snug text-ink/80">{b.direction}</div>
                <div className="px-4 py-4">
                  <Chip tone={b.tone}>{b.priority}</Chip>
                </div>
                <div className="px-4 py-4 text-[13.5px] leading-snug text-ink/60">{b.rationale}</div>
              </div>
            ))}
          </div>
        </div>
      </Rv>

      <div className="relative z-10 mt-5 grid gap-5 md:grid-cols-2">
        <Rv d={6} className="rounded-3xl border border-lime/30 bg-lime/[0.06] p-6">
          <div className="mono mb-2 text-[10.5px] uppercase tracking-[0.22em] text-lime">Core principle</div>
          <p className="text-[15px] leading-relaxed text-ink/80">
            Budget increases should follow performance improvements, not precede them. When a campaign demonstrates a measurable improvement in ATC rate or purchase CVR, that is the signal to increase spend — not an assumption that more budget will fix an underperforming funnel.
          </p>
        </Rv>
        <Rv d={7} className="glass rounded-3xl p-6">
          <div className="mono mb-2 text-[10.5px] uppercase tracking-[0.22em] text-lime">Testing budget</div>
          <div className="flex items-center gap-4">
            <div className="display text-[clamp(2rem,3.4vw,3.2rem)] leading-none text-ink">RM20–30<span className="text-ink/40">/day</span></div>
          </div>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink/65">
            A dedicated creative test budget — separate from the main campaign structure. This allows new creatives to be evaluated at low spend before being rolled into active campaigns. Mixing untested creatives into high-spend campaigns without isolation makes it difficult to read what is working.
          </p>
        </Rv>
      </div>
    </Slide>
  );
}
