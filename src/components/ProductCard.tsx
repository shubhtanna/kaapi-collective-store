import Link from 'next/link'
import Bag from './Bag'
import { inr, pctOff, type Product } from '@/lib/catalog'

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="card">
      <Link href={`/products/${p.slug}`} className="card-link">
        <Bag p={p} />
        <h3>{p.name}</h3>
        <p className="meta">{p.notes ?? p.weight}</p>
      </Link>
      <p className="price">
        <strong>{inr(p.price)}</strong>
        {pctOff(p) > 0 && <> <s>{inr(p.mrp)}</s> <span className="off">{pctOff(p)}% off</span></>}
        {!p.inStock && <span className="soldout"> · Sold out</span>}
      </p>
    </article>
  )
}
