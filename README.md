# Kaapi Collective

Online store for Kaapi Collective, small-batch specialty coffee roasters in Chikmagalur.

Built with Next.js 16 (App Router, Server Components and Server Actions). The range is in
`src/lib/catalog.ts`; the cart is kept in a cookie (`src/lib/cart.ts`). `src/proxy.ts` blocks
automated traffic.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

Deployed on Vercel. Demo store: no real orders, payments or deliveries.
