import { SignalCanvas } from "../components/SignalCanvas";
import { BigNum, Head, Lines, Rv, Slide } from "../components/ui";
import type { Tone } from "../data";
import { META } from "../data";

const verdicts: { name: string; act: string; why: string; tone: Tone }[] = [
  { name: "Must-Run Sale", act: "Pause today", why: "Spending further where 90% of checkout attempts fail is not a calculated risk — it is a drain with no upside until the underlying problem is fixed.", tone: "bad" },
  { name: "Baby Campaign", act: "Protect & carefully scale", why: "The account's strongest performer and the most natural candidate to lead the year-end strategy.", tone: "good" },
  { name: "Flash Cards", act: "Cut traffic cost, then scale", why: "An excellent post-click funnel that will reward well once traffic costs come down through better creative.", tone: "good" },
  { name: "Wordament", act: "Fix the product page", why: "The biggest opportunity is the product page — not the ad targeting.", tone: "warn" },
  { name: "Tangram", act: "Cheaper traffic + checkout fix", why: "Needs both cheaper traffic and a checkout fix.", tone: "warn" },
];

const border: Record<Tone, string> = {
  good: "border-lime/35 hover:border-lime",
  warn: "border-amber/35 hover:border-amber",
  bad: "border-coral/45 hover:border-coral",
  none: "border-white/10",
};
const txt: Record<Tone, string> = { good: "text-lime", warn: "text-amber", bad: "text-coral", none: "text-ink" };

export function Final() {
  return (
    <Slide id="s-final" title="Final Recommendation" chapter="12">
      <BigNum n="12" />
      <Head
        n="12"
        label="Final Recommendation"
        title={["Not a failing account.", "A fixable one."]}
        size="text-[clamp(2.4rem,6.4vw,6rem)]"
      />
      <div className="relative z-10 grid gap-5 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-5">
          <Rv d={2} className="glass rounded-3xl p-6 sm:p-7 text-[15px] leading-relaxed text-ink/75">
            Four of the five campaigns are currently generating a ROAS below 2x, and one is actively losing money on every purchase. But the same data shows us two campaigns converting at purchase CVR above 4%, using the same website and the same checkout infrastructure. This is not a failing account — it is an account with specific, identifiable problems that have clear solutions.
          </Rv>
          <Rv d={3} className="rounded-3xl border border-lime/30 bg-lime/[0.06] p-6 sm:p-7 text-[15px] leading-relaxed text-ink/80">
            <b className="text-lime">November is the scaling window.</b> By the time we enter it, we expect at least two or three campaigns performing above 2.5x ROAS with stable, tested funnels. Those campaigns will carry the year-end push. <b className="text-ink">December is the execution window — not the place for experimentation.</b>
          </Rv>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
          {verdicts.map((v, i) => (
            <Rv
              key={v.name}
              d={3 + i}
              className={`glass spot rounded-2xl border p-5 ${border[v.tone]} ${i === 0 ? "sm:col-span-2" : ""}`}
            >
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-ink/45">{v.name}</div>
              <div className={`display mt-2 text-[clamp(1.6rem,2.4vw,2.3rem)] leading-[0.95] ${txt[v.tone]}`}>{v.act}</div>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink/60">{v.why}</p>
            </Rv>
          ))}
        </div>
      </div>
    </Slide>
  );
}

export function Closing() {
  return (
    <Slide id="s-closing" title="Our Approach" chapter="—" className="justify-between">
      <div className="grid-bg absolute inset-0 opacity-70" />
      <div className="orb orb-a -left-[10%] top-[10%] h-[44vw] w-[44vw] bg-lime/20" />
      <div className="orb orb-b -right-[10%] bottom-[-10%] h-[36vw] w-[36vw] bg-[#1d7a3a]/30" />
      <SignalCanvas className="absolute inset-0 h-full w-full opacity-60" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
        <Rv className="mono flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-lime">
          <span className="h-px w-10 bg-lime" /> Our Approach
        </Rv>
        <Lines
          className="serif mt-6 text-[clamp(2rem,5.2vw,5rem)] leading-[1.02] text-ink"
          d={1}
          lines={["We will not increase", <span key="a" className="text-lime">spend blindly.</span>]}
        />
        <Rv d={4} className="mt-8 max-w-3xl text-[clamp(1.05rem,1.5vw,1.4rem)] leading-relaxed text-ink/75">
          We will identify the bottleneck in each campaign, fix that specific stage, measure the result, and scale only the combinations that prove they can generate efficient purchases.
        </Rv>

        <Rv d={5} className="mt-12 flex flex-wrap items-end justify-between gap-8 border-t border-white/15 pt-8">
          <div>
            <div className="display outline-lime text-[clamp(3rem,10vw,9rem)] leading-[0.85]">DREAM MEDIA</div>
            <div className="mono mt-4 text-[10.5px] uppercase tracking-[0.24em] text-ink/45">— Strategy &amp; performance agency</div>
          </div>
          <div className="flex flex-col gap-3 text-[clamp(1.1rem,1.6vw,1.5rem)]">
            <a href={`mailto:${META.email}`} className="group flex items-center gap-3 text-ink transition hover:text-lime">
              <span className="mono text-[10px] uppercase tracking-[0.22em] text-ink/40">Email</span>
              {META.email}
            </a>
          </div>
        </Rv>

        <Rv d={6} className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/12 bg-void/50 p-5 backdrop-blur">
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-ink/45">Prepared for</div>
            <div className="mt-1.5 text-[17px] font-medium text-ink">{META.preparedFor}</div>
          </div>
          <div className="rounded-2xl border border-white/12 bg-void/50 p-5 backdrop-blur">
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-ink/45">Strategy Period</div>
            <div className="mt-1.5 text-[17px] font-medium text-ink">{META.strategyPeriod}</div>
          </div>
        </Rv>
      </div>
    </Slide>
  );
}
