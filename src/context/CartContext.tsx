import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, CheckoutFormData } from '../types';

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  pricedTotal: number;
  hasUnpricedItems: boolean;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  toastMessage: { title: string; subtitle?: string } | null;
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  dismissToast: () => void;
}

const STORAGE_KEY = 'ittifaq_handicraft_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // LocalStorage access unavailable
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; subtitle?: string } | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore write errors
    }
  }, [items]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const pricedTotal = items.reduce((sum, item) => {
    if (typeof item.price === 'number') {
      return sum + item.price * item.quantity;
    }
    return sum;
  }, 0);

  const hasUnpricedItems = items.some((item) => item.price === null || item.price === undefined);

  const addToCart = (product: Product, quantity = 1, variant?: string) => {
    const chosenVariant = variant || (product.colours && product.colours[0]) || 'Standard Wrap';
    const itemId = `${product.id}-${chosenVariant}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0],
        categoryLabel: product.categoryLabel,
        price: product.price,
        quantity,
        variant: chosenVariant,
      };
      return [...prevItems, newItem];
    });

    setToastMessage({
      title: `Added to Shopping Cart`,
      subtitle: `${product.name} (Qty: ${quantity})`,
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const dismissToast = () => {
    setToastMessage(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        pricedTotal,
        hasUnpricedItems,
        isCartOpen,
        isCheckoutOpen,
        toastMessage,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        openCart,
        closeCart,
        openCheckout,
        closeCheckout,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
