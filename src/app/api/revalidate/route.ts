import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

/**
 * GET /api/revalidate?slug=xyz&secret=TOKEN
 *
 * Triggers ISR revalidation for a provider's subdomain page.
 * Call this after a provider updates their profile so the CDN
 * edge cache is purged and fresh data is served.
 *
 * Protected by a shared secret — never expose the secret on the client.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    const slug = searchParams.get('slug')?.toLowerCase().trim()

    // ── Validate secret ──────────────────────────────────────────────────
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { data: null, error: 'Invalid revalidation secret' },
        { status: 401 }
      )
    }

    if (!slug) {
      return NextResponse.json(
        { data: null, error: 'slug parameter is required' },
        { status: 400 }
      )
    }

    const slugRegex = /^[a-z0-9-]{3,40}$/
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { data: null, error: 'Invalid slug format' },
        { status: 400 }
      )
    }

    // ── Revalidate the provider's page ──────────────────────────────────
    // The [slug] page is served at /<slug> internally (middleware rewrites
    // the subdomain to this path).
    revalidatePath(`/${slug}`)

    return NextResponse.json({
      data: { revalidated: true, slug, timestamp: new Date().toISOString() },
      error: null,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ data: null, error: message }, { status: 500 })
  }
}
