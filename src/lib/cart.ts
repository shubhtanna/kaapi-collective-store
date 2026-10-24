import { cookies } from 'next/headers'
import { FREE_SHIPPING_FROM, SHIPPING_FEE, getById } from './catalog'

export interface CartLine { id: string; grind: string; qty: number }
const COOKIE = 'kc_cart'

export async function readCart(): Promise<CartLine[]> {
  const raw = (await cookies()).get(COOKIE)?.value
  if (!raw) return []
  try {
    return (JSON.parse(raw) as CartLine[]).filter((l) => getById(l.id) && l.qty > 0)
  } catch {
    return []
  }
}

export async function writeCart(lines: CartLine[]) {
  ;(await cookies()).set(COOKIE, JSON.stringify(lines), { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })
}

export async function cartSummary(lines?: CartLine[]) {
  const items = (lines ?? (await readCart())).map((l) => {
    const product = getById(l.id)!
    return { ...l, product, lineTotal: product.price * l.qty }
  })
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0)
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE
  return { items, count: items.reduce((s, i) => s + i.qty, 0), subtotal, shipping, total: subtotal + shipping, toFree: Math.max(0, FREE_SHIPPING_FROM - subtotal) }
}
