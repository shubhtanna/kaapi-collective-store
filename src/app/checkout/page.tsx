import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import CheckoutForm from './CheckoutForm'
import { cartSummary, readCart, writeCart, type CartLine } from '@/lib/cart'
import { getById, inr } from '@/lib/catalog'

export const metadata: Metadata = { title: 'Checkout' }

// Rebuild the cart from a shareable ?items=<id>:<qty>,... link. Unknown ids are ignored
// and quantities are clamped to the 1–10 range the store enforces everywhere else.
function linesFromItemsParam(raw: string | undefined): CartLine[] | null {
  if (!raw) return null
  const wanted = new Map<string, number>()
  for (const part of raw.split(',')) {
    const [id, qty] = part.split(':')
    const n = Math.max(1, Math.min(10, Number(qty) || 1))
    if (getById(id ?? '') && n > 0) wanted.set(id, n)
  }
  if (!wanted.size) return null
  return [...wanted].map(([id, qty]) => ({
    id,
    grind: getById(id)!.category === 'filter-coffee' ? 'South Indian filter' : 'Not applicable',
    qty,
  }))
}

export default async function CheckoutPage({ searchParams }: PageProps<'/checkout'>) {
  const raw = (await searchParams).items
  const shared = linesFromItemsParam(Array.isArray(raw) ? raw[0] : raw)
  // A shared link must work on any device with no cookies, so the order summary is
  // rendered straight from the URL. The cookie cart is only rebuilt when the order is
  // actually placed (a Server Action, which may set cookies).
  const cart = await cartSummary(shared ?? undefined)
  if (cart.count === 0) redirect('/cart')
  return (
    <section className="wrap">
      <h1 className="page">Checkout</h1>
      <div className="co">
        <CheckoutForm total={inr(cart.total)} items={Array.isArray(raw) ? raw[0] : raw} />
        <aside className="sum">
          <h3>Your order</h3>
          {cart.items.map((i) => (
            <p key={i.id + i.grind}><span>{i.product.name} × {i.qty}</span><span>{inr(i.lineTotal)}</span></p>
          ))}
          <p><span>Shipping</span><span>{cart.shipping ? inr(cart.shipping) : 'Free'}</span></p>
          <p className="total"><span>Total</span><span>{inr(cart.total)}</span></p>
        </aside>
      </div>
    </section>
  )
}
