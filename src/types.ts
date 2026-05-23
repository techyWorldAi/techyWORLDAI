export interface Company {
  id: string;
  name: string;
  industry: string;
  logo_url?: string;
  created_at?: string;
}

export type Platform =
  | "linkedin"
  | "facebook"
  | "twitter"
  | "instagram"
  | "website"
  | "other";

export interface Story {
  id: string;
  title: string;
  company_name: string;
  description: string;
  platform: Platform;
  link: string;
  created_at?: string;
}

export interface CMSData {
  companies: Company[];
  stories: Story[];
}

export interface ServiceItem {
  id: number;
  title: string;
  tag: string;
  price: string;
  priceNote: string;
  desc: string;
  features: string[];
}
