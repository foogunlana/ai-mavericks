export interface Member {
  name: string;
  slug: string;
  title: string;
  company: string;
  bio: string;
  photo: string;
  isStockPhoto?: boolean;
  linkedin: string;
  twitter: string;
  website: string;
  tags: string[];
  roleType: string;
  dinners: string[];
}

export interface Topic {
  text: string;
  attribution: string;
  links: string[];
}

export interface Dinner {
  name: string;
  slug: string;
  date: string;
  venue: string;
  groupPhoto: string | null;
  isStockPhoto?: boolean;
  description: string;
  topics: Topic[];
  attendees: string[];
  beehiivUrl: string;
  discordUrl: string;
  lumaUrl: string;
}

export interface Tag {
  id: string;
  label: string;
  category: 'interest' | 'role';
}
