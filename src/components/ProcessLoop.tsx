"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LOOPS, LOOP_SECONDS, type LoopKind } from "@/lib/process-loops";

/**
 * A short looping SVG animation of one shop process (stands in for a photo).
 * Fills its parent (absolute inset-0), so the parent sets the aspect ratio — same contract as <Photo>.
 * Only animates while on screen; shows a finished still frame for reduced-motion visitors.
 */
export function ProcessLoop({ kind, label, offset = 0 }: { kind: LoopKind; label: string; offset?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [step, setStep] = useState<string>(LOOPS[kind].steps[0]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.replaceChildren();
    const loop = LOOPS[kind];
    const render = loop.fn(svg, `pl${uid}`);
    let shown = "";
    const paint = (t: number) => {
      const r = render(t);
      const s = r.tag ?? loop.steps[r.step];
      if (s !== shown) { shown = s; setStep(s); }
    };
    const still = () => { for (let t = 0; t <= loop.still; t += 1 / 60) paint(t); };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false, raf = 0, start: number | null = null;
    const frame = (now: number) => {
      if (start === null) start = now;
      paint(((now - start) / 1000 + offset) % LOOP_SECONDS);
      raf = requestAnimationFrame(frame);
    };
    const sync = () => {
      cancelAnimationFrame(raf);
      start = null;
      if (visible && !reduce.matches) raf = requestAnimationFrame(frame);
    };
    still();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { rootMargin: "80px" });
    io.observe(svg);
    const onReduce = () => { if (reduce.matches) still(); sync(); };
    reduce.addEventListener("change", onReduce);
    return () => { io.disconnect(); reduce.removeEventListener("change", onReduce); cancelAnimationFrame(raf); };
  }, [kind, offset, uid]);

  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,var(--color-void-100),var(--color-void-0)_70%)]">
      <svg
        ref={svgRef}
        viewBox="0 0 400 250"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={`Animation of the ${label.toLowerCase()} process: ${LOOPS[kind].steps.join(", ").toLowerCase()}.`}
      />
      <div className="pointer-events-none absolute inset-x-3.5 bottom-2.5 flex justify-between gap-2 font-mono text-[11px] max-sm:text-[9px]">
        <span className="text-light-400">{step}</span>
      </div>
    </div>
  );
}
