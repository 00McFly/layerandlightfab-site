import type { Icon } from "@phosphor-icons/react";
import { ArrowRight, ArrowsClockwise, Cube, Drop, Lightbulb, Printer, Sparkle, Stack } from "@phosphor-icons/react/dist/ssr";
import { capabilities } from "@/content/capabilities";
import { Reveal } from "./Reveal";

const icons: Record<(typeof capabilities)[number]["icon"], Icon> = {
  cube: Cube,
  printer: Printer,
  stack: Stack,
  drop: Drop,
  rotate: ArrowsClockwise,
  sparkle: Sparkle,
  lightbulb: Lightbulb,
};

/** The shop's processes, each handled in-house. Seven cards plus a closing card that points to contact. */
export function Capabilities() {
  return (
    <section id="capabilities" className="wrap pt-32" aria-labelledby="capabilities-title">
      <Reveal className="eyebrow"><b>03</b>Our capabilities</Reveal>
      <Reveal as="h2" id="capabilities-title" className="h2 mt-4">From first print to final finish</Reveal>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((c, i) => {
          const I = icons[c.icon];
          return (
            <Reveal
              as="li"
              key={c.id}
              delay={(i % 4) * 70}
              className="group flex flex-col rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-void-200 p-6 transition-colors duration-200 hover:border-[var(--border-lit)]"
            >
              <div className="flex items-center justify-between">
                <I size={30} weight="light" className="text-light-400 transition-[filter] duration-200 group-hover:drop-shadow-[0_0_10px_rgba(229,185,111,.6)]" />
                <span className="font-mono text-[12px] text-steel-600">0{i + 1}</span>
              </div>
              <h3 className="mt-8 font-display text-[15px] uppercase tracking-[0.12em] text-steel-100 transition-colors group-hover:text-light-100">
                {c.title}
              </h3>
              <p className="mt-2 text-[15px]">{c.body}</p>
            </Reveal>
          );
        })}
        <Reveal as="li" delay={210} className="sm:col-span-2 lg:col-span-1">
          <a
            href="#contact"
            className="group flex h-full min-h-[180px] flex-col justify-end gap-3 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[image:var(--gradient-halo)] p-6 transition-colors hover:border-[var(--border-lit)]"
          >
            <span className="eyebrow">Something else?</span>
            <span className="flex items-center gap-3 font-display text-[17px] uppercase tracking-[0.1em] text-light-100">
              Bring us your idea <ArrowRight size={18} className="transition-transform group-hover:translate-x-[3px]" />
            </span>
          </a>
        </Reveal>
      </ul>
    </section>
  );
}
