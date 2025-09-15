export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  requiresPrescription: boolean;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  name: string;

  email: string;
}

export enum Page {
  Home = 'HOME',
  Products = 'PRODUCTS',
  ProductDetail = 'PRODUCT_DETAIL',
  Cart = 'CART',
  Checkout = 'CHECKOUT',
  Profile = 'PROFILE',
  Login = 'LOGIN',
}

export interface AppContextType {
  currentPage: Page;
  navigateTo: (page: Page, options?: { productId?: number; category?: string }) => void;
  selectedProductId: number | null;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  user: User | null;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}