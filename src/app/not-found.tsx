import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="wrap thanks">
      <h1 className="page">This page has gone cold</h1>
      <p className="lead">We couldn&apos;t find what you were looking for.</p>
      <Link className="btn" href="/">Back to the shop</Link>
    </section>
  )
}
