/* eslint-disable */
// @ts-nocheck -- hand-written SVG animation code, kept framework-free so it can be reused anywhere.
// Process loops for the Capabilities cards. Each factory draws into an <svg viewBox="0 0 400 250">
// and returns render(t) for t in [0, 10) seconds -> { step, tag, info }.
// Source/preview: Claude artifact "Layer & Light Process Loops" (Oct 31, 2026).

const NS = 'http://www.w3.org/2000/svg';
const C = { void0:'#000000', v100:'#0d0d0f', v200:'#141416', v300:'#1c1c1f', v400:'#26262a', s700:'#57575a', s500:'#919190', s300:'#c3c3c1', s100:'#f1f1f0', g200:'#f7dca8', g400:'#e5b96f', g500:'#d99a3e', l50:'#fff8ea' };
const clamp01 = v => Math.max(0, Math.min(1, v));
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const span = (t, a, b) => clamp01((t - a) / (b - a));
const lerp = (a, b, t) => a + (b - a) * t;
const mix = (c1, c2, t) => '#' + [1, 3, 5].map(o => Math.round(lerp(parseInt(c1.substr(o, 2), 16), parseInt(c2.substr(o, 2), 16), clamp01(t))).toString(16).padStart(2, '0')).join('');
const f2 = n => (+n).toFixed(2);
const set = (el, a) => { for (const k in a) el.setAttribute(k, a[k]); return el; };
const mk = (tag, a, parent) => { const e = set(document.createElementNS(NS, tag), a || {}); if (parent) parent.appendChild(e); return e; };
const DEFS = `
  <filter id="ID-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="ID-bloom" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>`;

// ------------------------------------------------------------------ VACUUM FORMING
function vacuum(svg, id) {
  svg.insertAdjacentHTML('beforeend', `
    <defs>${DEFS.replaceAll('ID', id)}
      <linearGradient id="${id}-hf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.g400}" stop-opacity=".28"/><stop offset="1" stop-color="${C.g400}" stop-opacity="0"/></linearGradient>
      <pattern id="${id}-holes" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1.1" fill="#000"/></pattern>
    </defs>
    <line x1="46" y1="10" x2="46" y2="222" stroke="${C.v400}" stroke-width="3"/>
    <line x1="354" y1="10" x2="354" y2="222" stroke="${C.v400}" stroke-width="3"/>
    <rect x="62" y="12" width="276" height="16" rx="2" fill="${C.v200}" stroke="${C.v400}"/>
    <polyline class="coil" fill="none" stroke-width="1.4" stroke-linejoin="round"/>
    <rect class="hf" x="66" y="28" width="268" height="60" fill="url(#${id}-hf)" opacity="0"/>
    <rect x="60" y="185" width="280" height="10" fill="${C.v300}" stroke="${C.v400}"/>
    <rect x="60" y="185" width="280" height="10" fill="url(#${id}-holes)" opacity=".9"/>
    <path d="M92 195 H308 V216 H92 Z" fill="${C.v100}" stroke="${C.v400}"/>
    <path d="M308 206 H370 V226" fill="none" stroke="${C.v400}" stroke-width="6"/>
    <text x="340" y="201" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="8" fill="${C.s700}">VAC</text>
    <g class="arrows"></g>
    <path class="mold" fill="${C.v400}" stroke="${C.s700}"/>
    <path class="sheet" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <rect class="cl" x="40" width="34" height="9" rx="1.5" fill="${C.s700}"/>
    <rect class="cr" x="326" width="34" height="9" rx="1.5" fill="${C.s700}"/>`);
  const q = s => svg.querySelector(s);
  const sheet = q('.sheet'), coil = q('.coil'), hf = q('.hf'), cl = q('.cl'), cr = q('.cr');
  const X0 = 74, X1 = 326, N = 64, PL = 185, MC = 200, MW = 66, MH = 62, UP = 80, DN = 181, REL = 112;
  const xs = Array.from({ length: N }, (_, i) => X0 + (X1 - X0) * i / (N - 1));
  const top = x => { const u = (x - MC) / MW; return Math.abs(u) < 1 ? PL - MH * Math.sqrt(1 - u ** 4) : PL; };
  const lim = xs.map(x => top(x) - 1.6);
  const formed = xs.map((x, i) => (i === 0 || i === N - 1) ? DN : Math.min(lim[i], PL - 1.6));
  let md = `M${MC - MW} ${PL}`; for (let k = 0; k <= 60; k++) { const x = MC - MW + 2 * MW * k / 60; md += ` L${f2(x)} ${f2(top(x))}`; }
  q('.mold').setAttribute('d', md + ' Z');
  const cp = []; for (let x = 70, k = 0; x <= 330; x += 6.5, k++) cp.push(`${x},${k % 2 ? 16 : 24}`); coil.setAttribute('points', cp.join(' '));
  const arrows = [...Array(7)].map((_, k) => ({ el: mk('path', { d: 'M-3 -2 L0 1 L3 -2', fill: 'none', stroke: C.g400, 'stroke-width': 1.2 }, q('.arrows')), x: 110 + k * 30, off: k * .37 }));
  const frameAt = t => t < 2.6 ? UP : t < 3.8 ? lerp(UP, DN, ease(span(t, 2.6, 3.8))) : t < 6.2 ? DN : t < 7.4 ? lerp(DN, REL, ease(span(t, 6.2, 7.4))) : t < 9.2 ? REL : lerp(REL, UP, ease(span(t, 9.2, 10)));
  let ys = xs.map(() => UP), prevF = UP, prevT = 0;
  const path = a => { let d = `M${f2(xs[0])} ${f2(a[0])}`; for (let i = 1; i < N - 1; i++) d += ` Q${f2(xs[i])} ${f2(a[i])} ${f2((xs[i] + xs[i + 1]) / 2)} ${f2((a[i] + a[i + 1]) / 2)}`; return d + ` L${f2(xs[N - 1])} ${f2(a[N - 1])}`; };
  return t => {
    if (t < prevT) { ys = xs.map(() => UP); prevF = UP; } prevT = t;
    const fy = frameAt(t), heat = span(t, .6, 1.4) * (1 - span(t, 2.8, 3.6)), warm = span(t, 1, 2.4) * (1 - span(t, 5, 6.2));
    const g = .024 * span(t, 1.2, 2.6), vacT = span(t, 3.8, 5), vacOn = t > 3.6 && t < 5.4;
    let draw;
    if (t < 5) {
      const dy = fy - prevF; for (let i = 0; i < N; i++) ys[i] += dy; ys[0] = ys[N - 1] = fy;
      for (let k = 0; k < 260; k++) for (let i = 1; i < N - 1; i++) { const y = (ys[i - 1] + ys[i + 1]) / 2 + g; ys[i] = y > lim[i] ? lim[i] : y; }
      draw = vacT > 0 ? ys.map((y, i) => lerp(y, formed[i], ease(clamp01((vacT - .35 * Math.abs(xs[i] - MC) / (X1 - MC)) / .65)))) : ys;
    } else { const lift = DN - Math.max(fy, REL); draw = formed.map(y => y - lift); }
    prevF = fy;
    set(sheet, { d: path(draw), stroke: mix(C.s300, C.g400, warm), opacity: f2(t < .6 ? span(t, 0, .6) : t > 9.2 ? 1 - span(t, 9.2, 10) : 1), filter: warm > .15 ? `url(#${id}-glow)` : '' });
    set(coil, { stroke: mix(C.s700, '#ffd38a', heat), filter: heat > .1 ? `url(#${id}-glow)` : '' });
    hf.setAttribute('opacity', f2(heat * (.75 + .25 * Math.sin(t * 9))));
    cl.setAttribute('y', f2(fy - 4.5)); cr.setAttribute('y', f2(fy - 4.5));
    for (const a of arrows) { if (!vacOn) { a.el.setAttribute('opacity', 0); continue; } const ph = (t * 1.6 + a.off) % 1; set(a.el, { transform: `translate(${a.x} ${f2(197 + ph * 16)})`, opacity: f2(Math.sin(ph * Math.PI) * .9) }); }
    const step = t < 2.6 ? 0 : t < 3.8 ? 1 : t < 5 ? 2 : t < 6.2 ? 3 : 4;
    return { step, tag: t > 7.4 ? 'Finished shell' : null, info: `${Math.round(72 + 268 * warm)}°F · ${(25 * ease(vacT) * (1 - span(t, 6, 6.4))).toFixed(1)} inHg` };
  };
}

// ------------------------------------------------------------------ 3D PRINTING
function print3d(svg, id) {
  svg.insertAdjacentHTML('beforeend', `<defs>${DEFS.replaceAll('ID', id)}</defs>
    <line x1="72" y1="14" x2="72" y2="222" stroke="${C.v400}" stroke-width="3"/>
    <line x1="328" y1="14" x2="328" y2="222" stroke="${C.v400}" stroke-width="3"/>
    <rect x="104" y="207" width="192" height="6" rx="1" fill="${C.v300}" stroke="${C.s700}" stroke-width=".8"/>
    <rect x="96" y="213" width="208" height="9" fill="${C.v100}" stroke="${C.v400}"/>
    <g class="part"></g>
    <g class="gantry">
      <rect x="62" y="-3" width="276" height="6" rx="1" fill="${C.v400}"/>
      <g class="head">
        <rect x="-11" y="-12" width="22" height="18" rx="2" fill="${C.s700}"/>
        <rect x="-7" y="-20" width="14" height="8" fill="${C.v400}"/>
        <path class="nz" d="M-4 6 L4 6 L1 12 L-1 12 Z"/>
      </g>
    </g>`);
  const q = s => svg.querySelector(s);
  const partG = q('.part'), gantry = q('.gantry'), head = q('.head'), nz = q('.nz');
  const L = 30, BASE = 207, H = 108, lh = H / L, CX = 200;
  const prof = [[0, 58], [.22, 80], [.5, 70], [.78, 38], [.9, 34], [1, 46]];
  const w = f => { for (let i = 1; i < prof.length; i++) if (f <= prof[i][0]) { const [a, wa] = prof[i - 1], [b, wb] = prof[i]; const u = (f - a) / (b - a); return lerp(wa, wb, (1 - Math.cos(u * Math.PI)) / 2); } return 46; };
  const layers = [...Array(L)].map((_, k) => mk('rect', { x: 0, y: f2(BASE - (k + 1) * lh + .3), height: f2(lh - .6), rx: 1.2, width: 0, opacity: 0 }, partG));
  const P0 = .8, P1 = 7.4;
  return t => {
    const heat = span(t, 0, .8), p = span(t, P0, P1), prog = p * L, cur = Math.min(L - 1, Math.floor(prog)), qf = prog - cur;
    const cool = span(t, P1, 8.4), lift = ease(span(t, 8.4, 9.2)), fade = 1 - span(t, 9.3, 10);
    let nx = CX, ny = BASE - lh;
    layers.forEach((r, k) => {
      const wk = w((k + .5) / L), x0 = CX - wk / 2;
      let len = 0;
      if (t >= P1 || k < cur) len = wk; else if (k === cur && t >= P0) len = wk * qf;
      if (k === cur && t >= P0 && t < P1) { const ltr = k % 2 === 0; nx = ltr ? x0 + len : x0 + wk - len; ny = BASE - (k + 1) * lh; }
      const ltr = k % 2 === 0;
      const age = (prog - k) / 7;
      const col = t >= P1 ? mix(mix(C.s300, C.g400, clamp01(1 - age)), C.s300, cool) : mix(C.g400, C.s300, clamp01(age));
      set(r, { x: f2(ltr ? x0 : x0 + wk - len), width: f2(len), fill: col, opacity: len > 0 ? f2(fade) : 0, transform: `translate(0 ${f2(-14 * lift)})` });
    });
    if (t < P0) { nx = lerp(250, CX - w(.5 / L) / 2, ease(heat)); ny = BASE - lh - 30 * (1 - heat); }
    if (t >= P1) { const e = ease(span(t, P1, 8.2)); nx = lerp(nx, 300, e); ny = lerp(BASE - H, 40, e); }
    if (t > 9.3) { const e = ease(span(t, 9.3, 10)); ny = lerp(40, BASE - lh - 30, e); nx = lerp(300, 250, e); }
    gantry.setAttribute('transform', `translate(0 ${f2(ny - 12)})`);
    head.setAttribute('transform', `translate(${f2(nx)} 0)`);
    const hot = t < P1 ? heat : 1 - span(t, P1, 8);
    set(nz, { fill: mix(C.s500, '#ffd38a', hot), filter: hot > .2 ? `url(#${id}-glow)` : '' });
    partG.setAttribute('filter', '');
    const step = t < P0 ? 0 : t < P1 ? 1 : t < 8.4 ? 2 : 3;
    return { step, tag: t > 9.1 ? 'Finished part' : null, info: t < P1 && t >= P0 ? `Layer ${cur + 1}/${L} · ${Math.round(lerp(200, 220, heat))}°C nozzle` : `${Math.round(lerp(25, 220, hot))}°C nozzle` };
  };
}

// ------------------------------------------------------------------ UV PRINTING (top-down)
function uvprint(svg, id) {
  svg.insertAdjacentHTML('beforeend', `<defs>${DEFS.replaceAll('ID', id)}
      <clipPath id="${id}-cw"><rect class="cw" x="120" y="62" width="160" height="0"/></clipPath>
      <clipPath id="${id}-cc"><rect class="cc" x="120" y="62" width="160" height="0"/></clipPath>
      <linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#23485e"/><stop offset="1" stop-color="#b8606f"/></linearGradient>
      <linearGradient id="${id}-gloss" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <pattern id="${id}-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r=".9" fill="${C.v400}"/></pattern>
    </defs>
    <rect x="48" y="26" width="304" height="196" rx="3" fill="${C.v200}" stroke="${C.v400}"/>
    <rect x="48" y="26" width="304" height="196" rx="3" fill="url(#${id}-dots)"/>
    <rect x="120" y="62" width="160" height="126" rx="3" fill="${C.v300}" stroke="${C.s700}"/>
    <g class="art">
      <rect x="120" y="62" width="160" height="126" rx="3" fill="#ebe7df" clip-path="url(#${id}-cw)"/>
      <g clip-path="url(#${id}-cc)">
        <rect x="120" y="62" width="160" height="126" rx="3" fill="url(#${id}-sky)"/>
        <circle cx="232" cy="128" r="24" fill="${C.g400}"/>
        <path d="M120 188 L120 150 L158 116 L186 140 L214 108 L254 150 L280 136 L280 188 Z" fill="#7a3e66"/>
        <path d="M120 188 L120 166 L170 146 L214 166 L252 154 L280 168 L280 188 Z" fill="#1d3a46"/>
      </g>
      <rect class="gl" x="0" y="62" width="60" height="126" fill="url(#${id}-gloss)" opacity="0"/>
    </g>
    <rect class="cure" x="120" width="160" height="7" fill="#9d86ff" opacity="0" filter="url(#${id}-glow)"/>
    <g class="carr">
      <rect x="40" y="-4" width="320" height="8" rx="1.5" fill="${C.v400}"/>
      <g class="hd">
        <rect x="-16" y="-9" width="32" height="18" rx="2" fill="${C.s700}"/>
        <rect class="uvl" x="-24" y="-6" width="6" height="12" rx="1" fill="#6b5ab8"/>
        <rect class="uvr" x="18" y="-6" width="6" height="12" rx="1" fill="#6b5ab8"/>
        <circle cx="-8" cy="0" r="1.6" fill="#4fb3c8"/><circle cx="-3" cy="0" r="1.6" fill="#c8508f"/><circle cx="2" cy="0" r="1.6" fill="#e5c85a"/><circle cx="7" cy="0" r="1.6" fill="#111"/><circle cx="12" cy="0" r="1.6" fill="#eee"/>
      </g>
    </g>`);
  const q = s => svg.querySelector(s);
  const cw = q('.cw'), cc = q('.cc'), carr = q('.carr'), hd = q('.hd'), cure = q('.cure'), gl = q('.gl'), art = q('.art'), uvl = q('.uvl'), uvr = q('.uvr');
  const TOP = 62, BOT = 188;
  return t => {
    let cy = 40, printing = false;
    const wp = span(t, .6, 3.6), cp = span(t, 4.3, 8.0);
    if (t < .6) cy = lerp(40, TOP, ease(span(t, 0, .6)));
    else if (t < 3.6) { cy = lerp(TOP, BOT, wp); printing = true; }
    else if (t < 4.3) cy = lerp(BOT, TOP, ease(span(t, 3.6, 4.3)));
    else if (t < 8.0) { cy = lerp(TOP, BOT, cp); printing = true; }
    else cy = lerp(BOT, 210, ease(span(t, 8.0, 8.7)));
    if (t > 9.4) cy = lerp(210, 40, ease(span(t, 9.4, 10)));
    cw.setAttribute('height', f2((BOT - TOP) * (t < .6 ? 0 : wp)));
    cc.setAttribute('height', f2((BOT - TOP) * cp));
    carr.setAttribute('transform', `translate(0 ${f2(cy)})`);
    const hx = printing ? 200 + 92 * Math.sin(t * 22) : 200;
    hd.setAttribute('transform', `translate(${f2(hx)} 0)`);
    const uv = printing ? 1 : 0;
    set(cure, { y: f2(cy - 10), opacity: f2(uv * (.35 + .15 * Math.sin(t * 30))) });
    [uvl, uvr].forEach(e => set(e, { fill: uv ? '#b9a8ff' : '#4b3f80', filter: uv ? `url(#${id}-glow)` : '' }));
    const g = span(t, 8.7, 9.5);
    set(gl, { x: f2(lerp(70, 290, g)), opacity: f2(Math.sin(g * Math.PI) * .9) });
    art.setAttribute('opacity', f2(1 - span(t, 9.5, 10)));
    const step = t < .6 ? 0 : t < 4.3 ? 1 : t < 8.0 ? 2 : 3;
    return { step, tag: t > 8.6 ? 'Finished print' : null, info: printing ? (t < 4.3 ? 'White underbase · UV cured' : 'CMYK color · UV cured') : 'Acrylic blank' };
  };
}

// ------------------------------------------------------------------ MOLD MAKING & CASTING
function mold(svg, id) {
  // pawn master profile (radius by height fraction)
  const CX = 200, BASE = 215, H = 92;
  const prof = f => {
    if (f < .07) return 30; if (f < .11) return lerp(30, 22, (f - .07) / .04);
    if (f < .16) return 24; if (f < .2) return lerp(24, 15, (f - .16) / .04);
    if (f < .56) return lerp(15, 11, (f - .2) / .36); if (f < .6) return 20; if (f < .63) return 12;
    if (f < .72) return 11; const u = (f - .86) / .14; return 17 * Math.sqrt(clamp01(1 - u * u));
  };
  const pts = []; for (let k = 0; k <= 80; k++) { const f = k / 80; pts.push([CX + prof(f), BASE - H * f]); }
  const pawn = 'M' + [...pts, ...pts.slice().reverse().map(([x, y]) => [2 * CX - x, y])].map(([x, y]) => `${f2(x)} ${f2(y)}`).join(' L') + ' Z';
  const BX0 = 122, BX1 = 278, BY0 = 110, MCY = (BY0 + BASE) / 2;
  svg.insertAdjacentHTML('beforeend', `<defs>${DEFS.replaceAll('ID', id)}
      <clipPath id="${id}-sil"><rect class="silc" x="${BX0}" y="${BASE}" width="${BX1 - BX0}" height="0"/></clipPath>
      <clipPath id="${id}-res"><rect class="resc" x="0" y="${BASE}" width="400" height="0"/></clipPath>
    </defs>
    <line x1="40" y1="${BASE + .5}" x2="360" y2="${BASE + .5}" stroke="${C.v400}" stroke-width="1.5"/>
    <path class="master" d="${pawn}" fill="${C.s500}" stroke="${C.s300}" stroke-width=".8"/>
    <rect class="silfill" x="${BX0}" y="${BY0}" width="${BX1 - BX0}" height="${BASE - BY0}" clip-path="url(#${id}-sil)"/>
    <path class="master2" d="${pawn}" fill="${C.s500}" stroke="${C.s300}" stroke-width=".8" opacity=".55" clip-path="url(#${id}-sil)"/>
    <g class="block" opacity="0"><path d="M${BX0} ${BY0} H${BX1} V${BASE} H${BX0} Z ${pawn}" fill-rule="evenodd" fill="#3a3a3f" stroke="${C.s700}"/></g>
    <path class="cast" d="${pawn}" fill="${C.g400}" clip-path="url(#${id}-res)"/>
    <path class="box" d="M${BX0 - 2} 96 V${BASE} H${BX1 + 2} V96" fill="none" stroke="${C.s700}" stroke-width="3"/>
    <g class="cup"><path d="M-14 -10 L14 -10 L10 12 L-10 12 Z" fill="${C.v400}" stroke="${C.s700}"/></g>
    <line class="stream" stroke-width="3" stroke-linecap="round"/>`);
  const q = s => svg.querySelector(s);
  const master = q('.master'), master2 = q('.master2'), silc = q('.silc'), silfill = q('.silfill'), block = q('.block'), cast = q('.cast'), resc = q('.resc'), box = q('.box'), cup = q('.cup'), stream = q('.stream');
  return t => {
    const intro = span(t, 0, .6), out = 1 - span(t, 9.3, 10);
    const pour = span(t, 1, 3.8), cure = span(t, 3.8, 4.8), flip = ease(span(t, 5.4, 6.4)), res = span(t, 6.8, 8.2), emerge = ease(span(t, 8.3, 9.2));
    const level = lerp(BASE, BY0, pour);
    silc.setAttribute('y', f2(level)); silc.setAttribute('height', f2(BASE - level));
    const silCol = mix('#4d4d55', '#3a3a3f', cure);
    set(silfill, { fill: silCol, opacity: f2((t < 4.8 ? .75 + .25 * cure : 0)) });
    master2.setAttribute('opacity', t < 4.8 ? f2(.6 * (1 - cure)) : 0);
    // block appears after cure, flips to cavity-up
    const blockOn = t >= 4.8 && t < 9.4 ? 1 : 0;
    set(block, { opacity: f2(blockOn * out), transform: `translate(0 ${f2(-48 * Math.sin(Math.PI * flip))}) rotate(${f2(180 * flip)} ${CX} ${MCY})` });
    master.setAttribute('opacity', f2(intro * (1 - span(t, 4.9, 5.4))));
    master.setAttribute('transform', `translate(${f2(-150 * ease(span(t, 4.9, 5.4)))} 0)`);
    box.setAttribute('opacity', f2(intro * (1 - span(t, 4.6, 5.1))));
    // resin fill into the inverted cavity, then the cast comes out upright
    const cavTop = BY0, cavBot = BY0 + H;
    const rl = lerp(cavBot, cavTop, res);
    if (t < 8.3) { set(resc, { y: f2(rl), height: f2(cavBot - rl + 1) }); set(cast, { transform: `rotate(180 ${CX} ${MCY})`, opacity: res > 0 ? 1 : 0 }); }
    else { set(resc, { y: 0, height: 400 }); set(cast, { transform: `translate(${f2(122 * emerge)} ${f2(-70 * Math.sin(Math.PI * emerge))}) rotate(${f2(180 * (1 - emerge))} ${CX} ${MCY})`, opacity: f2(out) }); }
    cast.setAttribute('fill', mix(C.g400, C.g200, span(t, 8.2, 9)));
    // pouring cup + stream
    const pouringS = t > 1 && t < 3.8, pouringR = t > 6.8 && t < 8.2;
    const showCup = (t > .7 && t < 4.1) || (t > 6.5 && t < 8.5);
    const cupX = pouringS ? 150 : 200, cupTilt = (pouringS || pouringR) ? -38 : 0;
    cup.setAttribute('transform', `translate(${cupX} 40) rotate(${cupTilt})`); cup.setAttribute('opacity', showCup ? 1 : 0);
    if (pouringS) set(stream, { x1: cupX - 10, y1: 42, x2: cupX - 10, y2: f2(level), stroke: '#6a6a74', opacity: 1 });
    else if (pouringR) set(stream, { x1: CX, y1: 42, x2: CX, y2: f2(rl), stroke: C.g400, opacity: 1 });
    else stream.setAttribute('opacity', 0);
    const step = t < 1 ? 0 : t < 3.8 ? 1 : t < 4.8 ? 2 : t < 6.8 ? 3 : 4;
    return { step, tag: t > 9 ? 'Finished casting' : null, info: t < 4.8 ? 'Platinum silicone' : 'Urethane resin' };
  };
}

// ------------------------------------------------------------------ ROTOCASTING
function roto(svg, id) {
  const CX = 200, CY = 116, RX = 60, RY = 72, IRX = 55, IRY = 67;
  svg.insertAdjacentHTML('beforeend', `<defs>${DEFS.replaceAll('ID', id)}
      <clipPath id="${id}-in"><ellipse class="inclip" cx="${CX}" cy="${CY}" rx="${IRX}" ry="${IRY}"/></clipPath>
      <clipPath id="${id}-in2"><ellipse cx="${CX}" cy="${CY}" rx="${IRX}" ry="${IRY}"/></clipPath>
    </defs>
    <rect x="186" y="208" width="28" height="14" fill="${C.v400}"/>
    <rect x="150" y="220" width="100" height="5" fill="${C.v300}"/>
    <g class="frame"><rect x="${CX - 108}" y="${CY - 92}" width="216" height="184" rx="10" fill="none" stroke="${C.v400}" stroke-width="6"/></g>
    <line x1="${CX}" y1="${CY + 92}" x2="${CX}" y2="208" stroke="${C.v400}" stroke-width="6"/>
    <g class="mold">
      <g class="topH">
        <path d="M${CX - RX} ${CY} A${RX} ${RY} 0 0 1 ${CX + RX} ${CY} Z" fill="${C.v300}" stroke="${C.s700}" stroke-width="2"/>
        <rect x="${CX - RX - 12}" y="${CY - 5}" width="${2 * RX + 24}" height="5" fill="${C.s700}"/>
        <circle cx="${CX - RX - 6}" cy="${CY - 2.5}" r="2" fill="${C.v400}"/><circle cx="${CX + RX + 6}" cy="${CY - 2.5}" r="2" fill="${C.v400}"/>
      </g>
      <g class="botH">
        <path d="M${CX - RX} ${CY} A${RX} ${RY} 0 0 0 ${CX + RX} ${CY} Z" fill="${C.v300}" stroke="${C.s700}" stroke-width="2"/>
        <rect x="${CX - RX - 12}" y="${CY}" width="${2 * RX + 24}" height="5" fill="${C.s700}"/>
        <circle cx="${CX - RX - 6}" cy="${CY + 2.5}" r="2" fill="${C.v400}"/><circle cx="${CX + RX + 6}" cy="${CY + 2.5}" r="2" fill="${C.v400}"/>
      </g>
      <ellipse class="cav" cx="${CX}" cy="${CY}" rx="${IRX}" ry="${IRY}" fill="${C.v100}"/>
      <ellipse class="coat" cx="${CX}" cy="${CY}" rx="${IRX}" ry="${IRY}" fill="none" stroke="${C.g400}" clip-path="url(#${id}-in2)"/>
      <rect class="port" x="${CX - 5}" y="${CY - RY - 6}" width="10" height="8" fill="${C.s700}"/>
    </g>
    <rect class="pud" x="${CX - 80}" width="160" height="200" fill="${C.g400}" clip-path="url(#${id}-in)"/>
    <ellipse class="shell" cx="${CX}" cy="${CY}" rx="${IRX - 3}" ry="${IRY - 3}" fill="none" stroke="${C.g200}" stroke-width="6" opacity="0"/>
    <line class="stream" x1="${CX}" y1="6" x2="${CX}" y2="0" stroke="${C.g400}" stroke-width="3" stroke-linecap="round"/>`);
  const q = s => svg.querySelector(s);
  const moldG = q('.mold'), frame = q('.frame'), coat = q('.coat'), pud = q('.pud'), inclip = q('.inclip'), topH = q('.topH'), botH = q('.botH'), cav = q('.cav'), shell = q('.shell'), stream = q('.stream'), port = q('.port');
  return t => {
    const pourP = span(t, .5, 1.8), rot = span(t, 2.2, 6.8), open = ease(span(t, 7.0, 8.0)), fade = 1 - span(t, 9.3, 10);
    const th = 1440 * (rot - Math.sin(2 * Math.PI * rot) / (2 * Math.PI));
    const ph = 720 * (rot - Math.sin(2 * Math.PI * rot) / (2 * Math.PI));
    const sx = Math.cos(ph * Math.PI / 180);
    frame.setAttribute('transform', `translate(${CX} ${CY}) scale(${f2(Math.abs(sx) < .08 ? .08 : sx)} 1) translate(${-CX} ${-CY})`);
    const sxm = .55 + .45 * Math.abs(sx);
    moldG.setAttribute('transform', `translate(${CX} ${CY}) scale(${f2(sxm)} 1) rotate(${f2(th)}) translate(${-CX} ${-CY})`);
    inclip.setAttribute('transform', `translate(${CX} ${CY}) scale(${f2(sxm)} 1) rotate(${f2(th)}) translate(${-CX} ${-CY})`);
    const thick = 7 * span(t, 2.6, 6.6);
    const depth = 30 * pourP * (1 - span(t, 2.4, 6.6));
    const a = th * Math.PI / 180, hh = Math.sqrt((IRX * Math.sin(a)) ** 2 + (IRY * Math.cos(a)) ** 2);
    set(pud, { y: f2(CY + hh - depth), opacity: depth > .3 && t < 7 ? 1 : 0 });
    set(coat, { 'stroke-width': f2(thick * 2), opacity: t < 7 ? 1 : 0 });
    // open: halves separate, hollow shell stays
    topH.setAttribute('transform', `translate(0 ${f2(-38 * open)})`);
    botH.setAttribute('transform', `translate(0 ${f2(38 * open)})`);
    topH.setAttribute('opacity', f2(1 - .6 * open)); botH.setAttribute('opacity', f2(1 - .6 * open));
    cav.setAttribute('opacity', f2(1 - open));
    port.setAttribute('opacity', f2(1 - open));
    set(shell, { opacity: t >= 7 ? f2(fade) : 0, stroke: mix(C.g400, C.g200, span(t, 7, 8.2)), filter: t > 7.8 && t < 9 ? `url(#${id}-glow)` : '' });
    moldG.setAttribute('opacity', f2(t > 9.3 ? fade : 1));
    if (t > 9.6) moldG.setAttribute('opacity', 1);
    if (t > 9.3) { topH.setAttribute('transform', `translate(0 ${f2(-38 * fade)})`); botH.setAttribute('transform', `translate(0 ${f2(38 * fade)})`); cav.setAttribute('opacity', f2(1 - fade)); topH.setAttribute('opacity', f2(1 - .6 * fade)); botH.setAttribute('opacity', f2(1 - .6 * fade)); }
    const pouring = t > .5 && t < 1.8;
    set(stream, { y2: f2(CY + IRY - 30 * pourP), opacity: pouring ? 1 : 0 });
    const step = t < 2.2 ? 0 : t < 7 ? 1 : t < 8 ? 2 : 3;
    return { step, tag: t > 8 ? 'Hollow shell' : null, info: t >= 2.2 && t < 7 ? `Two-axis spin · ${Math.round(th % 360)}°` : 'Slush resin' };
  };
}

// ------------------------------------------------------------------ HYDRO-CHROME
function chrome(svg, id) {
  const CX = 170, CY = 112, R = 58;
  svg.insertAdjacentHTML('beforeend', `<defs>${DEFS.replaceAll('ID', id)}
      <clipPath id="${id}-b"><rect class="cb" x="0" y="${CY - R}" width="400" height="0"/></clipPath>
      <clipPath id="${id}-c"><rect class="cc" x="0" y="${CY - R}" width="400" height="0"/></clipPath>
      <clipPath id="${id}-s"><circle cx="${CX}" cy="${CY}" r="${R}"/></clipPath>
      <linearGradient id="${id}-chr" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${C.l50}"/><stop offset=".22" stop-color="${C.s300}"/><stop offset=".47" stop-color="${C.s700}"/>
        <stop offset=".5" stop-color="${C.v100}"/><stop offset=".62" stop-color="${C.s500}"/><stop offset=".84" stop-color="${C.g400}"/><stop offset="1" stop-color="${C.s700}"/>
      </linearGradient>
      <radialGradient id="${id}-blk" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#2a2a2e"/><stop offset="1" stop-color="#050506"/></radialGradient>
      <radialGradient id="${id}-raw" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="${C.s500}"/><stop offset="1" stop-color="${C.s700}"/></radialGradient>
    </defs>
    <ellipse cx="${CX}" cy="${CY + R + 16}" rx="44" ry="6" fill="${C.v300}"/>
    <path d="M${CX - 16} ${CY + R - 4} L${CX + 16} ${CY + R - 4} L${CX + 24} ${CY + R + 14} L${CX - 24} ${CY + R + 14} Z" fill="${C.v400}" stroke="${C.s700}"/>
    <circle cx="${CX}" cy="${CY}" r="${R}" fill="url(#${id}-raw)"/>
    <circle cx="${CX}" cy="${CY}" r="${R}" fill="url(#${id}-blk)" clip-path="url(#${id}-b)"/>
    <circle class="gloss" cx="${CX - 20}" cy="${CY - 24}" r="7" fill="#fff" opacity="0" filter="url(#${id}-glow)"/>
    <g clip-path="url(#${id}-c)">
      <g clip-path="url(#${id}-s)">
        <rect class="chrRect" x="${CX - R}" y="${CY - R}" width="${2 * R}" height="${2 * R}" fill="url(#${id}-chr)"/>
        <ellipse class="spec" cx="${CX}" cy="${CY - 30}" rx="16" ry="9" fill="#fff" opacity=".85" filter="url(#${id}-glow)"/>
        <rect class="win" x="${CX - 30}" y="${CY - 44}" width="9" height="16" rx="2" fill="#fff" opacity=".7"/>
      </g>
    </g>
    <circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${C.v400}" stroke-width="1"/>
    <g class="mist"></g>
    <g class="gun">
      <rect x="0" y="-7" width="40" height="14" rx="3" fill="${C.s700}"/>
      <rect x="-10" y="-3" width="12" height="6" fill="${C.s500}"/>
      <rect x="22" y="7" width="8" height="18" rx="2" fill="${C.v400}"/>
      <rect x="8" y="-20" width="16" height="13" rx="2" fill="${C.v400}"/>
    </g>`);
  const q = s => svg.querySelector(s);
  const cb = q('.cb'), cc = q('.cc'), gun = q('.gun'), mistG = q('.mist'), gloss = q('.gloss'), spec = q('.spec'), win = q('.win');
  const mist = [...Array(18)].map((_, k) => ({ el: mk('circle', { r: 1.6 }, mistG), off: k / 18, dy: (Math.sin(k * 12.9898) * 43758.5453 % 1) }));
  const passes = [[.6, 2.6, '#2a2a2e'], [2.7, 3.3, '#c3c3c1'], [3.4, 6.0, '#f1f1f0'], [6.1, 6.9, '#f7dca8']];
  return t => {
    const bp = span(t, .6, 2.6), cp = span(t, 3.4, 6.0), out = 1 - span(t, 9.3, 10);
    set(cb, { height: f2(2 * R * bp * out + (t > 9.3 ? 0 : 0)) });
    set(cc, { height: f2(2 * R * cp) });
    if (t > 9.3) { cb.setAttribute('height', f2(2 * R * out)); cc.setAttribute('height', f2(2 * R * out)); }
    let gy = CY, active = null;
    for (const [a, b, col] of passes) if (t >= a && t <= b) { active = col; gy = CY - R + 2 * R * span(t, a, b); }
    if (!active) gy = CY - 10;
    const gx = 292;
    gun.setAttribute('transform', `translate(${gx} ${f2(gy)})`);
    for (const m of mist) {
      if (!active) { m.el.setAttribute('opacity', 0); continue; }
      const ph = (t * 2.4 + m.off) % 1;
      set(m.el, { cx: f2(gx - 12 - ph * (gx - CX - R + 6)), cy: f2(gy + (m.dy - .5) * 34 * ph), fill: active, opacity: f2(.7 * Math.sin(ph * Math.PI)) });
    }
    gloss.setAttribute('opacity', f2(bp > .5 && cp < .3 ? .55 : 0));
    const sw = span(t, 7.0, 9.0);
    spec.setAttribute('cx', f2(CX - 30 + 50 * sw)); win.setAttribute('x', f2(CX - 34 + 46 * sw));
    spec.setAttribute('opacity', f2(.6 + .3 * Math.sin(sw * Math.PI)));
    const step = t < .6 ? 0 : t < 2.7 ? 0 : t < 3.4 ? 1 : t < 6.1 ? 2 : t < 7.0 ? 3 : 4;
    return { step, tag: t > 7 ? 'Mirror finish' : null, info: ['Gloss black base', 'Activator', 'Silver solution', 'Clear coat', 'Spray-on chrome'][step] };
  };
}

// ------------------------------------------------------------------ LED LIGHTING (edge-lit acrylic)
function led(svg, id) {
  svg.insertAdjacentHTML('beforeend', `<defs>${DEFS.replaceAll('ID', id)}
      <linearGradient id="${id}-up" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${C.g400}" stop-opacity=".5"/><stop offset="1" stop-color="${C.g400}" stop-opacity="0"/></linearGradient>
    </defs>
    <rect class="bloom" x="130" y="40" width="140" height="130" fill="${C.g400}" opacity="0" filter="url(#${id}-bloom)"/>
    <rect class="panel" x="142" y="34" width="116" height="132" rx="2" fill="${C.v100}" stroke="${C.s700}" stroke-width="1"/>
    <rect class="wash" x="142" y="34" width="116" height="132" rx="2" fill="url(#${id}-up)" opacity="0"/>
    <g class="etch" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M214 70 A30 30 0 1 0 214 128 A24 24 0 1 1 214 70 Z"/>
      <path d="M228 66 l3 7 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 Z"/>
      <path d="M232 108 l2 4 4 .6 -3 2.8 .7 4 -3.7 -1.9 -3.7 1.9 .7 -4 -3 -2.8 4 -.6 Z"/>
      <path d="M168 140 l1.6 3.4 3.6 .5 -2.6 2.5 .6 3.6 -3.2 -1.7 -3.2 1.7 .6 -3.6 -2.6 -2.5 3.6 -.5 Z"/>
    </g>
    <rect x="118" y="166" width="164" height="26" rx="3" fill="${C.v300}" stroke="${C.s700}"/>
    <g class="leds"></g>
    <path class="wire" d="M282 184 C312 184 318 206 336 206" fill="none" stroke="${C.s700}" stroke-width="2.2"/>
    <circle class="pulse" r="3" fill="${C.l50}" opacity="0" filter="url(#${id}-glow)"/>
    <rect x="334" y="196" width="34" height="20" rx="3" fill="${C.v300}" stroke="${C.s700}"/>
    <text x="351" y="209" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="7" fill="${C.s500}">12V</text>
    <circle class="pwr" cx="362" cy="201" r="1.6" fill="${C.v400}"/>`);
  const q = s => svg.querySelector(s);
  const ledsG = q('.leds'), wire = q('.wire'), pulse = q('.pulse'), etch = q('.etch'), wash = q('.wash'), bloom = q('.bloom'), panel = q('.panel'), pwr = q('.pwr');
  const N = 12, leds = [...Array(N)].map((_, k) => mk('rect', { x: f2(146 + k * 9.4), y: 172, width: 5, height: 5, rx: 1 }, ledsG));
  const wl = wire.getTotalLength();
  wire.setAttribute('stroke-dasharray', wl);
  return t => {
    const draw = span(t, .8, 2.0), pul = span(t, 2.0, 2.8), on = span(t, 2.8, 4.0), glow = span(t, 4.0, 5.0), off = 1 - span(t, 8.8, 9.8);
    wire.setAttribute('stroke-dashoffset', f2(wl * (1 - draw)));
    wire.setAttribute('stroke', t > 2 && t < 8.8 ? C.g500 : C.s700);
    if (t > 2.0 && t < 2.8) { const p = wire.getPointAtLength(wl * (1 - pul)); set(pulse, { cx: f2(p.x), cy: f2(p.y), opacity: 1 }); } else pulse.setAttribute('opacity', 0);
    pwr.setAttribute('fill', t > 1.9 && t < 9.8 ? '#7fd38a' : C.v400);
    const lvl = glow * off * (.85 + .15 * Math.sin(t * 3));
    leds.forEach((r, k) => {
      const lit = clamp01(on * N - k) * off;
      const chase = t > 5 && t < 8.8 ? .75 + .25 * Math.sin(t * 7 - k * .9) : 1;
      set(r, { fill: mix(C.v400, C.l50, lit * chase), filter: lit > .5 ? `url(#${id}-glow)` : '' });
    });
    set(etch, { stroke: mix(C.v400, C.l50, lvl), 'stroke-width': f2(1.2 + .6 * lvl), filter: lvl > .2 ? `url(#${id}-glow)` : '' });
    wash.setAttribute('opacity', f2(lvl * .8));
    bloom.setAttribute('opacity', f2(lvl * .22));
    panel.setAttribute('stroke', mix(C.s700, C.g400, lvl));
    const step = t < .8 ? 0 : t < 2.0 ? 1 : t < 2.8 ? 2 : t < 4.0 ? 3 : 4;
    return { step, tag: t > 5 && t < 8.8 ? 'Lit' : null, info: t >= 2 && t < 8.8 ? '12V DC · warm white 3000K' : 'Edge-lit acrylic' };
  };
}


export type LoopKind = "3d-printing" | "uv-printing" | "vacuum-forming" | "mold-making" | "rotocasting" | "hydro-chrome" | "led";

export const LOOPS: Record<LoopKind, { fn: (svg: SVGSVGElement, id: string) => (t: number) => { step: number; tag: string | null; info: string }; steps: string[]; still: number }> = {
  "3d-printing": { fn: print3d, steps: ["Heat", "Print", "Cool", "Remove"], still: 9.0 },
  "uv-printing": { fn: uvprint, steps: ["Load", "White", "Color", "Done"], still: 8.5 },
  "vacuum-forming": { fn: vacuum, steps: ["Heat", "Form", "Vacuum", "Cool", "Release"], still: 8.0 },
  "mold-making": { fn: mold, steps: ["Master", "Pour", "Cure", "Demold", "Cast"], still: 9.1 },
  rotocasting: { fn: roto, steps: ["Fill", "Spin", "Open", "Shell"], still: 8.6 },
  "hydro-chrome": { fn: chrome, steps: ["Base", "Activate", "Chrome", "Clear", "Finish"], still: 8.0 },
  led: { fn: led, steps: ["Build", "Wire", "Power", "Light", "Glow"], still: 6.0 },
};

export const LOOP_SECONDS = 10;
