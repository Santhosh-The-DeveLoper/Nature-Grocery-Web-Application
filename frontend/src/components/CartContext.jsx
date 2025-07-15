import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    let success = false;

    setCartItems((prevItems) => {
      const totalQuantity = prevItems.reduce((acc, item) => acc + item.quantity, 0);
      if (totalQuantity >= 5) return prevItems;

      const existingItem = prevItems.find(item => item.name === product.name);
      success = true;

      if (existingItem) {
        return prevItems.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    return success; 
  };


  const removeFromCart = (productName) => {
    setCartItems((prevItems) =>
      prevItems.filter(item => item.name !== productName)
    );
  };


  const changeQuantity = (productName, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.name === productName ? { ...item, quantity } : item
      )
    );
  };


  const getTotalPrice = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        changeQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
