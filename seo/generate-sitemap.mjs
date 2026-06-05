// Generates dist/sitemap.xml from the prerendered /iitm-bs routes + key static
// pages. Runs after build:ssg (needs dist-ssr/prerender.js). Canonical: genziitian.in
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const SITE = 'https://genziitian.in';

// Real, existing routes only (avoid listing pages that 404).
const STATIC = [
  '/', '/courses', '/resources', '/syllabus', '/graded-assignment',
  '/blog', '/docs', '/about', '/contact', '/careers', '/newsletter',
  '/ecosystem', '/privacy', '/terms', '/refund',
];

async function main() {
  let iitm = [];
  try {
    const mod = await import(pathToFileURL(join(root, 'dist-ssr', 'prerender.js')).href);
    iitm = mod.getRoutes();
  } catch (e) {
    console.error('⚠️  Could not load prerender routes for sitemap:', e?.message || e);
  }

  const all = [...new Set([...STATIC, ...iitm])];
  const body = all
    .map((r) => {
      const loc = `${SITE}${r.endsWith('/') ? r : r + '/'}`;
      const cf = r.startsWith('/iitm-bs') ? 'weekly' : 'monthly';
      return `  <url><loc>${loc}</loc><changefreq>${cf}</changefreq></url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  writeFileSync(join(root, 'dist', 'sitemap.xml'), xml);
  console.log(`✓ Wrote dist/sitemap.xml (${all.length} URLs)`);
}

main().catch((e) => console.error('⚠️  Sitemap skipped:', e?.message || e));
