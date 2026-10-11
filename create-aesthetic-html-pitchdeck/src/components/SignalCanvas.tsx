import { useEffect, useRef } from "react";

/** A restrained generative signal field with no literal chart meaning. */
export function SignalCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onPointer = (e: PointerEvent) => {
      targetX = (e.clientX / Math.max(width, 1) - 0.5) * 18;
      targetY = (e.clientY / Math.max(height, 1) - 0.5) * 18;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const motes = Array.from({ length: 42 }, (_, i) => ({
      lane: i % 18,
      phase: (i * 0.61803398875) % 1,
      speed: 0.00005 + ((i * 17) % 11) * 0.000008,
      radius: 0.7 + ((i * 13) % 8) * 0.14,
    }));

    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    observer.observe(canvas);

    const point = (lane: number, t: number, time: number) => {
      const mobile = width < 760;
      const focusX = (mobile ? 0.7 : 0.76) * width + pointerX;
      const focusY = 0.42 * height + pointerY;
      const spread = mobile ? height * 0.72 : height * 0.82;
      const laneY = (lane / 17 - 0.5) * spread;
      const x = -width * 0.08 + t * width * 1.18;
      const dx = (x - focusX) / Math.max(width, 1);
      const pull = Math.exp(-Math.pow(dx * 3.15, 2));
      const drift = Math.sin(t * Math.PI * 2 + lane * 0.47 + time * 0.08) * 6;
      return { x, y: focusY + laneY * (1 - pull * 0.88) + drift };
    };

    const strokePath = (lane: number, time: number) => {
      ctx.beginPath();
      for (let step = 0; step <= 130; step++) {
        const p = point(lane, step / 130, time);
        if (step === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const time = now * 0.001;
      pointerX += (targetX - pointerX) * 0.035;
      pointerY += (targetY - pointerY) * 0.035;
      ctx.clearRect(0, 0, width, height);

      const mobile = width < 760;
      const fx = (mobile ? 0.7 : 0.76) * width + pointerX;
      const fy = 0.42 * height + pointerY;

      ctx.save();
      ctx.translate(fx, fy);
      ctx.rotate(time * 0.018);
      [76, 132, 205].forEach((radius, i) => {
        ctx.beginPath();
        ctx.ellipse(0, 0, radius * (mobile ? 0.72 : 1), radius, 0.34 + i * 0.13, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,255,46,${0.12 - i * 0.025})`;
        ctx.lineWidth = 1;
        ctx.setLineDash(i === 1 ? [4, 10] : i === 2 ? [1, 13] : []);
        ctx.lineDashOffset = time * (i + 1) * 3;
        ctx.stroke();
      });
      ctx.restore();
      ctx.setLineDash([]);

      for (let lane = 0; lane < 18; lane++) {
        const distance = Math.abs(lane - 8.5) / 8.5;
        ctx.strokeStyle = `rgba(243,241,234,${0.035 + (1 - distance) * 0.055})`;
        ctx.lineWidth = lane === 8 || lane === 9 ? 1.1 : 0.7;
        strokePath(lane, time);
      }

      ctx.strokeStyle = "rgba(200,255,46,0.42)";
      ctx.lineWidth = 1.35;
      ctx.shadowColor = "rgba(200,255,46,0.5)";
      ctx.shadowBlur = 10;
      strokePath(9, time);
      ctx.shadowBlur = 0;

      ctx.globalCompositeOperation = "lighter";
      for (const mote of motes) {
        const t = (mote.phase + now * mote.speed) % 1;
        const p = point(mote.lane, t, time);
        const central = Math.abs(mote.lane - 8.5) < 2.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, central ? mote.radius * 1.3 : mote.radius, 0, Math.PI * 2);
        ctx.fillStyle = central ? "rgba(200,255,46,0.9)" : "rgba(243,241,234,0.36)";
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      const glow = ctx.createRadialGradient(fx, fy, 0, fx, fy, mobile ? 130 : 220);
      glow.addColorStop(0, "rgba(200,255,46,0.17)");
      glow.addColorStop(0.35, "rgba(200,255,46,0.055)");
      glow.addColorStop(1, "rgba(200,255,46,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(fx - 240, fy - 240, 480, 480);

      ctx.beginPath();
      ctx.arc(fx, fy, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#c8ff2e";
      ctx.shadowColor = "#c8ff2e";
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}