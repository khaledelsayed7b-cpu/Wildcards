import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

/**
 * Middleware — two responsibilities:
 * 1. Subdomain rewriting: drsmith.hylthcare.com → /drsmith (internal rewrite)
 * 2. Supabase session refresh so server components always have a fresh token
 */
export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') ?? ''

  // ─── Subdomain routing ───────────────────────────────────────────────────
  const isProd = hostname.endsWith('.hylthcare.com')
  const isDev  = hostname.endsWith('.localhost') || hostname.endsWith('.localhost:3000')

  let slug: string | null = null

  if (isProd) {
    // e.g. "drsmith.hylthcare.com" → slug = "drsmith"
    const sub = hostname.replace(/\.hylthcare\.com$/, '')
    if (sub && sub !== 'www' && sub !== 'hylthcare') {
      slug = sub
    }
  } else if (isDev) {
    // e.g. "drsmith.localhost:3000" → slug = "drsmith"
    const sub = hostname.replace(/\.localhost(:\d+)?$/, '')
    if (sub && sub !== 'www') {
      slug = sub
    }
  }

  if (slug) {
    // Rewrite to the dynamic [slug] page WITHOUT redirecting the browser.
    // The public URL stays as drsmith.hylthcare.com.
    url.pathname = `/${slug}`
    const rewriteResponse = NextResponse.rewrite(url)

    // Still refresh the Supabase session on rewritten requests
    return await refreshSession(request, rewriteResponse)
  }

  // ─── Regular requests — just refresh the session ─────────────────────────
  const response = NextResponse.next({ request })
  return await refreshSession(request, response)
}

/** Attaches a refreshed Supabase session to the response cookies. */
async function refreshSession(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Refresh the session — do not remove this line.
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico, sitemap.xml, robots.txt
     * - /api/* routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
