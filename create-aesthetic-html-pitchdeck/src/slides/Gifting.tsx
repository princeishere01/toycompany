import { BigNum, Head, Lines, Rv, Slide } from "../components/ui";
import { GIFT } from "../data";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((t, i) => (
        <li key={i} className="flex gap-4 text-[14.5px] leading-relaxed text-ink/75">
          <span className="display mt-0.5 w-7 shrink-0 text-xl leading-none text-lime">{String(i + 1).padStart(2, "0")}</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export function GiftingA() {
  return (
    <Slide id="s-gift" title="December & Year-End Gifting" chapter="08">
      <BigNum n="08" />
      {/* warm glow */}
      <div className="orb orb-a right-[-10%] top-[10%] h-[40vw] w-[40vw] bg-lime/10" />
      <Head
        n="08"
        label="December & Year-End Gifting Strategy"
        title={["The year-end", "gifting season."]}
        sub={GIFT.intro}
      />
      <div className="relative z-10 grid gap-5 lg:grid-cols-12">
        <Rv d={3} className="glass rounded-3xl p-6 sm:p-8 lg:col-span-7">
          <div className="mb-5 flex items-baseline gap-3">
            <span className="mono text-[11px] tracking-[0.2em] text-lime">8.1</span>
            <h3 className="display text-[clamp(1.6rem,2.4vw,2.3rem)] text-ink">Creative Direction</h3>
          </div>
          <Bullets items={GIFT.creative} />
        </Rv>
        <Rv d={4} className="glass rounded-3xl p-6 sm:p-8 lg:col-span-5">
          <div className="mb-5 flex items-baseline gap-3">
            <span className="mono text-[11px] tracking-[0.2em] text-lime">8.3</span>
            <h3 className="display text-[clamp(1.6rem,2.4vw,2.3rem)] text-ink">Campaign Strategy</h3>
          </div>
          <Bullets items={GIFT.campaign} />
        </Rv>
      </div>
    </Slide>
  );
}

export function GiftingOffers() {
  return (
    <Slide id="s-offers" title="Offer Strategy" chapter="8.2">
      <BigNum n="8.2" />
      <Head n="08" label="Offer Strategy" title={["Lift AOV,", "lift ROAS."]} size="text-[clamp(2.4rem,6.4vw,6rem)]" />
      <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {GIFT.offers.map((o, i) => (
          <Rv key={o.title} d={2 + i} className="glass spot flex flex-col rounded-3xl p-6">
            <div className="display text-[3.4rem] leading-none text-lime/90">0{i + 1}</div>
            <h3 className="display mt-5 text-[clamp(1.5rem,2vw,2rem)] leading-[0.95] text-ink">{o.title}</h3>
            <p className="mt-4 text-[14px] leading-relaxed text-ink/65">{o.body}</p>
          </Rv>
        ))}
      </div>

      {/* tier illustration — figures are the report's examples */}
      <Rv d={7} className="relative z-10 mt-6 overflow-hidden rounded-3xl border border-lime/30 bg-lime/[0.06] p-6 sm:p-8">
        <div className="mono mb-5 text-[10.5px] uppercase tracking-[0.24em] text-lime">Examples from the strategy</div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Spend RM100", "Save RM10"],
            ["Spend RM180", "Save RM25"],
            ["Basket over RM90", "Free shipping"],
          ].map(([a, b]) => (
            <div key={a} className="rounded-2xl border border-white/10 bg-void/50 p-5">
              <div className="mono text-[10.5px] uppercase tracking-[0.2em] text-ink/50">{a}</div>
              <div className="display mt-2 text-[clamp(2rem,3.4vw,3.2rem)] leading-none text-lime">{b}</div>
            </div>
          ))}
        </div>
      </Rv>
    </Slide>
  );
}

export function KeyDates() {
  return (
    <Slide id="s-dates" title="Key Dates to Plan Around" chapter="8.4">
      <BigNum n="8.4" />
      <Head n="08" label="Key Dates to Plan Around" title={["Plan around", "the calendar."]} size="text-[clamp(2.4rem,6.4vw,6rem)]" />

      <div className="relative z-10">
        {/* rail */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-x-0 top-[9px] h-px bg-white/15" />
          <div className="grow-x absolute left-0 top-[8px] h-[3px] w-full rounded-full bg-gradient-to-r from-lime via-lime/70 to-lime/10" />
          <div className="relative grid grid-cols-5">
            {GIFT.dates.map((d) => (
              <div key={d.event} className="flex">
                <span className="h-[19px] w-[19px] rounded-full border-2 border-lime bg-void shadow-[0_0_16px_rgba(200,255,46,.8)]" />
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:mt-6 lg:grid-cols-5">
          {GIFT.dates.map((d, i) => (
            <Rv key={d.event} d={2 + i} className="glass spot rounded-3xl p-5">
              <div className="display text-[clamp(2rem,3vw,2.9rem)] leading-[0.9] text-lime">{d.date}</div>
              <h3 className="mt-4 text-[16px] font-semibold leading-snug text-ink">{d.event}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink/60">{d.body}</p>
            </Rv>
          ))}
        </div>
      </div>
      <Lines className="serif relative z-10 mt-10 text-[clamp(1.4rem,2.4vw,2.2rem)] text-ink/70" d={8} lines={["December is the execution window — not the place for experimentation."]} />
    </Slide>
  );
}
