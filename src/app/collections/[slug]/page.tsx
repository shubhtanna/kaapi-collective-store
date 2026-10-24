import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { CATEGORIES, categoryOf, inCategory } from '@/lib/catalog'

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps<'/collections/[slug]'>): Promise<Metadata> {
  const c = categoryOf((await params).slug)
  return c ? { title: c.name, description: c.blurb } : {}
}

export default async function Collection({ params }: PageProps<'/collections/[slug]'>) {
  const c = categoryOf((await params).slug)
  if (!c) notFound()
  const products = inCategory(c.slug)
  return (
    <section className="wrap">
      <p className="crumbs"><Link href="/">Home</Link> / {c.name}</p>
      <h1 className="page">{c.name}</h1>
      <p className="muted">{c.blurb} · {products.length} products</p>
      <div className="grid">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </section>
  )
}
