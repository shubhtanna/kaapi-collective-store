import type { Metadata } from 'next'
import Link from 'next/link'
import Bag from '@/components/Bag'
import { setQty } from '@/app/actions'
import { cartSummary } from '@/lib/cart'
import { inr } from '@/lib/catalog'

export const metadata: Metadata = { title: 'Your cart' }

export default async function CartPage() {
  const cart = await cartSummary()
  return (
    <section className="wrap">
      <h1 className="page">Your cart</h1>
      {cart.count === 0 ? (
        <>
          <p className="muted">Your cart is empty.</p>
          <Link className="btn" href="/collections/beans">Find a coffee</Link>
        </>
      ) : (
        <div className="bag">
          <div>
            {cart.items.map((i) => (
              <div key={i.id + i.grind} className="line">
                <div className="mini"><Bag p={i.product} size="mini" /></div>
                <div>
                  <Link href={`/products/${i.product.slug}`}>{i.product.name}</Link>
                  <small>{i.grind !== 'Not applicable' ? `${i.grind} · ` : ''}{inr(i.product.price)} each</small>
                </div>
                <form action={setQty} className="qty">
                  <input type="hidden" name="id" value={i.id} />
                  <input type="hidden" name="grind" value={i.grind} />
                  <button name="qty" value={i.qty - 1} aria-label="Fewer">−</button>
                  <span>{i.qty}</span>
                  <button name="qty" value={i.qty + 1} aria-label="More">+</button>
                </form>
                <strong>{inr(i.lineTotal)}</strong>
              </div>
            ))}
          </div>
          <aside className="sum">
            <p><span>Subtotal</span><span>{inr(cart.subtotal)}</span></p>
            <p><span>Shipping</span><span>{cart.shipping ? inr(cart.shipping) : 'Free'}</span></p>
            <p className="total"><span>Total</span><span>{inr(cart.total)}</span></p>
            {cart.shipping > 0 && <p className="note">Add {inr(cart.toFree)} more for free shipping.</p>}
            <Link className="btn wide" href={`/checkout?items=${cart.items.map((i) => `${i.id}:${i.qty}`).join(',')}`}>Checkout</Link>
          </aside>
        </div>
      )}
    </section>
  )
}
