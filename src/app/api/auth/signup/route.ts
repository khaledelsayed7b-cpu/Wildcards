import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

/**
 * POST /api/auth/signup
 *
 * Body: {
 *   email: string
 *   password: string
 *   slug: string       — must be URL-safe, 3-40 chars
 *   name: string
 *   specialty?: string
 *   template?: 'minimal' | 'bold' | 'warm'
 * }
 *
 * Flow (atomic-ish):
 *  1. Validate slug format
 *  2. Reserve slug in slug_reservations (service role, fails on conflict → 409)
 *  3. Create auth user via Supabase Auth
 *  4. Insert provider row
 *  5. On any failure after step 2 → release slug reservation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, slug, name, specialty = '', template = 'warm' } = body

    // ── Validate inputs ──────────────────────────────────────────────────
    if (!email || !password || !slug || !name) {
      return NextResponse.json(
        { data: null, error: 'email, password, slug, and name are required' },
        { status: 400 }
      )
    }

    const slugRegex = /^[a-z0-9-]{3,40}$/
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { data: null, error: 'Slug must be 3-40 characters: lowercase letters, numbers, hyphens only' },
        { status: 400 }
      )
    }

    const admin = createAdminClient()

    // ── 1. Reserve the slug (service role — only this client can write) ──
    const { error: reserveError } = await admin
      .from('slug_reservations')
      .insert({ slug })

    if (reserveError) {
      // unique constraint violation
      if (reserveError.code === '23505') {
        return NextResponse.json(
          { data: null, error: 'This slug is already taken. Please choose another.' },
          { status: 409 }
        )
      }
      throw reserveError
    }

    // ── 2. Create auth user ──────────────────────────────────────────────
    const { data: authData, error: authError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // auto-confirm for now; swap to false for email verification
    })

    if (authError || !authData.user) {
      // Release slug reservation
      await admin.from('slug_reservations').delete().eq('slug', slug)
      return NextResponse.json(
        { data: null, error: authError?.message ?? 'Failed to create user' },
        { status: 400 }
      )
    }

    // ── 3. Insert provider row ───────────────────────────────────────────
    const { data: provider, error: providerError } = await admin
      .from('providers')
      .insert({
        slug,
        name,
        specialty,
        template,
        user_id: authData.user.id,
      })
      .select()
      .single()

    if (providerError) {
      // Rollback: delete auth user and release slug
      await admin.auth.admin.deleteUser(authData.user.id)
      await admin.from('slug_reservations').delete().eq('slug', slug)
      throw providerError
    }

    return NextResponse.json(
      { data: { provider, user_id: authData.user.id }, error: null },
      { status: 201 }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ data: null, error: message }, { status: 500 })
  }
}
