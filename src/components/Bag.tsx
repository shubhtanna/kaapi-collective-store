import type { Product } from '@/lib/catalog'

// A drawn coffee bag (or gear tin) in the product's colour.
export default function Bag({ p, size = '' }: { p: Product; size?: string }) {
  const gear = p.category === 'brewing-gear'
  return (
    <div className={`bag-art ${gear ? 'gear' : ''} ${size}`} style={{ ['--c' as string]: p.colour }} aria-hidden="true">
      <span className="fold" />
      <span className="tag">
        <b>{p.name}</b>
        <small>{p.roast ? `${p.roast} roast · ${p.weight}` : p.weight}</small>
      </span>
    </div>
  )
}
