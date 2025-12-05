'use client'

import { useState, useCallback, useMemo } from 'react';

export function useCart() {
  const [cart, setCart] = useState([]);

  const addItem = useCallback((item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.name === item.name);
      if (existing) {
        return prev.map((p) =>
          p.name === item.name ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((name) => {
    setCart((prev) => prev.filter((p) => p.name !== name));
  }, []);

  const updateQuantity = useCallback((name, qty) => {
    if (qty <= 0) {
      removeItem(name);
    } else {
      setCart((prev) =>
        prev.map((p) => (p.name === name ? { ...p, qty } : p))
      );
    }
  }, [removeItem]);

  const cartTotal = useMemo(() => {
    const total = cart.reduce((sum, item) => {
      const num =
        Number(
          String(item.price)
            .replace(/[^0-9.,]/g, '')
            .replace(',', '.')
        ) || 0;
      return sum + num * (item.qty || 1);
    }, 0);
    return `€${total.toFixed(2)}`;
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    cartTotal,
    clearCart,
    setCart,
  };
}
