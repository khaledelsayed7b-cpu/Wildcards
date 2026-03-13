export interface Provider {
  slug: string;
  name: string;
  specialty: string;
  tagline: string;
  about: string;
  location: string;
  phone?: string;
  workingHours?: string;
  services?: string[];
  template: 'minimal' | 'bold' | 'warm';
  social: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  photos: {
    url: string;
    label: string;
  }[];
  user_id: string;
}
