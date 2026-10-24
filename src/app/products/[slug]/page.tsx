import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Bag from '@/components/Bag'
import ProductCard from '@/components/ProductCard'
import { addToCart } from '@/app/actions'
import { PRODUCTS, categoryOf, getProduct, inCategory, inr, pctOff } from '@/lib/catalog'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/products/[slug]'>): Promise<Metadata> {
  const p = getProduct((await params).slug)
  return p ? { title: p.name, description: p.description } : {}
}

const GRINDS = ['Whole beans', 'French press', 'Pour-over', 'South Indian filter', 'Espresso']

export default async function ProductPage({ params }: PageProps<'/products/[slug]'>) {
  const p = getProduct((await params).slug)
  if (!p) notFound()
  const cat = categoryOf(p.category)!
  const related = inCategory(p.category).filter((x) => x.id !== p.id).slice(0, 4)
  const isCoffee = p.category === 'beans'

  // Machine-readable product data for AI agents and search engines. "<" is escaped so
  // text inside the product data can never close the script tag.
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: `/products/${p.slug}`,
    sku: p.id,
    url: `/products/${p.slug}`,
    offers: {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: 'INR',
      availability: p.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `/products/${p.slug}`,
    },
  }).replaceAll('<', '\\u003c')

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <section className="wrap pdp">
        <div className="pdp-art"><Bag p={p} size="big" /></div>
        <div>
          <p className="crumbs"><Link href="/">Home</Link> / <Link href={`/collections/${cat.slug}`}>{cat.name}</Link></p>
          <h1>{p.name}</h1>
          {p.estate && <p className="estate">{p.estate}</p>}
          <p className="price big">
            <strong>{inr(p.price)}</strong>
            {pctOff(p) > 0 && <> <s>{inr(p.mrp)}</s> <span className="off">{pctOff(p)}% off</span></>}
          </p>
          <p className="muted small">{p.weight} · inclusive of GST</p>
          {p.inStock ? (
            <form action={addToCart} className="buy">
              <input type="hidden" name="id" value={p.id} />
              {isCoffee ? (
                <label>Grind
                  <select name="grind" defaultValue="Whole beans">{GRINDS.map((g) => <option key={g}>{g}</option>)}</select>
                </label>
              ) : (
                <input type="hidden" name="grind" value={p.category === 'filter-coffee' ? 'South Indian filter' : 'Not applicable'} />
              )}
              <label>Qty
                <select name="qty" defaultValue="1">{[1, 2, 3, 4, 5].map((n) => <option key={n}>{n}</option>)}</select>
              </label>
              <button type="submit" className="btn">Add to cart</button>
            </form>
          ) : (
            <p className="soldout big">Sold out · back after the next harvest</p>
          )}
          <p className="desc">{p.description}</p>
          {p.notes && (
            <dl className="facts">
              <div><dt>Tasting notes</dt><dd>{p.notes}</dd></div>
              <div><dt>Roast</dt><dd>{p.roast}</dd></div>
            </dl>
          )}
        </div>
      </section>
      {related.length > 0 && (
        <section className="wrap">
          <h2 className="sec">More {cat.name.toLowerCase()}</h2>
          <div className="grid">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
        </section>
      )}
    </>
  )
}
