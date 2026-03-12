export type Provider = {
  id: string
  slug: string
  name: string
  specialty: string
  tagline: string
  about: string
  location: string
  template: 'minimal' | 'bold' | 'warm'
  social: {
    instagram?: string
    twitter?: string
    linkedin?: string
    website?: string
  }
  photos: {
    url: string
    label: string
  }[]
  verified: boolean
  created_at: string
  updated_at: string
  user_id: string
}
