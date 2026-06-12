export interface Artisan {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  bio: string;
  location: string;
  craft: string;
  yearsExperience: number;
  totalProductsSold: number;
  revenueGenerated: number;
  rating: number;
  online: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  artisanId: string;
  artisanName: string;
  description: string;
  materials: string[];
  stock: number;
  trending?: boolean;
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  quote: string;
  rating: number;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  image: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  price: number;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "artisan";
  text?: string;
  product?: { name: string; image: string; price: number };
  time: string;
}

export interface ChatThread {
  id: string;
  artisanId: string;
  artisanName: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  lastTime: string;
  unread: number;
  messages: ChatMessage[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
