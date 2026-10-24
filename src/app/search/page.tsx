import type { Metadata } from 'next'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS } from '@/lib/catalog'

export const metadata: Metadata = { title: 'Search' }

export default async function SearchPage({ searchParams }: PageProps<'/search'>) {
  const raw = (await searchParams).q
  const q = (Array.isArray(raw) ? raw[0] : raw ?? '').trim()
  const t = q.toLowerCase()
  const results = t ? PRODUCTS.filter((p) => `${p.name} ${p.estate ?? ''} ${p.notes ?? ''} ${p.roast ?? ''} ${p.category}`.toLowerCase().includes(t)) : []
  return (
    <section className="wrap">
      <h1 className="page">Search</h1>
      <form className="search"><input name="q" defaultValue={q} placeholder="Estate, roast or tasting note" /><button className="btn">Search</button></form>
      {q && <p className="muted">{results.length} result{results.length === 1 ? '' : 's'} for “{q}”</p>}
      <div className="grid">{results.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </section>
  )
}
