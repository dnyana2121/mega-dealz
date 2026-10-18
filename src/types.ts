export interface Product {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  category: 'makeup-kits' | 'skincare' | 'lip-eye' | 'haircare' | 'fragrance' | 'combos' | 'clearance';
  categoryLabel: string;
  price: number; // in INR ₹
  originalPrice: number; // in INR ₹
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  isDealOfTheDay?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  image: string;
  galleryImages: string[];
  description: string;
  highlights: string[];
  shades?: { name: string; hex: string }[];
  sizeOrVolume?: string;
  keyIngredients?: string[];
  howToUse?: string;
  deliveryDays?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  content: string[];
  relatedProductIds: string[];
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  shade?: string;
}

export type ViewMode = 'home' | 'catalog' | 'blog' | 'deals';
