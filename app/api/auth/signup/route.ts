import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, slug, name, specialty } = await request.json();
    const supabase = await createClient();

    // 1. Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('User creation failed');

    // 2. Create the provider row
    const { error: providerError } = await supabase
      .from('providers')
      .insert({
        user_id: authData.user.id,
        slug,
        name,
        specialty,
        template: 'warm', // default template
      });

    if (providerError) throw providerError;

    return NextResponse.json({ success: true, user: authData.user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
