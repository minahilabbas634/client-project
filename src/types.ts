export type CategoryType = 
  | 'all'
  | 'traditional'
  | 'winter'
  | 'fashion';

export type GenderType = 'women' | 'men' | 'unisex';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryType;
  categories: CategoryType[];
  categoryLabel: string;
  gender: GenderType;
  audience: GenderType;
  description: string;
  price: number | null; // null represents "Price on request"
  originalPrice?: number | null;
  currency: 'PKR';
  images: string[];
  image: string;
  colours?: string[];
  fabric?: string;
  dimensions?: string;
  availability: 'In Stock' | 'Available to Order' | 'Made on Request' | 'Inquire for Stock';
  featured?: boolean;
  isDemoSample: boolean;
  verifiedBadges?: string[];
}

export interface CartItem {
  id: string; // composite key: `${productId}-${variant || 'default'}`
  productId: string;
  slug: string;
  name: string;
  image: string;
  categoryLabel: string;
  price: number | null;
  quantity: number;
  variant?: string;
}

export interface CheckoutFormData {
  customerName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
}

export interface WhatsAppConfig {
  phoneNumber: string; // e.g. "923443015624"
  displayNumber: string; // e.g. "+92 344 3015624"
  isConfigured: boolean;
  storeName: string;
  defaultGreeting: string;
}

export type PageRoute = 
  | { name: 'home' }
  | { name: 'shop'; category?: CategoryType; gender?: GenderType }
  | { name: 'womens' }
  | { name: 'mens' }
  | { name: 'traditional' }
  | { name: 'winter' }
  | { name: 'fashion' }
  | { name: 'product-detail'; slug: string }
  | { name: 'cart' }
  | { name: 'checkout' }
  | { name: 'about' }
  | { name: 'contact' };
