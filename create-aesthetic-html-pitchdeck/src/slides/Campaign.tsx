import { Arrow, BigNum, Chip, Counter, Eyebrow, Lines, Rv, Slide, dly, statusTone, toneBg, toneText } from "../components/ui";
import type { Campaign, Tone } from "../data";

const toneBorder: Record<Tone, string> = {
  good: "border-lime/40 bg-lime/[0.06]",
  warn: "border-amber/40 bg-amber/[0.06]",
  bad: "border-coral/45 bg-coral/[0.07]",
  none: "border-white/10",
};

const STAGES = [
  { key: "atc", label: "ATC Rate", bench: 15, max: 25, text: "15%+" },
  { key: "atcChk", label: "ATC → Checkout", bench: 40, max: 60, text: "40%+" },
  { key: "chkPur", label: "Checkout → Purchase", bench: 35, max: 60, text: "35%+" },
  { key: "cvr", label: "Purchase CVR", bench: 3, max: 6, text: "3%+" },
] as const;

function barColor(v: number, bench: number) {
  if (v >= bench) return "#c8ff2e";
  if (v < bench * 0.6) return "#ff4d2e";
  return "#ffb224";
}

function FunnelBars({ c }: { c: Campaign }) {
  return (
    <div className="space-y-8">
      {STAGES.map((s, i) => {
        const v = c.score[s.key];
        const col = barColor(v, s.bench);
        return (
          <div key={s.key} className="pb-5">
            <div className="flex items-baseline justify-between">
              <span className="mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">{s.label}</span>
              <span className="display text-[clamp(1.6rem,2.4vw,2.3rem)] leading-none" style={{ color: col }}>
                {v.toFixed(2)}%
              </span>
            </div>
            <div className="relative mt-3 h-3 rounded-full bg-white/[0.06]">
              <div
                className="grow-x absolute inset-y-0 left-0 rounded-full"
                style={{ ...dly(i + 2), width: `${(v / s.max) * 100}%`, background: `linear-gradient(90deg,${col}55,${col})`, boxShadow: `0 0 18px ${col}55` }}
              />
              <div className="absolute -inset-y-1.5 w-[2px] bg-ink" style={{ left: `${(s.bench / s.max) * 100}%` }} />
              <div
                className="mono absolute top-full mt-2 whitespace-nowrap text-[9.5px] uppercase tracking-[0.16em] text-ink/50"
                style={{ left: `${(s.bench / s.max) * 100}%`, transform: "translateX(-50%)" }}
              >
                Benchmark {s.text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CampaignPerformance({ c }: { c: Campaign }) {
  const tone = statusTone[c.status];
  const rows = c.rows.filter((r) => r.tone !== "none");
  const kpis = [
    { k: "Spend", n: <Counter to={c.spend} decimals={2} prefix="RM" /> },
    { k: "Purchases", n: <Counter to={c.purchases} /> },
    { k: "Revenue", n: <Counter to={c.revenue} prefix="RM" /> },
    { k: c.cpaLabel, n: <Counter to={c.cpa} decimals={2} prefix="RM" /> },
  ];
  return (
    <Slide id={`s-${c.id}-a`} title={`${c.short} — Performance`} chapter={c.section}>
      <BigNum n={c.section} />

      <header className="relative z-10 mb-8">
        <Rv>
          <Eyebrow n={`05 · ${c.section}`} label="Campaign-by-Campaign · Current Performance" />
        </Rv>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <Lines
            className="display text-[clamp(2.6rem,7vw,6.6rem)]"
            d={1}
            lines={[c.title[0], <span key="t" className="serif text-[0.8em] text-lime">{c.title[1]}</span>]}
          />
          <Rv d={3} className="flex flex-col items-start gap-3 sm:items-end">
            <Chip tone={tone}>{c.status}</Chip>
            <div className="mono text-[10.5px] uppercase tracking-[0.22em] text-ink/50">{c.markets}</div>
          </Rv>
        </div>
      </header>

      {/* KPI row */}
      <div className="relative z-10 grid grid-cols-2 gap-3 lg:grid-cols-5 lg:gap-4">
        {kpis.map((k, i) => (
          <Rv key={k.k} d={2 + i} className="glass spot rounded-2xl p-4 sm:p-5">
            <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink/50">{k.k}</div>
            <div className="display mt-3 text-[clamp(1.5rem,2.6vw,2.6rem)] leading-none text-ink">{k.n}</div>
          </Rv>
        ))}
        <Rv d={6} className={`spot col-span-2 rounded-2xl border p-4 sm:p-5 lg:col-span-1 ${toneBorder[tone]}`}>
          <div className="mono text-[10px] uppercase tracking-[0.18em] text-ink/55">ROAS · vs 3x+</div>
          <div className={`display mt-3 text-[clamp(2rem,3.4vw,3.4rem)] leading-none ${toneText[tone]}`}>
            <Counter to={c.score.roas} decimals={2} suffix="x" />
          </div>
        </Rv>
      </div>

      <div className="relative z-10 mt-4 grid gap-4 lg:grid-cols-12 lg:gap-5">
        {/* gauges */}
        <Rv d={4} className="glass rounded-3xl p-6 sm:p-8 lg:col-span-5">
          <div className="mono mb-7 text-[10.5px] uppercase tracking-[0.24em] text-lime">Funnel vs benchmark</div>
          <FunnelBars c={c} />
        </Rv>

        {/* table */}
        <Rv d={5} className="glass overflow-hidden rounded-3xl lg:col-span-7">
          <div className="grid grid-cols-[1.25fr_0.8fr_0.8fr_1.7fr] border-b border-white/10 bg-white/[0.04]">
            {["Metric", "Actual", "Target Benchmark", "Assessment"].map((h) => (
              <div key={h} className="mono px-4 py-3 text-[9.5px] uppercase leading-snug tracking-[0.16em] text-ink/50">
                {h}
              </div>
            ))}
          </div>
          {rows.map((r) => (
            <div key={r.metric} className="grid grid-cols-[1.25fr_0.8fr_0.8fr_1.7fr] items-center border-b border-white/[0.05] transition hover:bg-white/[0.03]">
              <div className="px-4 py-2.5 text-[13.5px] font-semibold text-ink">{r.metric}</div>
              <div className={`display px-4 py-2.5 text-[16px] tracking-normal ${toneText[r.tone]}`} style={{ fontStretch: "85%" }}>
                {r.actual}
              </div>
              <div className="mono px-4 py-2.5 text-[11.5px] tracking-normal text-ink/55">{r.target}</div>
              <div className="flex items-start gap-2 px-4 py-2.5 text-[12.5px] leading-snug text-ink/75">
                <span className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${toneBg[r.tone]}`} />
                {r.assessment}
              </div>
            </div>
          ))}
        </Rv>
      </div>
      {c.note && (
        <Rv d={7} className="relative z-10 mt-4 max-w-4xl text-[12.5px] italic leading-relaxed text-ink/45">
          {c.note}
        </Rv>
      )}
    </Slide>
  );
}

export function CampaignPlan({ c }: { c: Campaign }) {
  const tone = statusTone[c.status];
  return (
    <Slide id={`s-${c.id}-b`} title={`${c.short} — Diagnosis & Plan`} chapter={c.section}>
      <BigNum n={c.section} />

      <header className="relative z-10 mb-8">
        <Rv>
          <Eyebrow n={`05 · ${c.section}`} label="Campaign-by-Campaign · Diagnosis & Plan" />
        </Rv>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <Lines className="display text-[clamp(2.4rem,5.6vw,5.2rem)]" d={1} lines={[c.short]} />
          <Rv d={2}>
            <Chip tone={tone}>{c.status}</Chip>
          </Rv>
        </div>
      </header>

      <div className="relative z-10 grid gap-5 lg:grid-cols-12">
        {/* left */}
        <div className="flex flex-col gap-5 lg:col-span-5">
          <Rv d={2} className="glass rounded-3xl p-6 sm:p-7">
            <div className="mono mb-4 text-[10.5px] uppercase tracking-[0.24em] text-lime">What the data is telling us</div>
            <div className="space-y-3.5 text-[14.5px] leading-relaxed text-ink/70">
              {c.telling.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          </Rv>
          <Rv d={4} className={`rounded-3xl border p-6 sm:p-7 ${toneBorder[tone]}`}>
            <div className={`mono mb-3 text-[10.5px] uppercase tracking-[0.24em] ${toneText[tone]}`}>Main bottleneck</div>
            <div className="display text-[clamp(1.6rem,2.4vw,2.3rem)] leading-[0.95] text-ink">{c.bottleneckLabel}</div>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink/70">{c.bottleneck}</p>
          </Rv>
        </div>

        {/* right */}
        <Rv d={3} className="glass rounded-3xl p-6 sm:p-7 lg:col-span-7">
          <div className="mono mb-2 text-[10.5px] uppercase tracking-[0.24em] text-lime">What we should do</div>
          <ol>
            {c.actions.map((a, i) => (
              <li key={i} className="flex gap-4 border-t border-white/10 py-3.5 first:border-t-0">
                <span className="display w-8 shrink-0 text-[26px] leading-none text-lime/90">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[14.5px] leading-relaxed text-ink/80">{a}</span>
              </li>
            ))}
          </ol>
        </Rv>
      </div>

      {/* impact */}
      <Rv d={6} className="relative z-10 mt-5 overflow-hidden rounded-3xl border border-lime/30 bg-lime/[0.06] p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime/20 blur-[80px]" />
        <div className="relative grid items-center gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mono mb-3 text-[10.5px] uppercase tracking-[0.24em] text-lime">Expected impact</div>
            <p className="text-[14.5px] leading-relaxed text-ink/80">{c.impact}</p>
          </div>
          <div className="lg:col-span-5">
            <div className="mono mb-2 text-[10px] uppercase tracking-[0.22em] text-ink/50">{c.impactMetric}</div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="display text-[clamp(2rem,3.4vw,3.2rem)] leading-none text-ink/50">{c.impactFrom}</span>
              <Arrow className="h-7 w-7 text-lime" />
              <span className="display text-[clamp(2.2rem,4vw,3.8rem)] leading-none text-lime">{c.impactTo}</span>
            </div>
          </div>
        </div>
      </Rv>
    </Slide>
  );
}
