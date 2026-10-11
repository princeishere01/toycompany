import { Arrow, BigNum, Head, Rv, Slide } from "../components/ui";
import { PATH } from "../data";

export function PathTo4x() {
  return (
    <Slide id="s-path" title="The Path to 4x ROAS" chapter="09">
      <BigNum n="09" />
      <Head
        n="09"
        label="The Path to 4x ROAS"
        title={["Compounding", "every stage."]}
        sub="The 4x ROAS target is not achieved by changing one number. It is the result of compounding improvements across every stage of the funnel, from how cheap it is to reach an audience, through to how many of those visitors convert into buyers and at what order value. The table below maps each lever to where it fits in that chain."
      />

      <div className="relative z-10 grid gap-5 lg:grid-cols-12">
        <Rv d={3} className="glass overflow-hidden rounded-3xl lg:col-span-8">
          <div className="overflow-x-auto">
            <div className="min-w-[780px]">
              <div className="grid grid-cols-[1.35fr_0.85fr_28px_1fr_2.3fr] border-b border-white/10 bg-white/[0.04]">
                {["Funnel Lever", "Current", "", "Target", "Why It Matters"].map((h, i) => (
                  <div key={i} className="mono px-4 py-3.5 text-[10px] uppercase tracking-[0.18em] text-ink/50">
                    {h}
                  </div>
                ))}
              </div>
              {PATH.map((p, i) => {
                const roas = p.lever === "ROAS";
                return (
                  <div
                    key={p.lever}
                    className={`grid grid-cols-[1.35fr_0.85fr_28px_1fr_2.3fr] items-center border-b border-white/[0.06] transition hover:bg-white/[0.035] ${roas ? "bg-lime/[0.09]" : ""}`}
                  >
                    <div className="px-4 py-3 text-[14.5px] font-semibold text-ink">
                      <span className="mono mr-2 text-[10px] text-lime/70">{String(i + 1).padStart(2, "0")}</span>
                      {p.lever}
                    </div>
                    <div className="display px-4 py-3 text-[17px] tracking-normal text-ink/60" style={{ fontStretch: "85%" }}>
                      {p.current}
                    </div>
                    <Arrow className="h-4 w-4 text-lime/70" />
                    <div className={`display px-4 py-3 tracking-normal text-lime ${roas ? "text-[24px]" : "text-[17px]"}`} style={{ fontStretch: "85%" }}>
                      {p.target}
                    </div>
                    <div className="px-4 py-3 text-[13px] leading-snug text-ink/65">{p.why}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Rv>

        <div className="flex flex-col gap-4 lg:col-span-4">
          <Rv d={4} className="glass rounded-3xl p-6 text-[14.5px] leading-relaxed text-ink/70">
            <b className="text-ink">No single improvement will get us to 4x.</b> But a 20% improvement in CTR, a meaningful improvement in ATC rate, better checkout completion, and a modest lift in average order value through bundles can compound to produce a dramatically different ROAS outcome. The two campaigns already performing at 4%+ purchase CVR are living proof that the destination is reachable.
          </Rv>
          <Rv d={5} className="rounded-3xl border border-lime/30 bg-lime/[0.07] p-6 text-[14.5px] leading-relaxed text-ink/75">
            <div className="mono mb-2 text-[10.5px] uppercase tracking-[0.22em] text-lime">AOV — the fastest route</div>
            AOV is often the fastest route to ROAS improvement. If a buyer purchases two products instead of one, revenue doubles without any change to ad spend, conversion rate, or CPC. This is why bundle and gifting offer testing is built into both the October and November roadmap.
          </Rv>
        </div>
      </div>
    </Slide>
  );
}
