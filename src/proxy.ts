import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Bot protection. Added after card-testing bots hammered checkout and scrapers copied our
// prices (Feb 2026): anything that identifies itself as automated gets a 403.
const BLOCKED = /bot|crawl|spider|scrap|agent|python|curl|wget|httpx|axios|headless|phantom|selenium/i

export function proxy(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? ''
  if (!ua || BLOCKED.test(ua)) {
    return new NextResponse(
      '<!doctype html><title>Access denied</title><body style="font-family:sans-serif;padding:40px"><h1>Access denied</h1>' +
        '<p>Automated traffic is not allowed on this site.</p></body>',
      { status: 403, headers: { 'content-type': 'text/html; charset=utf-8' } },
    )
  }
  return NextResponse.next()
}

export const config = {
  // Everything except static assets and robots.txt.
  matcher: ['/((?!_next/static|_next/image|favicon.svg|robots.txt).*)'],
}
