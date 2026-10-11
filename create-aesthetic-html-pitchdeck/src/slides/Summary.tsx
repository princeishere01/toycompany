import { BigNum, Counter, Head, Rv, Slide, useInView } from "../components/ui";
import { ACCOUNT } from "../data";

function Gauge() {
  const [ref, inView] = useInView<SVGSVGElement>(0.3);
  const cx = 150;
  const cy = 150;
  const R = 120;
  const pt = (f: number, rr = R) => ({
    x: cx - rr * Math.cos(Math.PI * f),
    y: cy - rr * Math.sin(Math.PI * f),
  });
  const roasF = ACCOUNT.roas / 4;
  const marks = [
    { f: 0.75, label: "3x", sub: "Benchmark" },
    { f: 1, label: "4x", sub: "Target" },
  ];
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <svg ref={ref} viewBox="0 0 300 175" className="w-full overflow-visible">
        <defs>
          <linearGradient id="gg" x1="0" x2="1">
            <stop offset="0" stopColor="#ff4d2e" />
            <stop offset="0.5" stopColor="#ffb224" />
            <stop offset="1" stopColor="#c8ff2e" />
          </linearGradient>
        </defs>
        <path d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" strokeLinecap="round" />
        <path
          d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
          fill="none"
          stroke="url(#gg)"
          strokeWidth="14"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${inView ? roasF * 100 : 0} 100`}
          style={{ transition: "stroke-dasharray 2.2s cubic-bezier(0.16,1,0.3,1) .4s", filter: "drop-shadow(0 0 10px rgba(200,255,46,.35))" }}
        />
        {marks.map((m) => {
          const a = pt(m.f, R - 14);
          const b = pt(m.f, R + 14);
          const l = pt(m.f, R + 30);
          return (
            <g key={m.label}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#f3f1ea" strokeWidth="1.5" />
              <text x={l.x} y={l.y + 3} textAnchor="middle" fill="#f3f1ea" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
                {m.label}
              </text>
            </g>
          );
        })}
        <text x={cx - R} y={cy + 20} textAnchor="middle" fill="#8d8d86" fontSize="8" fontFamily="JetBrains Mono, monospace">0x</text>
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <div className="display text-[clamp(4rem,9vw,8rem)] leading-[0.85] text-lime">
          <Counter to={ACCOUNT.roas} decimals={2} suffix="x" />
        </div>
        <div className="mono mt-2 text-[10.5px] uppercase tracking-[0.28em] text-ink/50">Overall ROAS · vs 4x target</div>
      </div>
    </div>
  );
}

export function Summary() {
  const stats = [
    { k: "Total Ad Spend", node: <Counter to={ACCOUNT.spend} decimals={2} prefix="RM" /> },
    { k: "Purchases", node: <Counter to={ACCOUNT.purchases} /> },
    { k: "Revenue", node: <Counter to={ACCOUNT.revenue} prefix="RM" /> },
    { k: "Approx. Daily Budget", node: <Counter to={ACCOUNT.dailyBudget} prefix="RM" /> },
  ];
  const fixes = [
    ["Wordament", "Strengthen product-page conversion"],
    ["Must-Run Sale", "Resolve a critical checkout barrier"],
    ["Flash Cards & Tangram", "Reduce expensive traffic costs"],
    ["Baby Campaign", "Gradually scale a healthy, proven funnel"],
  ];
  return (
    <Slide id="s-summary" title="Executive Summary" chapter="01">
      <BigNum n="01" />
      <Head
        n="01"
        label="Executive Summary"
        title={["Below the 4x target —", "but the data tells", "a more nuanced story."]}
        size="text-[clamp(2.4rem,6vw,5.8rem)]"
      />

      <div className="relative z-10 grid gap-8 lg:grid-cols-12">
        {/* gauge + stats */}
        <div className="glass spot rounded-3xl p-6 sm:p-8 lg:col-span-5">
          <Rv d={2}>
            <Gauge />
          </Rv>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <Rv key={s.k} d={3 + i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mono text-[9.5px] uppercase tracking-[0.2em] text-ink/45">{s.k}</div>
                <div className="display mt-2 text-[clamp(1.5rem,2.3vw,2.2rem)] leading-none text-ink">{s.node}</div>
              </Rv>
            ))}
          </div>
          <Rv d={7} className="mono mt-4 text-[10px] uppercase tracking-[0.2em] text-ink/40">
            5 active campaigns · Malaysia & Singapore · 8 Sep – 7 Oct 2026
          </Rv>
        </div>

        {/* narrative */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          <Rv d={3} className="glass spot rounded-3xl p-6 sm:p-8">
            <div className="mono text-[10.5px] uppercase tracking-[0.24em] text-lime">The headline</div>
            <p className="mt-3 text-[clamp(1.05rem,1.5vw,1.35rem)] leading-snug text-ink/90">
              Over the 30-day period, this account spent <b className="text-ink">RM14,086.34</b> across five active Meta campaigns targeting Malaysia and Singapore — generating <b className="text-ink">132 purchases</b> and <b className="text-ink">RM20,903</b> in revenue, an overall ROAS of <b className="text-lime">1.48x</b> against an approximate daily budget of RM300.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Baby Campaign", "4.45%"],
                ["Flash Cards", "4.82%"],
              ].map(([n, v]) => (
                <div key={n} className="rounded-2xl border border-lime/25 bg-lime/[0.06] p-4">
                  <div className="mono text-[10px] uppercase tracking-[0.2em] text-ink/50">{n} · purchase CVR</div>
                  <div className="display mt-1 text-5xl text-lime">{v}</div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-ink/65">
              Two campaigns are already converting at these rates — demonstrating that the website and checkout are fully capable of converting paid traffic effectively when the product, creative, and audience are well-aligned. <b className="text-ink/90">The performance gaps are campaign-specific, not structural.</b>
            </p>
          </Rv>

          <Rv d={5} className="glass rounded-3xl p-6 sm:p-8">
            <div className="mono text-[10.5px] uppercase tracking-[0.24em] text-lime">The path to 4x ROAS — one bottleneck at a time</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {fixes.map(([a, b], i) => (
                <div key={a} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.025] p-3.5">
                  <span className="display text-2xl leading-none text-lime/80">0{i + 1}</span>
                  <div>
                    <div className="text-[15px] font-semibold text-ink">{a}</div>
                    <div className="text-[13.5px] text-ink/55">{b}</div>
                  </div>
                </div>
              ))}
            </div>
          </Rv>

          <Rv d={7} className="grid gap-3 sm:grid-cols-3">
            {[
              ["October", "The audit and testing window"],
              ["November", "The scaling window"],
              ["December", "Year-end gifting layered in ahead"],
            ].map(([m, t], i) => (
              <div key={m} className="rounded-2xl border border-white/10 p-4">
                <div className="display text-2xl text-ink">{m}</div>
                <div className="mt-1 text-[13px] leading-snug text-ink/55">{t}</div>
                <div className={`mt-3 h-[2px] rounded-full ${i === 0 ? "bg-lime" : i === 1 ? "bg-lime/60" : "bg-lime/30"}`} />
              </div>
            ))}
          </Rv>
          <Rv d={8} className="serif text-[clamp(1.3rem,2vw,1.8rem)] leading-tight text-ink/80">
            “We will not increase spend where performance has not yet earned it. Every budget decision will be tied directly to funnel data.”
          </Rv>
        </div>
      </div>
    </Slide>
  );
}
