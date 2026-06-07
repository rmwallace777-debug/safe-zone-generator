const $ = (sel, ctx = document) => ctx.querySelector(sel);

const routes = {
  default: {
    h1: `Free Safe Zone Generator - Create Crop & Margin Safe Areas`,
    title: `Free Safe Zone Generator - Create Crop & Margin Safe Areas`,
    desc: `Generate safe zones for print design, video broadcasting, and social media. Calculate safe action areas from resolutions and output sizes instantly.`,
    keywords: 'safe zone generator, TV safe action area, print safe margins, broadcast safe zone calculator, video title safe area'
  }
};

function applyRoute(route) {
  const r = routes[route];
  if (!r) return;
  document.title = r.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', r.desc);
  const elTitle = $('#page-title');
  if (elTitle) elTitle.textContent = r.h1;
  const elLead = $('#page-lead');
  if (elLead) elLead.textContent = r.desc;
  const canonical = $('#canonical');
  if (canonical) canonical.setAttribute('href', window.location.origin + window.location.pathname);
}

applyRoute('default');
