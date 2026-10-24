import { CATEGORIES, PRODUCTS } from '@/lib/catalog'

// Sitemap for crawlers and AI agents. Built from the live catalogue, with absolute
// URLs taken from the incoming request so no domain is hard-coded.
export async function GET(request: Request) {
  const url = new URL(request.url)
  const host = request.headers.get('host') ?? url.host
  const proto = request.headers.get('x-forwarded-proto') ?? url.protocol.replace(':', '')
  const base = `${proto}://${host}`

  const paths = ['/', ...CATEGORIES.map((c) => `/collections/${c.slug}`), ...PRODUCTS.map((p) => `/products/${p.slug}`)]
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths.map((path) => `  <url><loc>${base}${path}</loc></url>`).join('\n') +
    `\n</urlset>\n`

  return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } })
}
