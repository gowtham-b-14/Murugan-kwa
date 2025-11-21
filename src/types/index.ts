export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  subcategory?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sku: string;
  brand?: string;
  sizes?: string[];
  colors?: string[];
  specifications?: Record<string, string>;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
  images?: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  subcategories?: Category[];
}

export interface Filter {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  brands?: string[];
  colors?: string[];
  sizes?: string[];
  rating?: number;
  inStock?: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}

export type SortBy = 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular';

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface ProductListResponse {
  products: Product[];
  pagination: PaginationInfo;
}
