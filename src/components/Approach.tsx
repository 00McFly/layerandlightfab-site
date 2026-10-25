"use client";

import { useRef } from "react";
import { passing, useScrollScene } from "@/lib/scroll";
import { Reveal } from "./Reveal";

const steps = [
  ["Idea", "Every job begins with an idea, a challenge, or a vision. Send sketches, references, a file, or just a description."],
  ["Engineer", "Creative thinking meets technical expertise: materials, sizes, CAD and the right process for the piece."],
  ["Build", "Precision, function and detail, whether it's a single custom piece or components for a larger installation."],
  ["Deliver", "Finished, checked and ready for the shelf, the stage or the attraction."],
];
const measure = passing(0.75, -0.1);

/** How a job runs, with a lit line that fills as you read down. */
export function Approach() {
  const line = useRef<HTMLDivElement>(null);
  useScrollScene(line, measure);

  return (
    <section id="approach" className="wrap pt-32" aria-labelledby="approach-title">
      <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal className="eyebrow"><b>06</b>Our approach</Reveal>
          <Reveal as="h2" id="approach-title" className="h2 mt-4">How a job runs</Reveal>
          <Reveal as="p" className="mt-5 max-w-[42ch]">
            No two projects are exactly alike. Each one gets the same commitment to precision, function and detail.
          </Reveal>
        </div>
        <ol className="relative grid gap-10 pl-10">
          <div className="absolute top-1 bottom-1 left-[7px] w-px bg-[var(--border-default)]" aria-hidden>
            <div ref={line} className="approach-line h-full w-px bg-light-400 shadow-[0_0_12px_rgba(229,185,111,.6)]" />
          </div>
          {steps.map(([t, d], i) => (
            <Reveal as="li" key={t} className="relative">
              <span className="absolute top-1 -left-10 grid size-[15px] place-items-center rounded-full border border-[var(--border-lit)] bg-void-0">
                <span className="size-[5px] rounded-full bg-light-400" />
              </span>
              <div className="font-mono text-[13px] text-light-400">0{i + 1}</div>
              <div className="mt-1 font-display text-[18px] uppercase tracking-[0.12em] text-steel-100">{t}</div>
              <p className="mt-2 max-w-[52ch]">{d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
