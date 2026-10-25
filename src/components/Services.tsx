"use client";

import { useRef, type CSSProperties } from "react";
import { Cube, FilmSlate, Hammer, LightbulbFilament, Printer, type Icon } from "@phosphor-icons/react";
import { categories, work } from "@/content/gallery";
import { services } from "@/content/services";
import { clamp, useScrollScene } from "@/lib/scroll";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

const icons: Record<string, Icon> = {
  props: Hammer,
  "3d-printing": Cube,
  "uv-printing": Printer,
  design: LightbulbFilament,
  themed: FilmSlate,
};

/** Services as stacked layers: each card pins below the last, and the one underneath steps back as the next lands. */
export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollScene(
    ref,
    () => 0,
    (_, el) => {
      const cards = [...el.children] as HTMLElement[];
      cards.forEach((c, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const t = clamp(1 - (next.getBoundingClientRect().top - 120) / innerHeight);
        c.style.setProperty("--s", (1 - t * 0.05).toFixed(4));
      });
    },
  );

  return (
    <section id="services" className="wrap pb-16" aria-labelledby="services-title">
      <Reveal className="eyebrow"><b>02</b>What we do</Reveal>
      <Reveal as="h2" id="services-title" className="h2 mt-4 mb-10">Five disciplines, one shop</Reveal>
      <div ref={ref}>
        {services.map((s, i) => {
          const I = icons[s.id] ?? Hammer;
          const photo = s.image ? work.find((w) => w.src === s.image) : undefined;
          const cat = categories.find((c) => c.id === s.id)?.id ?? "props";
          return (
            <article
              key={s.id}
              className="layer-card mb-[18vh] grid overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-default)] bg-void-200 last:mb-0 md:min-h-[min(62vh,520px)] md:grid-cols-[1fr_1.1fr] max-md:mb-[10vh]"
              style={{ "--i": i } as CSSProperties}
            >
              <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
                <div className="flex items-center gap-4">
                  <I size={28} weight="light" className="text-light-400" style={{ filter: "drop-shadow(0 0 8px rgba(229,185,111,.35))" }} />
                  <span className="eyebrow"><b>0{i + 1}</b></span>
                </div>
                <h3 className="mt-5 font-display text-[clamp(22px,2.6vw,34px)] uppercase leading-[1.15] tracking-[0.08em] text-steel-100">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[48ch]">{s.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[220px] border-[var(--border-subtle)] max-md:order-first max-md:aspect-[16/10] md:border-l">
                <Photo
                  item={photo ?? { id: s.id, src: null, alt: "", title: s.title, category: cat, width: null, height: null }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  label={s.title}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
