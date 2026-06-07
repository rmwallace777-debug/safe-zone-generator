import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.log('Missing dist/index.html, skipping.');
  process.exit(0);
}

const baseHtml = fs.readFileSync(indexPath, 'utf8');
const pageTitle = 'Free Safe Zone Generator - Create Crop & Margin Safe Areas';
const pageH1 = 'Free Safe Zone Generator - Create Crop & Margin Safe Areas';
const pageLead = 'Generate safe zones for print design, video broadcasting, and social media. Calculate safe action areas from resolutions and output sizes instantly.';
const pageSchema = 'Safe Zone Generator';
const pageDesc = 'Generate safe zones for print design, video broadcasting, and social media. Calculate safe action areas from resolutions and output sizes instantly.';

function replaceMeta(html, title, h1, lead, schemaName, description, canonicalHref) {
  let out = html;
  out = out.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
  out = out.replace(/<meta name="title".*?>/i, `<meta name="title" content="${title}" />`);
  out = out.replace(/<meta name="description".*?>/i, `<meta name="description" content="${description}" />`);
  out = out.replace(/<link rel="canonical".*?>/i, `<link rel="canonical" id="canonical" href="${canonicalHref}" />`);
  out = out.replace(/<meta property="og:title".*?>/i, `<meta property="og:title" content="${title}" />`);
  out = out.replace(/<meta property="og:url".*?>/i, `<meta property="og:url" content="${canonicalHref}" />`);
  out = out.replace(/<h1 id="page-title".*?>.*?<\/h1>/i, `<h1 id="page-title">${h1}</h1>`);
  out = out.replace(/<p class="lead" id="page-lead".*?>.*?<\/p>/i, `<p class="lead" id="page-lead">${lead}</p>`);
  out = out.replace(/"name": "".*?"/i, `"name": "${schemaName}"`);
  out = out.replace(/<meta property="og:description".*?>/i, `<meta property="og:description" content="${description}" />`);
  out = out.replace(/<meta name="twitter:title".*?>/i, `<meta name="twitter:title" content="${title}" />`);
  out = out.replace(/<meta name="twitter:description".*?>/i, `<meta name="twitter:description" content="${description}" />`);
  return out;
}

const baseCanonical = 'https://utilitylab.dev/safe-zone-generator';

const routes = [
  { path: 'default', title: pageTitle, h1: pageH1, lead: pageLead, schemaName: pageSchema, description: pageDesc },
  { path: 'broadcast-safe-zones', title: 'Broadcast Safe Zone Generator - TV & Video Safe Areas', h1: 'Broadcast Safe Zone Generator', lead: 'Create broadcast-safe action areas for TV, streaming, and video broadcasting. Avoid overscan and keep critical titles visible.', schemaName: 'Broadcast Safe Zone Generator', description: 'Generate broadcast-safe zones for TV and streaming video. Calculate action-safe title-safe margins for 1080p 4K broadcasts quickly.' },
  { path: 'social-media-safe-zones', title: 'Social Media Safe Zone Calculator - Instagram TikTok YouTube', h1: 'Social Media Safe Zone Calculator', lead: 'Calculate safe margins for Instagram Reels, TikTok, and YouTube thumbnails. Avoid UI and text overlap on mobile screens.', schemaName: 'Social Media Safe Zone Calculator', description: 'Calculate safe zones for social media feeds and short-form video previews. Account for mobile UI and keep content visible and legible.' },
  { path: 'print-design-safe-zones', title: 'Print Safe Zone Generator - Margins & Bleed Calculator', h1: 'Print Safe Zone Generator', lead: 'Define print-safe margins and text-safe areas for brochures, posters, and editorial layouts. Prevent trimming risks.', schemaName: 'Print Safe Zone Generator', description: 'Generate print-safe margins and text-safe zones for brochures, posters, books, and packaging. Receive practical printing guidance.' },
  { path: '4k-ultra-hd-safe-zones', title: '4K Ultra HD Safe Zone Generator - Television & Monitor Safe Areas', h1: '4K Ultra HD Safe Zone Generator', lead: 'Define safe margins for 4K UHD screens, TVs, and monitors. Support 3840x2160 and custom aspect ratios.', schemaName: '4K Ultra HD Safe Zone Generator', description: 'Generate safe zones for 4K ultra HD displays, broadcast monitors, and reference monitors for production workflows.' },
  { path: 'game-ui-safe-zones', title: 'Game UI Safe Zone Generator - Console & Mobile Overlays', h1: 'Game UI Safe Zone Generator', lead: 'Calculate screen-safe areas for console and mobile game UI. Prevent interface overlap from bezels and overlays.', schemaName: 'Game UI Safe Zone Generator', description: 'Generate safe zones for game UI on console and mobile. Keep important interface elements fully visible across TV and phone screens.' }
];

let variantCount = 0;
for (const route of routes) {
  const outDir = path.join(distDir, route.path);
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'index.html');
  const canonicalHref = `${baseCanonical}/${route.path === 'default' ? '' : route.path}`;
  const html = replaceMeta(baseHtml, route.title, route.h1, route.lead, route.schemaName, route.description, canonicalHref);
  fs.writeFileSync(outFile, html);
  variantCount += 1;
  console.log(`✔ ${route.path}`);
}

console.log(`Done. Wrote ${variantCount} route variants.`);
