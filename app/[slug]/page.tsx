import { createAdminClient } from '@/lib/supabase/admin';
import { Provider } from '@/types/provider';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import TemplateMinimal from '@/components/templates/TemplateMinimal';
import TemplateBold from '@/components/templates/TemplateBold';
import TemplateWarm from '@/components/templates/TemplateWarm';
import { mockProviders } from '@/lib/mock-data';

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 60;

async function getProvider(slug: string): Promise<Provider | null> {
  // DEMO MODE: If Supabase URL is missing, use mock data
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return mockProviders[slug] || null;
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      // Fallback to mock data for the demo if DB query fails
      return mockProviders[slug] || null;
    }

    return data as Provider;
  } catch (e) {
    // Fallback to mock data for the demo if client initialization fails
    return mockProviders[slug] || null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const slug = (await params).slug;
  const provider = await getProvider(slug);

  if (!provider) {
    return {
      title: 'Provider Not Found | Hylthcare',
    };
  }

  return {
    title: `${provider.name} - ${provider.specialty} | Hylthcare`,
    description: provider.tagline || provider.about?.substring(0, 160),
  };
}

export default async function ProviderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const provider = await getProvider(slug);

  if (!provider) {
    notFound();
  }

  switch (provider.template) {
    case 'minimal':
      return <TemplateMinimal provider={provider} />;
    case 'bold':
      return <TemplateBold provider={provider} />;
    case 'warm':
    default:
      return <TemplateWarm provider={provider} />;
  }
}
