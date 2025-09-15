import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { AppContextType, Page, Product, CartItem, User } from '../types';

export const AppContext = createContext<AppContextType | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const navigateTo = useCallback((page: Page, options?: { productId?: number; category?: string }) => {
    setCurrentPage(page);
    setSelectedProductId(options?.productId ?? null);

    if (page === Page.Products) {
      setSelectedCategory(options?.category || 'All');
    }
    
    window.scrollTo(0, 0);
  }, []);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const getCartItemCount = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const login = useCallback((user: User) => {
    setUser(user);
    setIsAuthenticated(true);
    navigateTo(Page.Home);
  }, [navigateTo]);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    navigateTo(Page.Home);
  }, [navigateTo]);

  const value = {
    currentPage,
    navigateTo,
    selectedProductId,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemCount,
    isAuthenticated,
    login,
    logout,
    user,
    selectedCategory,
    setSelectedCategory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};