export interface CraftDetails {
  artisanName: string;
  artisanTitle: string;
  city: string;
  craftingHours: number;
  materials: string[];
  dimensions: string;
  weight: string;
  careInstructions: string;
  inBox: string[];
}

export interface Product {
  id: string;
  name: string;
  category: 'ceramics' | 'leather' | 'jewelry' | 'woodwork' | 'textiles';
  categoryLabel: string;
  price: number; // in Tomans
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  shortDescription: string;
  fullDescription: string;
  craftDetails: CraftDetails;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isLimitedRun?: boolean;
  rating: number;
  reviewsCount: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  giftWrap?: boolean;
}

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  giftPackaging: boolean;
  giftNote?: string;
  deliveryMethod: 'express' | 'tipax' | 'courier';
  paymentMethod: 'online' | 'card_to_card';
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerInfo: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  total: number;
  couponCode?: string;
  status: 'crafting' | 'gift_wrap' | 'shipped' | 'delivered';
  trackingNumber: string;
}

export interface CustomInquiry {
  id: string;
  craftType: string;
  customerName: string;
  phone: string;
  email?: string;
  dimensions?: string;
  materialPreference?: string;
  notes: string;
  estimatedBudget: number;
  date: string;
}
