import { BigNum, Head, Rv, Slide } from "../components/ui";
import { KPIS } from "../data";

export function Kpi() {
  const stops = [
    { k: "Current (30-Day)", v: "1.48x", sub: "Where we start", tone: "text-ink" },
    { k: "30-Day Target", v: "1.80–2.20x", sub: "ROAS", tone: "text-lime/80" },
    { k: "60-Day Target", v: "2.50–3.00x", sub: "ROAS", tone: "text-lime" },
    { k: "Q1 2027", v: "4x", sub: "Within reach if momentum is maintained", tone: "text-lime" },
  ];
  return (
    <Slide id="s-kpi" title="KPI Targets — Next 60 Days" chapter="11">
      <BigNum n="11" />
      <Head
        n="11"
        label="KPI Targets — Next 60 Days"
        title={["From 1.48x", "to 2.50–3.00x."]}
        sub="Account-level targets for the next 30 and 60 days. These are realistic improvement benchmarks based on the current funnel baseline and the scope of changes planned. They are directional targets — not guarantees. Actual outcomes will depend on how quickly improvements are implemented and how the market responds."
        size="text-[clamp(2.4rem,6.4vw,6rem)]"
      />

      {/* journey */}
      <Rv d={3} className="relative z-10 mb-6 overflow-x-auto pb-2">
        <div className="relative min-w-[760px] px-2">
          <div className="absolute left-2 right-2 top-[11px] h-px bg-white/15" />
          <div className="grow-x absolute left-2 right-2 top-[10px] h-[3px] rounded-full bg-gradient-to-r from-white/40 via-lime/80 to-lime shadow-[0_0_16px_rgba(200,255,46,.6)]" />
          <div className="relative grid grid-cols-4 gap-4">
            {stops.map((s, i) => (
              <div key={s.k}>
                <span
                  className={`block h-[23px] w-[23px] rounded-full border-2 bg-void ${i === 0 ? "border-ink/60" : "border-lime shadow-[0_0_16px_rgba(200,255,46,.8)]"}`}
                />
                <div className="mono mt-4 text-[10.5px] uppercase tracking-[0.2em] text-ink/50">{s.k}</div>
                <div className={`display mt-1 text-[clamp(2rem,3.6vw,3.6rem)] leading-none ${s.tone}`}>{s.v}</div>
                <div className="mt-1.5 text-[12.5px] text-ink/50">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </Rv>

      <Rv d={4} className="glass relative z-10 overflow-hidden rounded-3xl">
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] border-b border-white/10 bg-white/[0.04]">
              {["KPI", "Current (30-Day)", "30-Day Target", "60-Day Target"].map((h, i) => (
                <div key={h} className={`mono px-4 py-3.5 text-[10px] uppercase tracking-[0.18em] ${i === 3 ? "text-lime" : "text-ink/50"}`}>
                  {h}
                </div>
              ))}
            </div>
            {KPIS.map((k) => (
              <div key={k.kpi} className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center border-b border-white/[0.06] transition hover:bg-white/[0.035]">
                <div className="px-4 py-3 text-[14.5px] font-semibold text-ink">{k.kpi}</div>
                <div className="display px-4 py-3 text-[17px] tracking-normal text-ink/60" style={{ fontStretch: "85%" }}>{k.current}</div>
                <div className="display px-4 py-3 text-[17px] tracking-normal text-ink" style={{ fontStretch: "85%" }}>{k.d30}</div>
                <div className="display px-4 py-3 text-[17px] tracking-normal text-lime" style={{ fontStretch: "85%" }}>{k.d60}</div>
              </div>
            ))}
          </div>
        </div>
      </Rv>

      <Rv d={6} className="relative z-10 mt-5 rounded-3xl border border-lime/30 bg-lime/[0.06] p-6 sm:p-7 text-[14.5px] leading-relaxed text-ink/75">
        <b className="text-ink">On the 4x ROAS objective:</b> achieving 4x ROAS from a 1.48x starting point within 60 days would require a near-perfect execution of every improvement simultaneously — that is not a realistic expectation from a cold start. However, moving from 1.48x to 2.50–3.00x within 60 days is achievable, and that trajectory puts 4x within reach for Q1 2027 if momentum is maintained. This is the correct approach: steady, evidence-based improvement rather than aggressive spend in an unoptimised account.
      </Rv>
    </Slide>
  );
}
