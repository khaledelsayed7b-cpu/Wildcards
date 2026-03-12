import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Provider } from '@/types/provider'

type RouteParams = { params: Promise<{ slug: string }> }

// ─── GET /api/provider/[slug] ────────────────────────────────────────────────
/**
 * Public: fetch a provider's full profile by slug.
 * No auth required — RLS allows public SELECT.
 */
export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params
    const supabase = await createClient()

    const { data: provider, error } = await supabase
      .from('providers')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !provider) {
      return NextResponse.json(
        { data: null, error: 'Provider not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: provider as Provider, error: null })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ data: null, error: message }, { status: 500 })
  }
}

// ─── PUT /api/provider/[slug] ────────────────────────────────────────────────
/**
 * Authenticated owner only: update the full provider profile.
 * RLS policy ensures user_id = auth.uid().
 *
 * Body: Partial<Provider> (exclude id, user_id, created_at)
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params
    const supabase = await createClient()

    // Verify authentication
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json(
        { data: null, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Strip out immutable fields the client shouldn't be able to change
    const { id: _id, user_id: _uid, created_at: _ca, slug: _sl, ...updateFields } = body

    const { data: provider, error } = await supabase
      .from('providers')
      .update({
        ...updateFields,
        updated_at: new Date().toISOString(),
      })
      .eq('slug', slug)
      .eq('user_id', user.id) // belt-and-suspenders on top of RLS
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { data: null, error: 'Provider not found or you do not own this profile' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({ data: provider as Provider, error: null })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ data: null, error: message }, { status: 500 })
  }
}
