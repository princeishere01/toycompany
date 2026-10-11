import { BigNum, Chip, Head, Rv, Slide, dly, statusTone } from "../components/ui";
import { BENCH, CAMPAIGNS } from "../data";
import type { Score, Tone } from "../data";

type Key = keyof Score;

const fmt: Record<Key, (v: number) => string> = {
  roas: (v) => `${v.toFixed(2)}x`,
  cpm: (v) => v.toFixed(2),
  ctr: (v) => `${v.toFixed(2)}%`,
  cpc: (v) => v.toFixed(2),
  atc: (v) => `${v.toFixed(2)}%`,
  atcChk: (v) => `${v.toFixed(2)}%`,
  chkPur: (v) => `${v.toFixed(2)}%`,
  cvr: (v) => `${v.toFixed(2)}%`,
};

// does the value meet the working benchmark? (benchmarks: 3x+, RM15–25, 1%+, <RM2.50, 15%+, 40%+, 35%+, 3%+)
const meets: Record<Key, (v: number) => boolean> = {
  roas: (v) => v >= 3,
  cpm: (v) => v <= 25,
  ctr: (v) => v >= 1,
  cpc: (v) => v < 2.5,
  atc: (v) => v >= 15,
  atcChk: (v) => v >= 40,
  chkPur: (v) => v >= 35,
  cvr: (v) => v >= 3,
};
const severe: Partial<Record<Key, (v: number) => boolean>> = {
  roas: (v) => v < 1,
  atcChk: (v) => v < 30,
  chkPur: (v) => v < 20,
  cvr: (v) => v < 1.5,
};

const cellTone = (k: Key, v: number): Tone => (meets[k](v) ? "good" : severe[k]?.(v) ? "bad" : "warn");

const cols: { k: Key; label: string; bench: string }[] = [
  { k: "roas", label: "ROAS", bench: BENCH.roas },
  { k: "cpm", label: "CPM (RM)", bench: BENCH.cpm },
  { k: "ctr", label: "CTR", bench: BENCH.ctr },
  { k: "cpc", label: "CPC (RM)", bench: BENCH.cpc },
  { k: "atc", label: "ATC Rate", bench: BENCH.atc },
  { k: "atcChk", label: "ATC→Chk", bench: BENCH.atcChk },
  { k: "chkPur", label: "Chk→Pur", bench: BENCH.chkPur },
  { k: "cvr", label: "Pur CVR", bench: BENCH.cvr },
];

const cellCls: Record<Tone, string> = {
  good: "text-lime bg-lime/[0.07]",
  warn: "text-amber bg-amber/[0.07]",
  bad: "text-coral bg-coral/[0.09]",
  none: "text-ink",
};

export function Scorecard() {
  const sorted = [...CAMPAIGNS].sort((a, b) => b.score.roas - a.score.roas);
  const pos = (v: number) => `${(v / 4) * 100}%`;
  return (
    <Slide id="s-scorecard" title="Campaign Performance Scorecard" chapter="04">
      <BigNum n="04" />
      <Head
        n="04"
        label="Campaign Performance Scorecard"
        title={["Five campaigns,", "side by side."]}
        sub="The scorecard shows all five campaigns side by side, with calculated funnel metrics and an overall status. The benchmark row reflects working targets for this account — not guarantees, since actual performance also depends on product pricing, average order value, margin, and offer strength."
      />

      {/* ROAS race */}
      <Rv d={3} className="glass relative z-10 mb-6 rounded-3xl p-5 sm:p-8">
        <div className="mono mb-5 text-[10.5px] uppercase tracking-[0.24em] text-lime">ROAS by campaign</div>
        <div className="grid grid-cols-[104px_1fr] gap-x-4 sm:grid-cols-[170px_1fr]">
          {/* axis header */}
          <div />
          <div className="relative mb-2 h-9">
            {[
              { v: 1.48, t: "1.48x Account", c: "text-ink" },
              { v: 3, t: "3x+ Benchmark", c: "text-lime" },
              { v: 4, t: "4x Target", c: "text-lime" },
            ].map((m) => (
              <div
                key={m.t}
                className={`mono absolute top-0 whitespace-nowrap text-[9.5px] uppercase tracking-[0.14em] ${m.c}`}
                style={{ left: pos(m.v), transform: m.v === 4 ? "translateX(-100%)" : "translateX(-50%)" }}
              >
                {m.t}
              </div>
            ))}
          </div>
          {sorted.map((c, i) => {
            const t = cellTone("roas", c.score.roas);
            const col = t === "good" ? "#c8ff2e" : c.score.roas < 1 ? "#ff4d2e" : "#ffb224";
            return (
              <div key={c.id} className="contents">
                <div className="flex items-center py-2.5 text-[13px] font-medium text-ink sm:text-[15px]">{c.scoreName}</div>
                <div className="relative flex items-center py-2.5">
                  {[1.48, 3, 4].map((m) => (
                    <span
                      key={m}
                      className={`absolute inset-y-0 w-px ${m === 1.48 ? "border-l border-dashed border-white/40" : "bg-lime/50"}`}
                      style={{ left: pos(m) }}
                    />
                  ))}
                  <div className="relative h-7 w-full rounded-full bg-white/[0.04]">
                    <div
                      className="grow-x absolute inset-y-0 left-0 rounded-full"
                      style={{ ...dly(3 + i), width: pos(c.score.roas), background: `linear-gradient(90deg, ${col}55, ${col})`, boxShadow: `0 0 24px ${col}44` }}
                    />
                    <div className="display absolute inset-y-0 flex items-center pl-3 text-[15px]" style={{ left: pos(c.score.roas), transform: "translateX(0)" }}>
                      <span style={{ color: col }}>{c.score.roas.toFixed(2)}x</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Rv>

      {/* heat table */}
      <Rv d={5} className="glass relative z-10 overflow-hidden rounded-3xl">
        <div className="overflow-x-auto">
          <div className="min-w-[960px]">
            <div className="grid grid-cols-[1.5fr_repeat(8,1fr)_1.5fr] border-b border-white/10 bg-white/[0.04]">
              <div className="mono px-4 py-3.5 text-[10px] uppercase tracking-[0.2em] text-ink/50">Campaign</div>
              {cols.map((c) => (
                <div key={c.k} className="mono px-3 py-3.5 text-[10px] uppercase tracking-[0.16em] text-ink/50">
                  {c.label}
                </div>
              ))}
              <div className="mono px-3 py-3.5 text-[10px] uppercase tracking-[0.2em] text-ink/50">Status</div>
            </div>
            {CAMPAIGNS.map((c) => (
              <div key={c.id} className="grid grid-cols-[1.5fr_repeat(8,1fr)_1.5fr] items-stretch border-b border-white/[0.06] transition hover:bg-white/[0.03]">
                <div className="px-4 py-4 text-[15px] font-semibold text-ink">{c.scoreName}</div>
                {cols.map((col) => {
                  const v = c.score[col.k];
                  return (
                    <div key={col.k} className={`display flex items-center px-3 py-4 text-[17px] tracking-normal ${cellCls[cellTone(col.k, v)]}`} style={{ fontStretch: "85%" }}>
                      {fmt[col.k](v)}
                    </div>
                  );
                })}
                <div className="flex items-center px-3 py-4">
                  <Chip tone={statusTone[c.status]}>{c.status}</Chip>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-[1.5fr_repeat(8,1fr)_1.5fr] bg-lime/[0.07]">
              <div className="px-4 py-4 text-[15px] font-semibold text-lime">Target Benchmark</div>
              {cols.map((c) => (
                <div key={c.k} className="mono flex items-center px-3 py-4 text-[12.5px] tracking-normal text-lime">
                  {c.bench}
                </div>
              ))}
              <div className="mono flex items-center px-3 py-4 text-[12.5px] text-lime/60">—</div>
            </div>
          </div>
        </div>
      </Rv>
      <Rv d={7} className="relative z-10 mt-4 flex flex-wrap items-center gap-5 text-[11px] text-ink/45">
        <span className="mono flex items-center gap-2 uppercase tracking-[0.16em]"><i className="h-2 w-2 rounded-sm bg-lime" /> Meets benchmark</span>
        <span className="mono flex items-center gap-2 uppercase tracking-[0.16em]"><i className="h-2 w-2 rounded-sm bg-amber" /> Below benchmark</span>
        <span className="mono flex items-center gap-2 uppercase tracking-[0.16em]"><i className="h-2 w-2 rounded-sm bg-coral" /> Critical gap</span>
      </Rv>
    </Slide>
  );
}
