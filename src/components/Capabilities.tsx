import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { capabilities } from "@/content/capabilities";
import { ProcessLoop } from "./ProcessLoop";
import { Reveal } from "./Reveal";

/** The shop's processes, each handled in-house. Seven cards, each with a short process animation, plus a closing card that points to contact. */
export function Capabilities() {
  return (
    <section id="capabilities" className="wrap pt-32" aria-labelledby="capabilities-title">
      <Reveal className="eyebrow"><b>03</b>Our capabilities</Reveal>
      <Reveal as="h2" id="capabilities-title" className="h2 mt-4">From first print to final finish</Reveal>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((c, i) => {
          return (
            <Reveal
              as="li"
              key={c.id}
              delay={(i % 4) * 70}
              className="group flex flex-col rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-void-200 p-6 transition-colors duration-200 hover:border-[var(--border-lit)]"
            >
              <div className="relative -mx-6 -mt-6 aspect-[16/10] overflow-hidden rounded-t-[var(--radius-card)] border-b border-[var(--border-subtle)]">
                <ProcessLoop kind={c.id} label={c.title} offset={i * 1.3} />
                <span className="absolute right-3.5 top-3 font-mono text-[12px] text-steel-600">0{i + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-[15px] uppercase tracking-[0.12em] text-steel-100 transition-colors group-hover:text-light-100">
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
