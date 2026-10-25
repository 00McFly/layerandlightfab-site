"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { categoryLabel, type WorkItem } from "@/content/gallery";
import { Photo } from "./Photo";

/** Full-screen photo viewer on a native <dialog>: Esc closes, arrows step, swipe on touch, focus returns to the opener. */
export function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: WorkItem[];
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);
  const open = index !== null;
  const item = open ? items[index] : null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      opener.current = document.activeElement;
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  const step = useCallback(
    (dir: number) => index !== null && onIndex((index + dir + items.length) % items.length),
    [index, items.length, onIndex],
  );

  // Warm the neighbours so stepping feels instant.
  useEffect(() => {
    if (index === null) return;
    [items[(index + 1) % items.length], items[(index - 1 + items.length) % items.length]].forEach((n) => {
      if (n?.src) new Image().src = `${n.src}-1800.webp`;
    });
  }, [index, items]);

  const close = useCallback(() => ref.current?.close(), []);
  const touchX = useRef<number | null>(null);
  const ratio = item?.width && item?.height ? item.width / item.height : 4 / 3;

  return (
    <dialog
      ref={ref}
      aria-label="Photo viewer"
      onClose={() => {
        document.documentElement.style.overflow = "";
        onClose();
        (opener.current as HTMLElement | null)?.focus?.();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      onClick={(e) => e.target === e.currentTarget && close()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-black/90 p-0 text-steel-300 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      {item && (
        <div className="grid h-full grid-rows-[1fr_auto] gap-4 p-3 sm:p-8" onClick={(e) => e.target === e.currentTarget && close()}>
          <div className="grid min-h-0 place-items-center" onClick={(e) => e.target === e.currentTarget && close()}>
            <div
              className="relative max-h-full w-full overflow-hidden rounded-[var(--radius-card)]"
              style={{ aspectRatio: ratio, maxWidth: `min(100%, calc((100dvh - 170px) * ${ratio}))` }}
            >
              <Photo item={item} size="full" fit="contain" eager />
            </div>
          </div>
          <div className="wrap flex w-full items-center justify-between gap-4 !px-0">
            <div className="min-w-0">
              <div className="truncate font-display text-[15px] uppercase tracking-[0.12em] text-steel-100">
                {item.title || categoryLabel(item.category)}
              </div>
              <div className="spec">
                {index! + 1} / {items.length}
                {item.spec ? ` · ${item.spec}` : item.src ? "" : " · Photo coming soon"}
              </div>
              {item.description && <p className="mt-1 max-w-[60ch] text-sm">{item.description}</p>}
            </div>
            <div className="flex shrink-0 gap-2">
              <RoundButton label="Previous photo" onClick={() => step(-1)}><ArrowLeft size={18} /></RoundButton>
              <RoundButton label="Next photo" onClick={() => step(1)}><ArrowRight size={18} /></RoundButton>
              <RoundButton label="Close" onClick={close} autoFocus><X size={18} /></RoundButton>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

function RoundButton({ label, onClick, autoFocus, children }: { label: string; onClick: () => void; autoFocus?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      autoFocus={autoFocus}
      className="grid size-11 place-items-center rounded-full border border-[var(--border-default)] bg-void-200 text-steel-100 transition-colors hover:border-[var(--border-lit)] hover:text-light-100"
    >
      {children}
    </button>
  );
}
