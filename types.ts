export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

// The shape of the data used by your UI
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  reviews: Review[];
  printifyId?: string; // Link to external system
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ViewState {
  HOME = 'HOME',
  SHOP = 'SHOP',
  ABOUT = 'ABOUT'
}

// --- Printify Integration Types ---

export interface PrintifyImage {
  src: string;
  variant_ids: number[];
  position: string;
  is_default: boolean;
}

export interface PrintifyVariant {
  id: number;
  price: number; // In cents
  title: string;
  is_enabled: boolean;
}

// The shape of data coming from Printify API
export interface PrintifyProduct {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: PrintifyImage[];
  variants: PrintifyVariant[];
}