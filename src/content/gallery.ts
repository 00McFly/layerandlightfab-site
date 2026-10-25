import data from "./gallery.json";

// One entry per photo. `src` is the base path written by `npm run photos` (e.g. "/work/hero-lantern");
// the site loads `${src}-800.webp` in grids and `${src}-1800.webp` in the lightbox.
// An entry with `src: null` renders as a labelled placeholder, never a stand-in image.
export type WorkItem = {
  id: string;
  title: string;
  category: CategoryId;
  spec: string; // mono line, e.g. "Resin · 14 parts · 420 mm"
  alt: string;
  description?: string;
  featured: boolean; // shows in the sideways "Selected work" strip
  src: string | null;
  width: number | null;
  height: number | null;
};

export const categories = [
  { id: "props", label: "Props" },
  { id: "3d-printing", label: "3D Printing" },
  { id: "uv-printing", label: "UV Printing" },
  { id: "themed", label: "Themed" },
  { id: "design", label: "Design" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export const categoryLabel = (id: CategoryId) => categories.find((c) => c.id === id)?.label ?? id;

export const work = data as WorkItem[];
export const featuredWork = (() => {
  const f = work.filter((w) => w.featured);
  return (f.length ? f : work).slice(0, 12);
})();
