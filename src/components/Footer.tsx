import Link from 'next/link'
import { CATEGORIES } from '@/lib/catalog'

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap cols">
        <div>
          <p className="logo small">kaapi<span>.</span>collective</p>
          <p className="muted">Small-batch roasters in Chikmagalur, buying from twelve estates across Karnataka, Kerala and Andhra since 2019.</p>
        </div>
        <div><h4>Shop</h4>{CATEGORIES.map((c) => <Link key={c.slug} href={`/collections/${c.slug}`}>{c.name}</Link>)}</div>
        <div><h4>Help</h4><Link href="/brew-guide">Brew guide</Link><Link href="/shipping">Shipping &amp; returns</Link></div>
      </div>
      <p className="wrap demo">Demo store built for testing AI shopping agents. No real orders, payments or deliveries.</p>
    </footer>
  )
}
