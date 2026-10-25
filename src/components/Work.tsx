"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { categories, categoryLabel, featuredWork, work, type CategoryId, type WorkItem } from "@/content/gallery";
import { pinned, useScrollScene } from "@/lib/scroll";
import { Lightbox } from "./Lightbox";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";

const PAGE = 16;

/** "Selected work" pinned sideways strip, then the full filterable gallery. Both open one shared lightbox. */
export function Work() {
  const [viewer, setViewer] = useState<{ items: WorkItem[]; index: number } | null>(null);
  const open = (items: WorkItem[], index: number) => setViewer({ items, index });

  return (
    <>
      <Strip onOpen={open} />
      <Gallery onOpen={open} />
      <Lightbox
        items={viewer?.items ?? []}
        index={viewer?.index ?? null}
        onIndex={(index) => setViewer((v) => v && { ...v, index })}
        onClose={() => setViewer(null)}
      />
    </>
  );
}

function Strip({ onOpen }: { onOpen: (items: WorkItem[], i: number) => void }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const items = featuredWork;

  // The section is as tall as the strip is wide, so scrolling down walks the strip sideways.
  useEffect(() => {
    const s = section.current, t = track.current;
    if (!s || !t || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Phones travel faster so the strip doesn't eat seven screens of scrolling.
    const size = () => (s.style.height = `${(t.scrollWidth - innerWidth) * (innerWidth < 760 ? 0.6 : 1) + innerHeight * 1.25}px`);
    size();
    const ro = new ResizeObserver(size);
    ro.observe(t);
    addEventListener("resize", size);
    return () => {
      ro.disconnect();
      removeEventListener("resize", size);
    };
  }, []);

  useScrollScene(section, pinned, (p) => {
    const t = track.current;
    if (!t) return;
    // Hold still for the first and last slice so the strip settles before and after it travels.
    const q = Math.min(1, Math.max(0, (p - 0.08) / 0.84));
    t.style.transform = `translate3d(${-q * (t.scrollWidth - innerWidth)}px,0,0)`;
    if (count.current) count.current.textContent = `${String(Math.min(items.length, Math.floor(q * items.length) + 1)).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;
  });

  return (
    <section ref={section} className="pin strip" id="work" aria-labelledby="work-title">
      <div className="stick flex flex-col justify-center gap-7">
        <div className="wrap flex w-full items-end justify-between gap-4">
          <div>
            <div className="eyebrow"><b>04</b>Selected work</div>
            <h2 id="work-title" className="h2 mt-4">From idea to object</h2>
          </div>
          <span ref={count} className="shrink-0 whitespace-nowrap font-mono text-[13px] text-light-400" aria-hidden>
            01 / {String(items.length).padStart(2, "0")}
          </span>
        </div>
        <div ref={track} className="track flex gap-4 px-[var(--container-pad)]">
          {items.map((it, i) => {
            const r = it.width && it.height ? it.width / it.height : [4 / 5, 3 / 2, 1, 4 / 3, 2 / 3, 16 / 10][i % 6];
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => onOpen(items, i)}
                aria-label={`Open ${it.title || categoryLabel(it.category)}`}
                className="group relative h-[min(56vh,520px)] flex-none cursor-zoom-in overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-subtle)] transition-colors hover:border-[var(--border-lit)] max-sm:h-[50vh]"
                style={{ aspectRatio: r }}
              >
                <div className="absolute inset-0 transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03]">
                  <Photo item={it} sizes="(max-width: 640px) 80vw, 40vw" />
                </div>
                {it.title && <Caption item={it} />}
              </button>
            );
          })}
          <a
            href="#all-work"
            className="flex h-[min(56vh,520px)] w-[min(70vw,320px)] flex-none flex-col justify-end gap-3 rounded-[var(--radius-card)] border border-[var(--border-default)] p-7 transition-colors hover:border-[var(--border-lit)] max-sm:h-[50vh]"
          >
            <span className="eyebrow">{work.length} pieces</span>
            <span className="flex items-center gap-3 font-display text-xl uppercase tracking-[0.1em] text-steel-100">
              See all work <ArrowRight size={20} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Caption({ item }: { item: WorkItem }) {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-12 text-left opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
      <div className="font-display text-[13px] uppercase tracking-[0.12em] text-steel-100">{item.title}</div>
      {item.spec && <div className="spec mt-0.5">{item.spec}</div>}
    </div>
  );
}

function Gallery({ onOpen }: { onOpen: (items: WorkItem[], i: number) => void }) {
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [shown, setShown] = useState(PAGE);
  const items = useMemo(() => (filter === "all" ? work : work.filter((w) => w.category === filter)), [filter]);
  const present = categories.filter((c) => work.some((w) => w.category === c.id));

  return (
    <section id="all-work" className="wrap pt-24" aria-labelledby="all-work-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal className="eyebrow"><b>05</b>All work</Reveal>
          <Reveal as="h2" id="all-work-title" className="h2 mt-4">One layer at a time</Reveal>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {[{ id: "all" as const, label: "All" }, ...present].map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              aria-pressed={filter === c.id}
              onClick={() => {
                setFilter(c.id);
                setShown(PAGE);
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-3 lg:grid-cols-4">
        {items.slice(0, shown).map((it, i) => (
          <li key={`${filter}-${it.id}`}>
            <Reveal delay={(i % 4) * 60}>
              <button
                type="button"
                onClick={() => onOpen(items, i)}
                aria-label={`Open ${it.title || categoryLabel(it.category)}`}
                className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-subtle)] transition-colors hover:border-[var(--border-lit)]"
              >
                <div className="absolute inset-0 transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.04]">
                  <Photo item={it} />
                </div>
                {it.title && <Caption item={it} />}
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {items.length > shown && (
        <div className="mt-10 flex justify-center">
          <button type="button" className="btn" onClick={() => setShown((s) => s + PAGE)}>
            Show more · {items.length - shown}
          </button>
        </div>
      )}
    </section>
  );
}
