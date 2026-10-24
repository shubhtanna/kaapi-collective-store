'use client'

import { useActionState } from 'react'
import { placeOrder, type CheckoutState } from '@/app/actions'

export default function CheckoutForm({ total }: { total: string }) {
  const [state, action, pending] = useActionState<CheckoutState, FormData>(placeOrder, {})
  const e = state.errors ?? {}
  return (
    <form action={action} className="co-form" noValidate>
      <h3>Delivery details</h3>
      <label>Full name<input name="name" autoComplete="name" />{e.name && <small>{e.name}</small>}</label>
      <div className="two">
        <label>Mobile<input name="phone" type="tel" autoComplete="tel" />{e.phone && <small>{e.phone}</small>}</label>
        <label>Email (optional)<input name="email" type="email" autoComplete="email" /></label>
      </div>
      <label>Address<input name="address" autoComplete="street-address" />{e.address && <small>{e.address}</small>}</label>
      <div className="two">
        <label>City<input name="city" />{e.city && <small>{e.city}</small>}</label>
        <label>PIN code<input name="pincode" inputMode="numeric" maxLength={6} />{e.pincode && <small>{e.pincode}</small>}</label>
      </div>
      <h3>Payment</h3>
      <label className="radio"><input type="radio" name="payment" value="cod" defaultChecked /> Cash on delivery</label>
      <label className="radio"><input type="radio" name="payment" value="upi" /> UPI on delivery</label>
      <button className="btn wide" type="submit" disabled={pending}>{pending ? 'Placing order…' : `Place order · ${total}`}</button>
      <p className="muted small">Demo store: no payment is taken and nothing is shipped.</p>
    </form>
  )
}
