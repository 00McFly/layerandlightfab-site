"use client";

import { Fragment, useRef, type CSSProperties } from "react";
import { passing, useScrollScene } from "@/lib/scroll";
import { Reveal } from "./Reveal";

// From James Sleeth, founder.
const TEXT =
  "Layer & Light Fabrication combines digital precision with old-school craftsmanship to build custom props, displays, and one-of-a-kind pieces. With decades of professional prop-making experience, we handle every stage in-house, from first print to final finish.";
const LIT = new Set(["in-house,"]);
const measure = passing(0.85, 0.2);

/** About: the paragraph lights up word by word as it scrolls past. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  useScrollScene(ref, measure);
  const words = TEXT.split(" ");

  return (
    <section id="about" className="wrap py-28 sm:py-40" aria-labelledby="about-title">
      <Reveal className="eyebrow"><b>01</b>The shop</Reveal>
      <Reveal as="h2" id="about-title" className="display mt-6 text-[clamp(28px,4.4vw,60px)]">
        From concept to finished piece, <span className="lit">under one roof.</span>
      </Reveal>
      <p
        ref={ref}
        className="statement mt-10 max-w-[38ch] font-display text-[clamp(20px,2.6vw,34px)] font-light leading-[1.4] tracking-[0.02em] text-steel-100"
        style={{ "--n": words.length } as CSSProperties}
      >
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className={`w ${LIT.has(w) ? "lit" : ""}`} style={{ "--i": i } as CSSProperties}>
              {w}
            </span>{" "}
          </Fragment>
        ))}
      </p>
      <div className="mt-14 grid gap-8 border-t border-[var(--border-subtle)] pt-10 sm:grid-cols-3">
        {[
          ["No two projects alike", "Every job begins with an idea, a challenge, or a vision."],
          ["One piece or a whole install", "The same precision for a single custom piece or a larger installation."],
          ["Themed entertainment roots", "Years in the attraction industry, including extensive work at Universal Studios."],
        ].map(([t, d], i) => (
          <Reveal key={t} delay={i * 90}>
            <div className="font-display text-[14px] uppercase tracking-[0.14em] text-steel-100">{t}</div>
            <p className="mt-2 text-[15px]">{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
