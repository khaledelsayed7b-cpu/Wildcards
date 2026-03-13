import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

// Simple admin secret check — set ADMIN_SECRET in your .env
function isAdmin(req: Request) {
  const secret = req.headers.get('x-admin-secret');
  return secret === process.env.ADMIN_SECRET;
}

// GET /api/admin/provider — list all providers
export async function GET(req: Request) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST /api/admin/provider — add new provider
export async function POST(req: Request) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      slug,         // subdomain: drahmed  → drahmed.hylthcare.com
      name,         // اسم الدكتور
      specialty,    // التخصص
      tagline,      // الجملة التعريفية
      about,        // نبذة عن الدكتور
      location,     // موقع العيادة
      phone,        // رقم التليفون
      workingHours, // ساعات العمل
      services,     // مصفوفة الخدمات
      template,     // 'minimal' | 'bold' | 'warm'
      social,       // { instagram, twitter, linkedin, website }
      photos,       // [{ url, label }]
    } = body;

    // Validate required fields
    if (!slug || !name || !specialty || !template) {
      return NextResponse.json(
        { error: 'slug, name, specialty, and template are required' },
        { status: 400 }
      );
    }

    // Validate slug format (only lowercase letters, numbers, hyphens)
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: 'slug must contain only lowercase letters, numbers, and hyphens' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Check if slug already exists
    const { data: existing } = await supabase
      .from('providers')
      .select('slug')
      .eq('slug', slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: `Subdomain "${slug}" is already taken` },
        { status: 409 }
      );
    }

    // Insert provider
    const { data, error } = await supabase
      .from('providers')
      .insert({
        slug,
        name,
        specialty,
        tagline: tagline || '',
        about: about || '',
        location: location || '',
        phone: phone || null,
        workingHours: workingHours || null,
        services: services || [],
        template: template || 'warm',
        social: social || {},
        photos: photos || [],
        user_id: 'admin', // admin-created providers
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      provider: data,
      url: `https://${slug}.hylthcare.com`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/provider?slug=drahmed — delete provider
export async function DELETE(req: Request) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from('providers')
    .delete()
    .eq('slug', slug);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, message: `Provider "${slug}" deleted` });
}
