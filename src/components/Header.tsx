import Link from 'next/link'
import { CATEGORIES, FREE_SHIPPING_FROM, inr } from '@/lib/catalog'
import { readCart } from '@/lib/cart'

export default async function Header() {
  const count = (await readCart()).reduce((s, l) => s + l.qty, 0)
  return (
    <>
      <div className="strip">Roasted every Monday in Chikmagalur · Free shipping above {inr(FREE_SHIPPING_FROM)}</div>
      <header className="site">
        <div className="wrap bar">
          <Link href="/" className="logo">kaapi<span>.</span>collective</Link>
          <nav>{CATEGORIES.map((c) => <Link key={c.slug} href={`/collections/${c.slug}`}>{c.name}</Link>)}</nav>
          <form action="/search" className="mini-search"><input name="q" placeholder="Search coffee" aria-label="Search coffee" /></form>
          <Link href="/cart" className="cart-link">Cart{count > 0 && <span className="count">{count}</span>}</Link>
        </div>
      </header>
    </>
  )
}
