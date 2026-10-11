import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "../utils/cn";
import type { Status, Tone } from "../data";

/* ---------- in-view hook ---------- */
export function useInView<T extends Element = HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

export const dly = (d: number): CSSProperties => ({ ["--d" as string]: d }) as unknown as CSSProperties;

/* ---------- Slide wrapper ---------- */
export function Slide({
  id,
  title,
  chapter,
  children,
  className,
}: {
  id: string;
  title: string;
  chapter: string;
  children: ReactNode;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLElement>(0.08);
  return (
    <section
      ref={ref}
      id={id}
      data-slide
      data-title={title}
      data-chapter={chapter}
      className={cn(
        "relative flex min-h-screen w-full flex-col justify-center overflow-hidden px-6 pb-28 pt-28 sm:px-10 lg:px-16",
        inView && "is-in",
        className
      )}
    >
      {children}
    </section>
  );
}

/* ---------- Reveal ---------- */
export function Rv({
  d = 0,
  className,
  children,
}: {
  d?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("rv", className)} style={dly(d)}>
      {children}
    </div>
  );
}

/* ---------- Masked line reveal ---------- */
export function Lines({
  lines,
  className,
  d = 0,
}: {
  lines: ReactNode[];
  className?: string;
  d?: number;
}) {
  return (
    <div className={className}>
      {lines.map((l, i) => (
        <span key={i} className="ln">
          <span style={dly(d + i)}>{l}</span>
        </span>
      ))}
    </div>
  );
}

/* ---------- Counter ---------- */
export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1900,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.3);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setV(p === 1 ? to : to * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  const txt = v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {txt}
      {suffix}
    </span>
  );
}

/* ---------- Eyebrow / Head ---------- */
export function Eyebrow({ n, label }: { n: string; label: string }) {
  return (
    <div className="mono flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-lime">
      <span className="h-px w-10 bg-lime" />
      <span>
        {n} <span className="text-ink/30">/</span> {label}
      </span>
    </div>
  );
}

export function Head({
  n,
  label,
  title,
  sub,
  size = "text-[clamp(2.6rem,7vw,6.6rem)]",
}: {
  n: string;
  label: string;
  title: ReactNode[];
  sub?: ReactNode;
  size?: string;
}) {
  return (
    <header className="relative z-10 mb-10 lg:mb-14">
      <Rv>
        <Eyebrow n={n} label={label} />
      </Rv>
      <Lines className={cn("display mt-5", size)} lines={title} d={1} />
      {sub && (
        <Rv d={4} className="mt-6 max-w-3xl text-[clamp(1rem,1.2vw,1.18rem)] leading-relaxed text-ink/60">
          {sub}
        </Rv>
      )}
    </header>
  );
}

/* ---------- Giant outlined number ---------- */
export function BigNum({ n, className }: { n: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "display outline-text pointer-events-none absolute right-[-1vw] top-16 z-0 select-none text-[clamp(9rem,26vw,28rem)] leading-none",
        className
      )}
    >
      {n}
    </div>
  );
}

/* ---------- Tones ---------- */
export const toneText: Record<Tone, string> = {
  good: "text-lime",
  warn: "text-amber",
  bad: "text-coral",
  none: "text-smoke",
};
export const toneBg: Record<Tone, string> = {
  good: "bg-lime",
  warn: "bg-amber",
  bad: "bg-coral",
  none: "bg-smoke",
};
const toneChip: Record<Tone, string> = {
  good: "text-lime border-lime/40 bg-lime/10",
  warn: "text-amber border-amber/40 bg-amber/10",
  bad: "text-coral border-coral/40 bg-coral/10",
  none: "text-smoke border-white/10 bg-white/5",
};
export const statusTone: Record<Status, Tone> = {
  Strong: "good",
  "Needs Improvement": "warn",
  Critical: "bad",
};

export function Chip({ tone = "none", children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "mono inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10.5px] uppercase tracking-[0.18em]",
        toneChip[tone],
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", toneBg[tone])} />
      {children}
    </span>
  );
}

/* ---------- Check icon ---------- */
export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}
