import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Add item to cart
const addToCart = (product, quantity = 1) => {
  setCartItems(prevItems => {
    const existing = prevItems.find(item => item.id === product.id);
    if (existing) {
      return prevItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: Math.max(item.quantity + quantity, 1) }
          : item
      );
    } else {
      return [...prevItems, { ...product, quantity }];
    }
  });
};


  // ✅ Remove item
  const removeFromCart = id => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // ✅ Clear cart
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
