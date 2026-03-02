/**
 * Serverless handler for /project/:id — returns HTML with project-specific
 * Open Graph and Twitter meta so shared links show the project cover and details.
 * Set FIREBASE_SERVICE_ACCOUNT_JSON in Vercel env (full JSON string of service account)
 * for project-specific meta; otherwise default site meta is used and redirect still works.
 */
import type { VercelRequest, VercelResponse } from '@vercel/node';

const SITE_URL = 'https://junaidparamberi.com';

function absoluteImageUrl(url: string | undefined): string {
  if (!url) return `${SITE_URL}/assets/images/cover.png`;
  if (/^https?:\/\//i.test(url)) return url;
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${SITE_URL}${path}`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function getProjectById(id: string): Promise<{ title: string; description: string; image: string } | null> {
  const creds = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!creds) return null;
  try {
    const { initializeApp, cert } = await import('firebase-admin/app');
    const { getFirestore } = await import('firebase-admin/firestore');
    const app = initializeApp({ credential: cert(JSON.parse(creds)) });
    const db = getFirestore(app);
    const doc = await db.collection('projects').doc(id).get();
    if (!doc.exists) return null;
    const d = doc.data() as { title?: string; description?: string; image?: string };
    return {
      title: d?.title ?? 'Project',
      description: d?.description ?? '',
      image: d?.image ?? '',
    };
  } catch {
    return null;
  }
}

const CRAWLER_UA_PATTERNS = [
  'telegrambot', 'facebookexternalhit', 'facebot', 'twitterbot', 'linkedinbot',
  'whatsapp', 'slack', 'discord', 'applebot', 'googlebot', 'bingbot',
  'pinterest', 'slurp', 'baiduspider', 'yandexbot', 'bot', 'crawler', 'spider'
];

function isCrawler(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return CRAWLER_UA_PATTERNS.some(p => ua.includes(p));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = req.query.id as string;
  if (!id) {
    res.status(404).send('Not found');
    return;
  }

  const project = await getProjectById(id);
  const forCrawler = isCrawler(req.headers['user-agent'] as string);

  const title = project ? `${escapeHtml(project.title)} | Junaid Paramberi` : 'Junaid Paramberi | Creative Technologist & Visual Storyteller';
  const rawDescription = project ? project.description : 'Bridging the gap between raw data and luxury visual storytelling through graphic design, motion, and code.';
  const description = rawDescription.length > 200 ? rawDescription.slice(0, 197) + '...' : rawDescription;
  const imageUrl = project ? absoluteImageUrl(project.image) : `${SITE_URL}/assets/images/cover.png`;
  const pageUrl = `${SITE_URL}/project/${id}`;
  const redirectUrl = `${SITE_URL}/#project-${encodeURIComponent(id)}`;

  // Crawlers: no redirect — they must see this HTML and its meta only (so preview shows project).
  // Users: redirect to SPA so they get the app.
  const redirectMeta = forCrawler ? '' : `  <meta http-equiv="refresh" content="0;url=${escapeHtml(redirectUrl)}" />`;
  const redirectBody = forCrawler
    ? '<p>View project: <a href="' + escapeHtml(redirectUrl) + '">' + escapeHtml(title) + '</a></p>'
    : '<p>Redirecting to <a href="' + escapeHtml(redirectUrl) + '">project</a>...</p>\n  <script>window.location.replace("' + redirectUrl.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + '");</script>';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="author" content="Junaid Paramberi" />
  <link rel="canonical" href="${escapeHtml(pageUrl)}" />
  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${escapeHtml(pageUrl)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${escapeHtml(imageUrl)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="Junaid Paramberi" />
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${escapeHtml(pageUrl)}" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
  <meta name="twitter:image:alt" content="${escapeHtml(project?.title ?? title)}" />
${redirectMeta}
</head>
<body>
  ${redirectBody}
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  res.status(200).send(html);
}
