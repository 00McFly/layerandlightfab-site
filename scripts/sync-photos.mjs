#!/usr/bin/env node
// Turns originals in photos/ into web sizes in public/work/ and keeps src/content/gallery.json in step.
//
//   photos/<category>/<name>.jpg  ->  public/work/<name>-800.webp, <name>-1800.webp
//
// Category comes from the subfolder (props, 3d-printing, uv-printing, themed, design); files at the top
// level default to "props". Existing entries keep their title/spec/alt/featured; new photos are appended
// with empty text for you to fill in. Run with --drop-placeholders to remove the empty "slot-NN" entries.
import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "photos");
const OUT = path.join(root, "public/work");
const DATA = path.join(root, "src/content/gallery.json");
const CATS = ["props", "3d-printing", "uv-printing", "themed", "design"];
const SIZES = [800, 1800];
const EXT = /\.(jpe?g|png|webp|tiff?|avif|heic|heif)$/i;
const drop = process.argv.includes("--drop-placeholders");

const slug = (s) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-");

async function walk(dir, cat = "props") {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const p = path.join(dir, e.name);
    if (e.isDirectory() && CATS.includes(e.name)) out.push(...(await walk(p, e.name)));
    else if (e.isFile() && EXT.test(e.name)) out.push({ file: p, cat, id: slug(path.parse(e.name).name) });
  }
  return out;
}

const newer = async (a, b) => {
  try {
    return (await stat(a)).mtimeMs > (await stat(b)).mtimeMs;
  } catch {
    return true;
  }
};

await mkdir(OUT, { recursive: true });
let gallery = JSON.parse(await readFile(DATA, "utf8"));
if (drop) gallery = gallery.filter((g) => g.src);

const photos = await walk(SRC);
let added = 0, built = 0;
for (const ph of photos) {
  let w, h;
  for (const size of SIZES) {
    const dest = path.join(OUT, `${ph.id}-${size}.webp`);
    if (await newer(ph.file, dest)) {
      await sharp(ph.file).rotate().resize({ width: size, height: size, fit: "inside", withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
      built++;
    }
    if (size === SIZES.at(-1)) ({ width: w, height: h } = await sharp(dest).metadata());
  }
  const src = `/work/${ph.id}`;
  const entry = gallery.find((g) => g.id === ph.id || g.src === src);
  if (entry) Object.assign(entry, { src, width: w, height: h });
  else {
    gallery.push({ id: ph.id, title: "", category: ph.cat, spec: "", alt: "", featured: false, src, width: w, height: h });
    added++;
  }
}

// Real photos first, placeholders after.
gallery.sort((a, b) => Number(!a.src) - Number(!b.src));
await writeFile(DATA, JSON.stringify(gallery, null, 2) + "\n");

const missing = gallery.filter((g) => g.src && !g.title).map((g) => g.id);
console.log(`${photos.length} photos · ${built} images built · ${added} new entries · ${gallery.filter((g) => !g.src).length} placeholders left`);
if (missing.length) console.log(`Add a title (and alt text) in src/content/gallery.json for: ${missing.join(", ")}`);
