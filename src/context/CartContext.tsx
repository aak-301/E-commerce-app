// src/context/CartContext.tsx
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSnackbar } from './SnackbarContext';
import { CartState, CartContextType, Product, CartItem } from '../types';

// Define action types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';
const INITIALIZE_CART = 'INITIALIZE_CART';

type CartAction =
  | { type: typeof ADD_TO_CART; payload: { product: Product; quantity?: number } }
  | { type: typeof REMOVE_FROM_CART; payload: number }
  | { type: typeof UPDATE_QUANTITY; payload: { productId: number; quantity: number } }
  | { type: typeof CLEAR_CART }
  | { type: typeof INITIALIZE_CART; payload: CartItem[] };

/**
 * Initial state for the cart
 */
const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

/**
 * Calculate cart totals
 * @param {CartItem[]} items - Cart items
 * @returns {Object} Object containing totalAmount and totalItems
 */
const calculateTotals = (items: CartItem[]): { totalAmount: number; totalItems: number } => {
  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  return { totalAmount, totalItems };
};

/**
 * Cart reducer function
 * @param {CartState} state - Current state
 * @param {CartAction} action - Action object
 * @returns {CartState} New state
 */
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case INITIALIZE_CART:
      return {
        ...state,
        items: action.payload,
        ...calculateTotals(action.payload),
      };

    case ADD_TO_CART: {
      const { product, quantity = 1 } = action.payload;
      
      // Check if product already exists in cart
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);
      
      let updatedItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update quantity if product exists
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // Add new product to cart
        updatedItems = [...state.items, { ...product, quantity }];
      }
      
      // Calculate new totals
      const { totalAmount, totalItems } = calculateTotals(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        totalAmount,
        totalItems,
      };
    }

    case REMOVE_FROM_CART: {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const { totalAmount, totalItems } = calculateTotals(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        totalAmount,
        totalItems,
      };
    }

    case UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      
      // If quantity is 0, remove item from cart
      if (quantity <= 0) {
        return cartReducer(state, { type: REMOVE_FROM_CART, payload: productId });
      }
      
      const updatedItems = state.items.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
      
      const { totalAmount, totalItems } = calculateTotals(updatedItems);
      
      return {
        ...state,
        items: updatedItems,
        totalAmount,
        totalItems,
      };
    }

    case CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};

/**
 * Cart Context
 */
const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

/**
 * Cart Provider Component
 * Provides cart functionality to the entire app
 */
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { showSnackbar } = useSnackbar();

  // Load cart from AsyncStorage on initial mount
  useEffect(() => {
    const loadCart = async (): Promise<void> => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          dispatch({ type: INITIALIZE_CART, payload: JSON.parse(cartData) });
        }
      } catch (error) {
        console.error('Failed to load cart from storage', error);
        showSnackbar('Failed to load your cart', 'error');
      }
    };

    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCart = async (): Promise<void> => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(state.items));
      } catch (error) {
        console.error('Failed to save cart to storage', error);
        showSnackbar('Failed to save your cart', 'error');
      }
    };

    // Skip saving on initial load
    if (state.items.length > 0 || state.totalItems > 0) {
      saveCart();
    }
  }, [state.items]);

  /**
   * Add a product to the cart
   * @param {Product} product - Product to add
   * @param {number} quantity - Quantity to add
   */
  const addToCart = (product: Product, quantity: number = 1): void => {
    dispatch({ type: ADD_TO_CART, payload: { product, quantity } });
    showSnackbar(`${product.title} added to cart`, 'success');
  };

  /**
   * Remove a product from the cart
   * @param {number} productId - ID of product to remove
   */
  const removeFromCart = (productId: number): void => {
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
    showSnackbar('Item removed from cart', 'info');
  };

  /**
   * Update quantity of a product in the cart
   * @param {number} productId - ID of product to update
   * @param {number} quantity - New quantity
   */
  const updateQuantity = (productId: number, quantity: number): void => {
    dispatch({ type: UPDATE_QUANTITY, payload: { productId, quantity } });
  };

  /**
   * Clear the cart
   */
  const clearCart = (): void => {
    dispatch({ type: CLEAR_CART });
    showSnackbar('Cart cleared', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook to use the cart context
 * @returns {CartContextType} Cart context value
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;