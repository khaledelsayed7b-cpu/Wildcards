import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Provider } from '@/types/provider'
import TemplateMinimal from '@/components/templates/TemplateMinimal'
import TemplateBold from '@/components/templates/TemplateBold'
import TemplateWarm from '@/components/templates/TemplateWarm'

// ISR: revalidate this page every 60 seconds on the CDN edge.
// After a profile update, call /api/revalidate?slug=xyz to purge immediately.
export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

// ─── Data fetching helper ────────────────────────────────────────────────────
async function getProvider(slug: string): Promise<Provider | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('providers')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data as Provider
}

// ─── Dynamic metadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const provider = await getProvider(slug)

  if (!provider) {
    return {
      title: 'Provider Not Found | Hylthcare',
    }
  }

  const title = [provider.name, provider.specialty].filter(Boolean).join(' — ')
  const description = provider.tagline || provider.about?.slice(0, 155) || `${provider.name} on Hylthcare`
  const ogImage = provider.photos?.[0]?.url

  return {
    title: `${title} | Hylthcare`,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `https://${slug}.hylthcare.com`,
      ...(ogImage && {
        images: [{ url: ogImage, alt: provider.name }],
      }),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  }
}

// ─── Page component ──────────────────────────────────────────────────────────
export default async function ProviderPage({ params }: PageProps) {
  const { slug } = await params
  const provider = await getProvider(slug)

  if (!provider) {
    notFound()
  }

  // Route to the correct template
  if (provider.template === 'minimal') {
    return <TemplateMinimal provider={provider} />
  }

  if (provider.template === 'bold') {
    return <TemplateBold provider={provider} />
  }

  // Default: 'warm'
  return <TemplateWarm provider={provider} />
}
