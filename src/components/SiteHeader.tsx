"use client";

import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { mailto } from "@/content/site";

const links = [
  ["Services", "#services"],
  ["Capabilities", "#capabilities"],
  ["Work", "#work"],
  ["Approach", "#approach"],
  ["Contact", "#contact"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-black/80 backdrop-blur-md">
      <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
        <a href="#top" aria-label="Layer & Light Fabrication, back to top" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- small brand PNG on a black ground */}
          <img src="/brand/logo-wordmark.png" alt="Layer & Light Fabrication" width={1236} height={210} className="h-[22px] w-auto sm:h-[26px]" />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="font-display text-[11px] font-medium uppercase tracking-[0.24em] text-steel-500 transition-colors hover:text-light-100">
              {l}
            </a>
          ))}
          <a className="btn btn-primary btn-sm" href={mailto()}>Start a project</a>
        </nav>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-[var(--border-default)] text-steel-100 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} /> : <List size={18} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="wrap grid gap-1 border-t border-[var(--border-subtle)] pt-3 pb-6 lg:hidden">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 font-display text-[13px] uppercase tracking-[0.24em] text-steel-100">
              {l}
            </a>
          ))}
          <a className="btn btn-primary mt-3" href={mailto()} onClick={() => setOpen(false)}>Start a project</a>
        </nav>
      )}
    </header>
  );
}
