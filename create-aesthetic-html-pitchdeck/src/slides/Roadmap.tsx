import { BigNum, Eyebrow, Head, Lines, Rv, Slide } from "../components/ui";
import { WEEKS } from "../data";
import type { Week } from "../data";

function Timeline({ from, to }: { from: number; to: number }) {
  return (
    <Rv d={2} className="relative z-10 mb-8 overflow-x-auto pb-2">
      <div className="grid min-w-[720px] grid-cols-6 gap-2">
        {WEEKS.map((w, i) => {
          const on = i >= from && i <= to;
          return (
            <div key={w.label} className="relative">
              <div className={`h-[3px] rounded-full ${on ? "bg-lime shadow-[0_0_14px_rgba(200,255,46,.7)]" : "bg-white/12"}`} />
              <div className="mt-3 flex items-start gap-2">
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${on ? "bg-lime" : "bg-white/20"}`} />
                <div>
                  <div className={`mono text-[10.5px] uppercase tracking-[0.18em] ${on ? "text-ink" : "text-ink/35"}`}>{w.label}</div>
                  <div className={`mono text-[10px] tracking-[0.1em] ${on ? "text-lime" : "text-ink/30"}`}>{w.dates}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Rv>
  );
}

function WeekCard({ w, i, d }: { w: Week; i: number; d: number }) {
  return (
    <Rv d={d} className="glass spot rounded-3xl p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mono text-[10.5px] uppercase tracking-[0.2em] text-lime">
            {w.label} <span className="text-ink/30">·</span> {w.dates}
          </div>
          <h3 className="display mt-2 text-[clamp(1.6rem,2.5vw,2.4rem)] leading-[0.95] text-ink">{w.name}</h3>
        </div>
        <div className="display outline-lime text-[clamp(3rem,5vw,4.6rem)] leading-none opacity-70">{i + 1 <= 4 ? i + 1 : i === 4 ? "5–6" : "7–8"}</div>
      </div>
      <ul className="mt-5 space-y-3">
        {w.items.map((t, k) => (
          <li key={k} className="flex gap-3 text-[14px] leading-relaxed text-ink/70">
            <span className="mt-[9px] h-px w-3.5 shrink-0 bg-lime" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </Rv>
  );
}

export function RoadmapOct() {
  return (
    <Slide id="s-roadmap-oct" title="Roadmap — October" chapter="07">
      <BigNum n="07" />
      <Head
        n="07"
        label="Two-Month Action Roadmap"
        title={["Month 1 — October 2026:", "Audit, Fix & Test"]}
        size="text-[clamp(2.2rem,5.6vw,5.2rem)]"
        sub="The next 60 days are structured in two distinct phases. October is the fix-and-test phase — we address bottlenecks, improve product pages, validate the checkout, and run creative experiments. November is the scale phase — we increase budget to proven winners, layer in year-end messaging, and build audience pools for December retargeting."
      />
      <Timeline from={0} to={3} />
      <div className="relative z-10 grid gap-4 lg:grid-cols-2 lg:gap-5">
        {WEEKS.slice(0, 4).map((w, i) => (
          <WeekCard key={w.label} w={w} i={i} d={3 + i} />
        ))}
      </div>
    </Slide>
  );
}

export function RoadmapNov() {
  return (
    <Slide id="s-roadmap-nov" title="Roadmap — November" chapter="07">
      <BigNum n="07" />
      <header className="relative z-10 mb-8">
        <Rv>
          <Eyebrow n="07" label="Two-Month Action Roadmap" />
        </Rv>
        <Lines
          className="display mt-5 text-[clamp(2.2rem,5.6vw,5.2rem)]"
          d={1}
          lines={["Month 2 — November 2026:", "Scale, Efficiency &", "Year-End Preparation"]}
        />
      </header>
      <Timeline from={4} to={5} />
      <div className="relative z-10 grid gap-4 lg:grid-cols-2 lg:gap-5">
        {WEEKS.slice(4).map((w, i) => (
          <WeekCard key={w.label} w={w} i={i + 4} d={3 + i} />
        ))}
      </div>
    </Slide>
  );
}
