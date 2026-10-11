import { useEffect, useRef } from "react";
import { cn } from "../utils/cn";

export type SlideInfo = { id: string; title: string; chapter: string };

const pad = (n: number) => String(n).padStart(2, "0");

/* Trailing ring cursor + card spotlight tracking */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let big = false;
    let raf = 0;
    let shown = false;

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const t = e.target as HTMLElement | null;
      if (t && t.closest) {
        big = !!t.closest("a,button,[data-hover]");
        const spot = t.closest<HTMLElement>(".spot");
        if (spot) {
          const r = spot.getBoundingClientRect();
          spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
          spot.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
      }
      if (!shown && ring.current) {
        shown = true;
        x = tx;
        y = ty;
        ring.current.style.opacity = "1";
      }
    };
    window.addEventListener("pointermove", move);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!fine || !ring.current) return;
      x += (tx - x) * 0.17;
      y += (ty - y) * 0.17;
      ring.current.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${big ? 2.1 : 1})`;
    };
    loop();
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      style={{ opacity: 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden h-9 w-9 rounded-full border border-lime/80 mix-blend-difference transition-[opacity] duration-300 [@media(pointer:fine)]:block"
    />
  );
}

export function Chrome({
  slides,
  active,
  progress,
  menuOpen,
  setMenu,
  go,
}: {
  slides: SlideInfo[];
  active: number;
  progress: number;
  menuOpen: boolean;
  setMenu: (v: boolean) => void;
  go: (i: number) => void;
}) {
  const cur = slides[active];
  const total = slides.length;

  return (
    <>
      {/* progress */}
      <div className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-white/5">
        <div
          className="h-full origin-left bg-lime shadow-[0_0_18px_rgba(200,255,46,0.9)]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* top bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex items-start justify-between px-6 pb-10 pt-6 sm:px-10 lg:px-16 bg-gradient-to-b from-void via-void/70 to-transparent">
        <button
          onClick={() => go(0)}
          className="pointer-events-auto flex items-center gap-3 text-left"
          aria-label="Back to cover"
        >
          <span className="display flex h-9 w-9 items-center justify-center rounded-full bg-lime text-[15px] text-void">
            DM
          </span>
          <span className="mono hidden text-[10.5px] uppercase leading-tight tracking-[0.2em] text-ink/70 sm:block">
            Meta Ads Analysis
            <br />
            <span className="text-ink/35">& Growth Strategy</span>
          </span>
        </button>

        <div className="pointer-events-auto flex items-center gap-5">
          <div className="mono hidden text-[11px] uppercase tracking-[0.22em] text-ink/50 md:block">
            <span className="text-lime">{pad(active + 1)}</span> / {pad(total)}
          </div>
          <button
            onClick={() => setMenu(true)}
            className="mono group flex items-center gap-3 rounded-full border border-white/15 bg-void/60 px-4 py-2 text-[10.5px] uppercase tracking-[0.22em] text-ink backdrop-blur transition hover:border-lime hover:text-lime"
          >
            Index
            <span className="flex flex-col gap-[3px]">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-3 bg-current transition-all group-hover:w-4" />
            </span>
          </button>
        </div>
      </div>

      {/* bottom-left: current slide */}
      <div className="pointer-events-none fixed bottom-6 left-6 z-[60] flex items-center gap-4 sm:left-10 lg:left-16">
        <div className="mono text-[10.5px] uppercase tracking-[0.22em] text-ink/45">
          <span className="text-lime">{cur?.chapter}</span>
          <span className="mx-2 text-ink/20">—</span>
          {cur?.title}
        </div>
      </div>
      <div className="pointer-events-none fixed bottom-6 right-6 z-[60] hidden items-center gap-3 sm:right-10 md:flex lg:right-16">
        <span className="mono text-[10px] uppercase tracking-[0.22em] text-ink/35">Navigate</span>
        <kbd className="mono rounded border border-white/15 px-2 py-0.5 text-[10px] text-ink/60">←</kbd>
        <kbd className="mono rounded border border-white/15 px-2 py-0.5 text-[10px] text-ink/60">→</kbd>
      </div>

      {/* side dots */}
      <nav className="fixed right-3 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-end gap-[7px] xl:flex" aria-label="Slides">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            title={s.title}
            aria-label={s.title}
            className="group flex h-2.5 items-center justify-end"
          >
            <span
              className={cn(
                "block h-[3px] rounded-full transition-all duration-500",
                i === active ? "w-7 bg-lime" : "w-2.5 bg-white/20 group-hover:w-5 group-hover:bg-white/60"
              )}
            />
          </button>
        ))}
      </nav>

      {/* index overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[90] overflow-y-auto bg-void/95 backdrop-blur-xl transition-all duration-500",
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 sm:px-10">
          <div className="flex items-center justify-between">
            <div className="mono text-[11px] uppercase tracking-[0.28em] text-lime">Index — {pad(total)} slides</div>
            <button
              onClick={() => setMenu(false)}
              className="mono rounded-full border border-white/20 px-4 py-2 text-[10.5px] uppercase tracking-[0.22em] transition hover:border-lime hover:text-lime"
            >
              Close ✕
            </button>
          </div>
          <div className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setMenu(false);
                  go(i);
                }}
                className="group flex items-baseline gap-4 border-t border-white/10 py-4 text-left"
              >
                <span className={cn("mono text-[11px] tracking-[0.2em]", i === active ? "text-lime" : "text-ink/35")}>{pad(i + 1)}</span>
                <span className="flex-1">
                  <span className="mono block text-[10px] uppercase tracking-[0.22em] text-ink/35">{s.chapter}</span>
                  <span className="display block text-[clamp(1.3rem,2vw,1.9rem)] leading-[1] text-ink transition group-hover:text-lime">
                    {s.title}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
