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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = req.query.id as string;
  if (!id) {
    res.status(404).send('Not found');
    return;
  }

  const project = await getProjectById(id);

  const title = project ? `${escapeHtml(project.title)} | Junaid Paramberi` : 'Junaid Paramberi | Creative Technologist & Visual Storyteller';
  const rawDescription = project ? project.description : 'Bridging the gap between raw data and luxury visual storytelling through graphic design, motion, and code.';
  const description = rawDescription.length > 200 ? rawDescription.slice(0, 197) + '...' : rawDescription;
  const imageUrl = project ? absoluteImageUrl(project.image) : `${SITE_URL}/assets/images/cover.png`;
  const pageUrl = `${SITE_URL}/project/${id}`;
  const redirectUrl = `${SITE_URL}/#project-${encodeURIComponent(id)}`;
  const redirectUrlEscaped = redirectUrl.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

  const projectTitle = project ? escapeHtml(project.title) : 'Project';

  // Meta tags for link previews (crawlers read these; they don't run JS).
  // Loading page + JS redirect for users — matches portfolio theme.
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
  <meta name="theme-color" content="#0B0014" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      background: #0B0014;
      color: #E0E0FF;
      font-family: 'Syne', system-ui, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      overflow: hidden;
    }
    .loader-wrap {
      text-align: center;
      max-width: 320px;
    }
    .loader-label {
      font-size: 0.65rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: #00F0FF;
      margin-bottom: 1rem;
    }
    .loader-title {
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 2rem;
      color: #fff;
    }
    .spinner {
      width: 40px;
      height: 40px;
      margin: 0 auto 1.5rem;
      border: 2px solid rgba(26, 26, 46, 0.8);
      border-top-color: #00F0FF;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .bar {
      height: 2px;
      background: rgba(26, 26, 46, 0.8);
      border-radius: 1px;
      overflow: hidden;
      margin-top: 0.5rem;
    }
    .bar-fill {
      height: 100%;
      width: 30%;
      background: linear-gradient(90deg, #00F0FF, #B026FF);
      border-radius: 1px;
      animation: bar 1.2s ease-in-out infinite;
    }
    @keyframes bar { 0%, 100% { transform: translateX(-100%); } 50% { transform: translateX(200%); } }
    .noscript-link { margin-top: 1.5rem; font-size: 0.875rem; }
    .noscript-link a { color: #00F0FF; text-decoration: none; }
    .noscript-link a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="loader-wrap">
    <div class="spinner" aria-hidden="true"></div>
    <p class="loader-label">Loading project</p>
    <h1 class="loader-title">${projectTitle}</h1>
    <div class="bar"><div class="bar-fill"></div></div>
  </div>
  <noscript class="noscript-link"><a href="${escapeHtml(redirectUrl)}">Open project</a></noscript>
  <script>window.location.replace('${redirectUrlEscaped}');</script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  res.status(200).send(html);
}
