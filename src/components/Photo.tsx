import { categoryLabel, type WorkItem } from "@/content/gallery";

/**
 * A work photo, or an honest labelled placeholder when the slot has no photo yet.
 * Fills its parent (absolute inset-0), so the parent sets the aspect ratio.
 */
export function Photo({
  item,
  size = "grid",
  sizes = "(max-width: 640px) 50vw, 25vw",
  fit = "cover",
  label,
  eager = false,
}: {
  item: Pick<WorkItem, "id" | "src" | "alt" | "title" | "category" | "width" | "height">;
  size?: "grid" | "full";
  sizes?: string;
  fit?: "cover" | "contain";
  label?: string;
  eager?: boolean;
}) {
  if (item.src) {
    const small = `${item.src}-800.webp`;
    const large = `${item.src}-1800.webp`;
    return (
      // eslint-disable-next-line @next/next/no-img-element -- static export; sizes are pre-built by scripts/sync-photos.mjs
      <img
        src={size === "full" ? large : small}
        srcSet={`${small} 800w, ${large} 1800w`}
        sizes={size === "full" ? "100vw" : sizes}
        width={item.width ?? undefined}
        height={item.height ?? undefined}
        alt={item.alt || item.title}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={`absolute inset-0 h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"}`}
      />
    );
  }
  const slot = item.id.replace(/^slot-/, "");
  return (
    <div className="placeholder absolute inset-0" role="img" aria-label={`Photo placeholder: ${categoryLabel(item.category)}`}>
      <div className="absolute inset-0 grid place-items-center font-display text-[10px] font-medium uppercase tracking-[0.3em] text-steel-700">
        Photo placeholder
      </div>
      <div className="absolute inset-x-3.5 bottom-3 flex justify-between gap-2 font-mono text-[11px] text-steel-500 max-sm:text-[9px]">
        <span className="text-light-400">{label ?? categoryLabel(item.category)}</span>
        <span>{/^\d+$/.test(slot) ? `Slot ${slot}` : ""}</span>
      </div>
    </div>
  );
}
