import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Bot protection. Added after card-testing bots hammered checkout and scrapers copied our
// prices (Feb 2026). Those clients are one-off scripts, so we block empty user agents and
// common HTTP scripting tools. AI shopping agents and search crawlers send a normal bot
// user agent and are allowed through: the store is meant to be readable by them (they also
// honour robots.txt), so generic words like "bot" or "agent" are not blocked.
const BLOCKED = /python|curl|wget|httpx|axios|headless|phantom|selenium|libwww|go-http-client/i

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
