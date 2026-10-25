"use client";

import { useRef, type CSSProperties } from "react";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { mailto } from "@/content/site";
import { pinned, useScrollScene } from "@/lib/scroll";
import { LogoMark } from "./LogoMark";

const at = (v: number) => ({ "--at": v }) as CSSProperties;

/** Pinned opener: the mark's layers slide together and light up, then the headline lands word by word. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  // Keep the not-yet-visible links out of the tab order until they fade in.
  useScrollScene(ref, pinned, (p, el) => {
    const late = el.querySelector<HTMLElement>(".late");
    if (late) late.inert = p < 0.74;
  });

  return (
    <section ref={ref} className="pin hero" aria-labelledby="hero-title">
      <div className="stick">
        <div className="wrap w-full pt-[var(--header-h)]">
          <p className="eyebrow early absolute inset-x-0 top-[calc(var(--header-h)+8vh)] justify-center px-4">Custom fabrication · Creative production</p>
          <LogoMark className="mark" />
          <h1 id="hero-title" className="display mt-9 text-[clamp(30px,5.4vw,72px)]">
            <span className="word" style={at(0.3)}>Ideas,</span>{" "}
            <span className="word" style={at(0.4)}>built</span>{" "}
            <span className="word lit" style={at(0.5)}>layer by layer.</span>
          </h1>
          <div className="late">
            <p className="mx-auto mt-6 max-w-[52ch] text-[17px]">
              Props, scenic elements, 3D printing and full-color UV printing, built on years in themed entertainment, including
              extensive work at Universal Studios.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a className="btn btn-primary" href={mailto()}>
                Start a project <ArrowRight size={16} />
              </a>
              <a className="btn" href="#work">See the work</a>
            </div>
          </div>
        </div>
        <a
          href="#about"
          className="early absolute inset-x-0 bottom-7 mx-auto flex w-fit flex-col items-center gap-2 font-display text-[10px] uppercase tracking-[0.32em] text-steel-500"
        >
          Scroll <ArrowDown size={14} />
        </a>
      </div>
    </section>
  );
}
