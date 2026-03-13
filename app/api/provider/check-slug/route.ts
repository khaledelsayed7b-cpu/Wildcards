import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('providers')
    .select('slug')
    .eq('slug', slug)
    .single();

  if (error && error.code === 'PGRST116') {
    // No rows returned, slug is available
    return NextResponse.json({ available: true });
  }

  if (data) {
    return NextResponse.json({ available: false });
  }

  return NextResponse.json({ error: 'Error checking slug' }, { status: 500 });
}
