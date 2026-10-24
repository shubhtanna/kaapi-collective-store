import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { inr } from '@/lib/catalog'

export const metadata: Metadata = { title: 'Order placed' }

export default async function OrderPage({ params }: PageProps<'/order/[number]'>) {
  const { number } = await params
  const raw = (await cookies()).get('kc_last_order')?.value
  const o = raw ? (JSON.parse(raw) as { number: string; total: number; count: number; city: string; payment: string }) : null
  if (!o || o.number !== number) redirect('/')
  return (
    <section className="wrap thanks">
      <p className="eyebrow">Thank you!</p>
      <h1 className="page">Your coffee is on its way</h1>
      <p className="lead">Order {o.number} · {o.count} item{o.count === 1 ? '' : 's'} · {inr(o.total)} · {o.payment}</p>
      <p className="muted">It ships after Monday&apos;s roast and reaches {o.city} in 2–5 days.</p>
      <Link className="btn" href="/">Keep browsing</Link>
    </section>
  )
}
