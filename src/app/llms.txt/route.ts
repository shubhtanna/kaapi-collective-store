import { CATEGORIES, PRODUCTS, inr } from '@/lib/catalog'

// Plain-text guide for AI shopping agents, generated from the live catalogue.
// Absolute URLs are built from the incoming request so no domain is hard-coded.
export async function GET(request: Request) {
  const url = new URL(request.url)
  const host = request.headers.get('host') ?? url.host
  const proto = request.headers.get('x-forwarded-proto') ?? url.protocol.replace(':', '')
  const base = `${proto}://${host}`

  const lines = [
    '# Kaapi Collective',
    '',
    'Specialty Indian coffee roaster in Chikmagalur: single-estate beans, South Indian filter coffee and brewing gear, roasted every Monday and shipped across India.',
    '',
    '## Products',
    '',
    ...PRODUCTS.map((p) => `- [${p.name}](${base}/products/${p.slug}): ${inr(p.price)}${p.inStock ? '' : ' (sold out)'}`),
    '',
    '## How to buy',
    '',
    'Browse by collection: ' + CATEGORIES.map((c) => `[${c.name}](${base}/collections/${c.slug})`).join(', ') + '.',
    '',
    'To buy, open a product page, pick a grind option and quantity, and submit the "Add to cart" form — it is a plain HTML form and works without JavaScript. You land on the cart page, which shows each item with its name, quantity and price.',
    '',
    'From the cart, follow the Checkout link. It carries the cart in the URL (`/checkout?items=<id>:<qty>,...`), so the same items open on any device without cookies. Checkout is guest-only: fill in the delivery details and place the order (cash on delivery or UPI on delivery). No account is needed.',
    '',
  ]

  return new Response(lines.join('\n'), { headers: { 'content-type': 'text/markdown; charset=utf-8' } })
}
