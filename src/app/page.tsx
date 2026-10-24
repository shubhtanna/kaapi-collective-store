import Link from 'next/link'
import Bag from '@/components/Bag'
import ProductCard from '@/components/ProductCard'
import { CATEGORIES, PRODUCTS, getProduct } from '@/lib/catalog'

const FEATURED = ['baba-budangiri-medium', 'ratnagiri-honey-light', 'filter-coffee-80-20', 'monsooned-malabar-medium', 'araku-valley-medium-dark', 'steel-south-indian-filter', 'coorg-robusta-dark', 'pour-over-dripper']

export default function Home() {
  const featured = FEATURED.map((s) => getProduct(s)!)
  return (
    <>
      <section className="hero">
        <div className="wrap hero-in">
          <div>
            <p className="eyebrow">Specialty Indian coffee · roasted weekly</p>
            <h1>From the hills of <em>Chikmagalur</em> to your cup.</h1>
            <p className="lead">Single-estate beans and proper South Indian filter coffee, roasted every Monday and shipped within two days, so it reaches you at its best.</p>
            <Link className="btn" href="/collections/beans">Shop beans</Link>
            <Link className="btn ghost" href="/collections/filter-coffee">Filter coffee</Link>
          </div>
          <div className="hero-bags">
            {['ratnagiri-honey-light', 'baba-budangiri-medium', 'filter-coffee-80-20'].map((s) => <Bag key={s} p={getProduct(s)!} size="hero" />)}
          </div>
        </div>
      </section>

      <section className="wrap">
        <h2 className="sec">Shop</h2>
        <div className="cats">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`} className="cat">
              <strong>{c.name}</strong>
              <span>{c.blurb}</span>
              <small>{PRODUCTS.filter((p) => p.category === c.slug).length} products →</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap">
        <h2 className="sec">This week&apos;s roasts</h2>
        <div className="grid">{featured.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>

      <section className="wrap promise">
        <div><strong>Roasted to order</strong><span>Every Monday, in small 5 kg batches.</span></div>
        <div><strong>Estate-direct</strong><span>We pay growers 40% above commodity prices.</span></div>
        <div><strong>Ground your way</strong><span>Whole beans or ground for your brewer.</span></div>
      </section>
    </>
  )
}
