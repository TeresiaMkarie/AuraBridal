export interface Product {
  id: string;
  name: string;
  category: 'dresses' | 'jewelry' | 'veils' | 'shoes' | 'accessories';
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  subtitle?: string;
  badge?: string; // e.g. "MADE TO ORDER", "PURE MULBERRY SILK", "RUNWAY EDITION"
  vibe: 'modern' | 'classic' | 'boho';
  silhouette: 'sheath' | 'a-line' | 'mermaid' | 'accessory' | 'veil' | 'shoes';
  isIcon?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface CartItem {
  id: string;
  qty: number;
}

export interface ActiveFilters {
  search: string;
  category: string;
  price: string;
  sort: string;
}

export interface QuizAnswers {
  vibe?: 'classic' | 'modern' | 'boho';
  silhouette?: 'a-line' | 'sheath' | 'mermaid';
  budget?: 'under1000' | '1000-2500' | 'over2500';
}

export interface SalonBooking {
  salon: string;
  fullName: string;
  email: string;
  phone: string;
  weddingDate: string;
  notes: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role?: string;
  weddingDate?: string;
}

