// Static-site generation for the /iitm-bs/* SEO pages.
// Prereqs (run before this): `vite build` (→ dist) and
// `vite build --ssr src/prerender.tsx --outDir dist-ssr`.
// Then: node seo/run-prerender.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Keep JSON-LD safe inside <script> (escape the angle brackets that could break out).
const jsonSafe = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

function headHtml(head) {
  if (!head) return '';
  const t = [
    `<meta name="description" content="${esc(head.description)}">`,
    `<link rel="canonical" href="${esc(head.canonical)}">`,
    `<meta property="og:title" content="${esc(head.title)}">`,
    `<meta property="og:description" content="${esc(head.description)}">`,
    `<meta property="og:url" content="${esc(head.canonical)}">`,
    `<meta property="og:type" content="website">`,
  ];
  const blocks = head.jsonLd ? (Array.isArray(head.jsonLd) ? head.jsonLd : [head.jsonLd]) : [];
  blocks.forEach((b) => t.push(`<script type="application/ld+json">${jsonSafe(b)}</script>`));
  return t.join('\n    ');
}

async function main() {
  const template = readFileSync(join(dist, 'index.html'), 'utf8');
  const mod = await import(pathToFileURL(join(root, 'dist-ssr', 'prerender.js')).href);
  const routes = mod.getRoutes();

  let count = 0;
  for (const route of routes) {
    const { body, head } = mod.renderPage(route);
    let html = template;
    if (head?.title) {
      html = /<title>[\s\S]*?<\/title>/.test(html)
        ? html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(head.title)}</title>`)
        : html.replace('</head>', `  <title>${esc(head.title)}</title>\n</head>`);
    }
    html = html.replace('</head>', `    ${headHtml(head)}\n  </head>`);
    html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

    const outDir = join(dist, route.replace(/^\//, ''));
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
    count++;
  }
  console.log(`✓ Prerendered ${count} /iitm-bs/* pages into dist/`);
}

main().catch((e) => {
  // Never fail the deploy build because of prerender — log and continue (CSR still works).
  console.error('⚠️  Prerender skipped due to error:', e?.message || e);
});
