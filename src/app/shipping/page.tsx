import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Shipping & returns' }

export default function Shipping() {
  return (
    <section className="wrap prose">
      <h1 className="page">Shipping &amp; returns</h1>
      <h3>Shipping</h3>
      <p>We roast every Monday and ship on Tuesday and Wednesday. Free shipping above ₹999, otherwise ₹79. Delivery in 2–5 days across India.</p>
      <h3>Payment</h3>
      <p>Cash on delivery or UPI on delivery.</p>
      <h3>Returns</h3>
      <p>Coffee can&apos;t be returned once opened, but if a bag arrives damaged or you don&apos;t like a roast, write to us within 7 days and we&apos;ll make it right.</p>
    </section>
  )
}
