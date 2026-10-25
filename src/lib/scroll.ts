"use client";

import { useEffect, useState, type RefObject } from "react";

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

const REDUCED = "(prefers-reduced-motion: reduce)";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = matchMedia(REDUCED);
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

/** 0 when the element's top reaches the viewport top, 1 when its bottom reaches the viewport bottom. For tall pinned sections. */
export const pinned = (r: DOMRect) => clamp(-r.top / Math.max(1, r.height - innerHeight));

/** 0 as the element's top passes `start` (fraction of viewport height), 1 when its top reaches `end`. */
export const passing = (start = 0.9, end = 0.3) => (r: DOMRect) =>
  clamp((innerHeight * start - r.top) / (innerHeight * (start - end)));

/**
 * Writes scroll progress to `--p` on the element every animation frame while scrolling, without React re-renders.
 * `onProgress` runs in the same frame for scenes that need more than one variable. Does nothing under reduced motion.
 */
export function useScrollScene<T extends HTMLElement>(
  ref: RefObject<T | null>,
  measure: (r: DOMRect) => number,
  onProgress?: (p: number, el: T) => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia(REDUCED).matches) return;
    let frame = 0;
    const run = () => {
      frame = 0;
      const p = measure(el.getBoundingClientRect());
      el.style.setProperty("--p", p.toFixed(4));
      onProgress?.(p, el);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    run();
    addEventListener("scroll", queue, { passive: true });
    addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("scroll", queue);
      removeEventListener("resize", queue);
    };
    // measure/onProgress are module-level or stable per scene; re-binding on every render is not wanted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}
