import { useCallback, useEffect, useState } from "react";
import { Chrome, Cursor } from "./components/Chrome";
import type { SlideInfo } from "./components/Chrome";
import { Cover } from "./slides/Cover";
import { Summary } from "./slides/Summary";
import { AccountGrid, AccountFunnel } from "./slides/Account";
import { Method } from "./slides/Method";
import { Scorecard } from "./slides/Scorecard";
import { CampaignPerformance, CampaignPlan } from "./slides/Campaign";
import { AuditIntro, AuditOne, AuditTwo } from "./slides/Audit";
import { RoadmapOct, RoadmapNov } from "./slides/Roadmap";
import { GiftingA, GiftingOffers, KeyDates } from "./slides/Gifting";
import { PathTo4x } from "./slides/Path";
import { Budget } from "./slides/Budget";
import { Kpi } from "./slides/Kpi";
import { Final, Closing } from "./slides/Closing";
import { CAMPAIGNS } from "./data";

export default function App() {
  const [slides, setSlides] = useState<SlideInfo[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [menu, setMenu] = useState(false);

  // collect slides from the DOM so the nav can never drift from the content
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("section[data-slide]"));
    setSlides(
      els.map((el) => ({
        id: el.id,
        title: el.dataset.title || "",
        chapter: el.dataset.chapter || "",
      }))
    );
  }, []);

  const go = useCallback((i: number) => {
    const els = document.querySelectorAll<HTMLElement>("section[data-slide]");
    const el = els[Math.max(0, Math.min(els.length - 1, i))];
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // scroll tracking
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      const els = document.querySelectorAll<HTMLElement>("section[data-slide]");
      const mid = window.innerHeight * 0.5;
      let idx = 0;
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) idx = i;
      });
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [slides.length]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") return setMenu(false);
      if (e.key.toLowerCase() === "i") return setMenu((m) => !m);
      if (menu) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        go(active + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(active - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        go(0);
      } else if (e.key === "End") {
        e.preventDefault();
        go(slides.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, go, menu, slides.length]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  return (
    <div className="bg-void text-ink">
      <Cursor />
      <Chrome slides={slides} active={active} progress={progress} menuOpen={menu} setMenu={setMenu} go={go} />
      <main>
        <Cover />
        <Summary />
        <AccountGrid />
        <AccountFunnel />
        <Method />
        <Scorecard />
        {CAMPAIGNS.map((c) => (
          <div key={c.id} className="contents">
            <CampaignPerformance c={c} />
            <CampaignPlan c={c} />
          </div>
        ))}
        <AuditIntro />
        <AuditOne />
        <AuditTwo />
        <RoadmapOct />
        <RoadmapNov />
        <GiftingA />
        <GiftingOffers />
        <KeyDates />
        <PathTo4x />
        <Budget />
        <Kpi />
        <Final />
        <Closing />
      </main>
    </div>
  );
}
