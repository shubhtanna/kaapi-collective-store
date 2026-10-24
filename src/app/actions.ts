'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cartSummary, readCart, writeCart } from '@/lib/cart'
import { getById } from '@/lib/catalog'

const GRINDS = ['Whole beans', 'French press', 'Pour-over', 'South Indian filter', 'Espresso', 'Not applicable']

export async function addToCart(formData: FormData) {
  const product = getById(String(formData.get('id') ?? ''))
  if (!product || !product.inStock) redirect('/')
  const grind = GRINDS.includes(String(formData.get('grind'))) ? String(formData.get('grind')) : 'Whole beans'
  const qty = Math.max(1, Math.min(10, Number(formData.get('qty')) || 1))
  const lines = await readCart()
  const line = lines.find((l) => l.id === product.id && l.grind === grind)
  if (line) line.qty = Math.min(10, line.qty + qty)
  else lines.push({ id: product.id, grind, qty })
  await writeCart(lines)
  redirect('/cart')
}

export async function setQty(formData: FormData) {
  const id = String(formData.get('id'))
  const grind = String(formData.get('grind'))
  const qty = Math.max(0, Math.min(10, Number(formData.get('qty')) || 0))
  const lines = (await readCart()).map((l) => (l.id === id && l.grind === grind ? { ...l, qty } : l)).filter((l) => l.qty > 0)
  await writeCart(lines)
  redirect('/cart')
}

export type CheckoutState = { errors?: Record<string, string> }

export async function placeOrder(_prev: CheckoutState, formData: FormData): Promise<CheckoutState> {
  const f = Object.fromEntries(['name', 'phone', 'email', 'address', 'city', 'pincode', 'payment'].map((k) => [k, String(formData.get(k) ?? '').trim()]))
  const errors: Record<string, string> = {}
  const phone = f.phone.replace(/\D/g, '').slice(-10)
  if (f.name.length < 2) errors.name = 'Please enter your name.'
  if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = 'Please enter a 10-digit mobile number.'
  if (f.address.length < 8) errors.address = 'Please enter your full address.'
  if (!f.city) errors.city = 'Please enter your city.'
  if (!/^\d{6}$/.test(f.pincode)) errors.pincode = 'Please enter a 6-digit PIN code.'
  if (Object.keys(errors).length) return { errors }

  const cart = await cartSummary()
  if (!cart.count) redirect('/cart')
  const number = 'KC' + Date.now().toString(36).toUpperCase().slice(-6)
  const jar = await cookies()
  jar.set('kc_last_order', JSON.stringify({ number, total: cart.total, count: cart.count, city: f.city, payment: f.payment === 'upi' ? 'UPI on delivery' : 'Cash on delivery' }), { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 3600 })
  await writeCart([])
  redirect(`/order/${number}`)
}
