import { SignalCanvas } from "../components/SignalCanvas";
import { Lines, Rv, Slide } from "../components/ui";
import { META } from "../data";

const TICKER = [
  "RM14,086.34 Ad Spend",
  "132 Purchases",
  "RM20,903 Revenue",
  "1.48x Overall ROAS",
  "4x ROAS Target",
  "5 Active Campaigns",
  "Malaysia & Singapore",
  "30-Day Window",
  "Strategy · Oct – Dec 2026",
];

export function Cover() {
  const items = [...TICKER, ...TICKER];
  return (
    <Slide id="s-cover" title="Cover" chapter="00" className="p-0 sm:px-0 lg:px-0 justify-between">
      {/* backdrop */}
      <div className="grid-bg absolute inset-0 opacity-80" />
      <div className="orb orb-a -left-[10%] top-[8%] h-[46vw] w-[46vw] bg-lime/20" />
      <div className="orb orb-b -right-[12%] bottom-[-10%] h-[40vw] w-[40vw] bg-[#1d7a3a]/30" />
      <SignalCanvas className="absolute inset-0 h-full w-full" />
      <div className="scan pointer-events-none absolute inset-0" />

      <div className="relative z-10 flex min-h-screen flex-col justify-between pt-28">
        {/* top */}
        <div className="px-6 sm:px-10 lg:px-16">
          <Rv d={0} className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-void/50 px-4 py-2 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-lime [animation:pulse-ring_2s_ease-out_infinite]" />
              <span className="relative h-2 w-2 rounded-full bg-lime" />
            </span>
            <span className="mono text-[10.5px] uppercase tracking-[0.24em] text-ink/70">
              30-day analysis · {META.dataWindow}
            </span>
          </Rv>
        </div>

        {/* title */}
        <div className="px-6 py-10 sm:px-10 lg:px-16">
          <Lines
            className="display text-[clamp(3.6rem,14.2vw,15rem)] text-ink"
            d={1}
            lines={[
              "Meta Ads",
              <span key="p" className="text-ink">Performance</span>,
              <span key="a" className="flex flex-wrap items-end gap-x-[0.18em]">
                <span>Analysis</span>
              </span>,
            ]}
          />
          <Lines
            className="serif mt-5 text-[clamp(1.9rem,4.6vw,4.8rem)] leading-none text-lime"
            d={5}
            lines={[META.subtitle]}
          />
        </div>

        {/* bottom */}
        <div>
          <div className="grid gap-6 px-6 pb-10 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:px-16">
            {[
              ["Prepared by", META.preparedBy],
              ["Prepared for", META.preparedFor],
              ["Strategy Period", META.strategyPeriod],
              ["Data Window", META.dataWindow],
            ].map(([k, v], i) => (
              <Rv key={k} d={6 + i} className="border-t border-white/15 pt-4">
                <div className="mono text-[10px] uppercase tracking-[0.26em] text-ink/40">{k}</div>
                <div className="mt-2 text-[clamp(1rem,1.3vw,1.25rem)] font-medium text-ink">{v}</div>
              </Rv>
            ))}
          </div>

          {/* marquee */}
          <div className="relative overflow-hidden border-y border-white/10 bg-void/60 py-4 backdrop-blur">
            <div className="marquee-track">
              {items.map((t, i) => (
                <span key={i} className="mono flex items-center whitespace-nowrap text-[12px] uppercase tracking-[0.24em] text-ink/70">
                  {t}
                  <span className="mx-8 text-lime">✦</span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 pb-16 pt-5">
            <span className="mono text-[10px] uppercase tracking-[0.3em] text-ink/40">Scroll to begin</span>
            <span className="inline-block h-4 w-px bg-lime [animation:nudge_1.6s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </Slide>
  );
}
