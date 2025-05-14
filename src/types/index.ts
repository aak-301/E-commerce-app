// src/types/index.ts

/**
 * Product type definition from the Fake Store API
 */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

/**
 * Cart item with additional quantity property
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * Cart state interface
 */
export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

/**
 * Cart context interface
 */
export interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

/**
 * Snackbar message types
 */
export type SnackbarType = 'info' | 'success' | 'error';

/**
 * Snackbar context interface
 */
export interface SnackbarContextType {
  isVisible: boolean;
  message: string;
  type: SnackbarType;
  showSnackbar: (
    text: string,
    messageType?: SnackbarType,
    duration?: number,
  ) => void;
  hideSnackbar: () => void;
}

/**
 * Navigation types
 */
export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: {product: Product};
  Cart: undefined;
};

/**
 * API error type
 */
export interface ApiError {
  message: string;
  status: number;
  data: any;
}
