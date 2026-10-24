import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import CheckoutForm from './CheckoutForm'
import { cartSummary } from '@/lib/cart'
import { inr } from '@/lib/catalog'

export const metadata: Metadata = { title: 'Checkout' }

export default async function CheckoutPage() {
  const cart = await cartSummary()
  if (cart.count === 0) redirect('/cart')
  return (
    <section className="wrap">
      <h1 className="page">Checkout</h1>
      <div className="co">
        <CheckoutForm total={inr(cart.total)} />
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
