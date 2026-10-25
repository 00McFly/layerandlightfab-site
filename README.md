# layerandlightfab.com

The marketing site for Layer & Light Fabrication: one scrolling page in the "Layer by Layer" direction.
It's built with Next.js 16, Tailwind v4 and Phosphor icons, using the brand tokens from `../design-system/`, and it exports to plain static files.

```bash
npm install
npm run dev        # http://127.0.0.1:3422
npm run build      # static site in out/
npm start          # serve out/ locally to check the real build
```

The `mockups/` folder holds the three direction mockups (A/B/C) we chose from. They aren't part of the site.

## Adding photos

1. Put the originals in `photos/<category>/`. The category folders are `props`, `3d-printing`, `uv-printing`, `themed` and `design`.
   Any size works. JPG, PNG, WebP and HEIC are all fine. Name the files the way you'd describe them, e.g. `photos/props/hero-lantern.jpg`.
2. Run `npm run photos`. It writes an 800px and an 1800px WebP of each photo into `public/work/` and adds an entry to `src/content/gallery.json`.
3. Open `src/content/gallery.json` and fill in each new entry:
   - `title`: shown on hover and in the lightbox
   - `spec`: one mono line, e.g. `Resin · 14 parts · 420 mm`
   - `alt`: a short description for screen readers
   - `featured: true`: also shows the photo in the sideways "Selected work" strip (up to 12)
   - `description` (optional): a sentence under the photo in the lightbox
   The order of entries in the file is the order on the page.
4. When there are enough real photos, run `npm run photos -- --drop-placeholders` to remove the empty `slot-NN` boxes.

To show a photo on a service card, set its `image` in `src/content/services.ts` to the photo's `src` (e.g. `"/work/hero-lantern"`).
To replace a photo, give the new file a new name, so browsers and caches pick it up.

The originals in `photos/` are git-ignored. Only the web sizes in `public/work/` ship.

## Editing copy

- Company facts, the contact email and the optional phone and Instagram live in `src/content/site.ts`.
- Service text is in `src/content/services.ts`. The capabilities list (from James Sleeth, founder) is in `src/content/capabilities.ts`. The rest of the copy is in the components under `src/components/`.
- Every "Start a project" button mails `site.email` (`hello@layerandlightfab.com`). Make sure that inbox exists before launch.

## Motion

- The hero pins while the logo's steel and lit layers slide together, then the headline lands word by word.
- The about paragraph lights up word by word as you scroll.
- The service cards stack like layers.
- The "Selected work" strip moves sideways as you scroll down.
- The approach timeline has a lit line that fills as you go.

All of it is driven by one hook (`src/lib/scroll.ts`), which writes a `--p` value per section; the CSS lives in `src/app/globals.css`.
When the device asks for reduced motion, nothing pins and everything shows in its finished state. The strip becomes a swipeable row.

## Deploying to layerandlightfab.com

`npm run build` produces `out/`, a folder of static files that any static host can serve. Nothing has been deployed yet.

**Recommended: Netlify or Cloudflare Pages.** Both are free at this size, give you HTTPS automatically, and read `public/_headers` for the security and cache headers.

1. Push this `site/` folder to a GitHub repository (it already has its own git repo).
2. Create a new site from that repository, with build command `npm run build` and output directory `out`.
3. Add the custom domain `layerandlightfab.com` (and `www.layerandlightfab.com`, set to redirect to the apex).
4. At the domain registrar, point DNS at the host as its dashboard instructs:
   - Cloudflare Pages: easiest if the domain's DNS moves to Cloudflare.
   - Netlify: either Netlify DNS, or an `ALIAS`/`A` record for the apex plus a `CNAME` for `www`.
5. Wait for the certificate, then check: https://layerandlightfab.com loads, `www` redirects, and pasting the link in Messages shows the logo card (`/og.png`).

**Alternatives:**
- Vercel works the same way, using its own header settings instead of `_headers`.
- The home server (via the `deploy-app` skill) can serve `out/` behind nginx and cloudflared.

If we later add an animated link-preview video, don't host the MP4 on Cloudflare Pages. It doesn't answer byte-range requests, so Messages falls back to the still image.
