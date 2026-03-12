import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

type RouteParams = { params: Promise<{ slug: string }> }

const VALID_TEMPLATES = ['minimal', 'bold', 'warm'] as const
type Template = typeof VALID_TEMPLATES[number]

/**
 * PATCH /api/provider/[slug]/template
 *
 * Authenticated owner only — updates just the template field.
 * Body: { template: 'minimal' | 'bold' | 'warm' }
 */
export async function PATCH(
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

    const { template } = await request.json()

    if (!VALID_TEMPLATES.includes(template as Template)) {
      return NextResponse.json(
        { data: null, error: `template must be one of: ${VALID_TEMPLATES.join(', ')}` },
        { status: 400 }
      )
    }

    const { data: provider, error } = await supabase
      .from('providers')
      .update({ template, updated_at: new Date().toISOString() })
      .eq('slug', slug)
      .eq('user_id', user.id)
      .select('id, slug, template, updated_at')
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

    return NextResponse.json({ data: provider, error: null })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ data: null, error: message }, { status: 500 })
  }
}
