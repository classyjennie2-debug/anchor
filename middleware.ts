import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0] ?? ''

  if (host.startsWith('careers.')) {
    const url = request.nextUrl.clone()
    url.pathname = `/careers${request.nextUrl.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*'],
}
