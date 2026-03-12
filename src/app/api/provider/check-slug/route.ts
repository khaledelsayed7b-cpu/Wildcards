import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * GET /api/provider/check-slug?slug=xyz
 *
 * Public endpoint — checks slug availability against both
 * the providers table and slug_reservations.
 *
 * Returns: { data: { available: boolean }, error }
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')?.toLowerCase().trim()

    if (!slug) {
      return NextResponse.json(
        { data: null, error: 'slug query parameter is required' },
        { status: 400 }
      )
    }

    const slugRegex = /^[a-z0-9-]{3,40}$/
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        {
          data: { available: false },
          error: 'Slug must be 3-40 characters: lowercase letters, numbers, hyphens only',
        },
        { status: 200 }
      )
    }

    // Reserved subdomains that can never be used as provider slugs
    const RESERVED = new Set(['www', 'api', 'app', 'admin', 'dashboard', 'help', 'support', 'hylthcare'])
    if (RESERVED.has(slug)) {
      return NextResponse.json({ data: { available: false }, error: null })
    }

    const admin = createAdminClient()

    // Check both tables in parallel
    const [providerResult, reservationResult] = await Promise.all([
      admin.from('providers').select('id').eq('slug', slug).maybeSingle(),
      admin.from('slug_reservations').select('id').eq('slug', slug).maybeSingle(),
    ])

    const isTaken = !!providerResult.data || !!reservationResult.data

    return NextResponse.json({ data: { available: !isTaken }, error: null })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ data: null, error: message }, { status: 500 })
  }
}
