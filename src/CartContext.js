import React, { createContext, useContext, useState, useEffect } from 'react';
// At the beginning of CartContext.js
import { createCart, addItemToCart, setCartBuyerIdentity, removeItemFromCart, createCheckout } from './components/ShopifyCartService';
// ... rest of the imports
import { useUser } from './UserContext'; // Import useUser



const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useUser(); // Use useUser to access the logged-in user's data
  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const initializeCart = async () => {
      const newCartId = await createCart();
      setCartId(newCartId);
      if (user && user.email) {
        updateBuyerIdentity(user.email); // Automatically set buyer identity upon cart creation if user is logged in
      }
    };

    if (!cartId) {
      initializeCart();
    }
  }, [cartId, user]);

  const addToCart = async (variantId, quantity) => {
    if (cartId) {
      const updatedCartItems = await addItemToCart(cartId, variantId, quantity);
      setCartItems(updatedCartItems);
      if (user && user.email) {
        updateBuyerIdentity(user.email); // Automatically update buyer identity when an item is added
      }
    }
  };

  const updateBuyerIdentity = async (email) => {
    if (cartId) {
      await setCartBuyerIdentity(cartId, email);
    }
  };

  const removeFromCart = async (lineItemId) => {
    if (cartId) {
      const updatedCartItems = await removeItemFromCart(cartId, lineItemId);
      setCartItems(updatedCartItems);
    }
  };
  // Rest of the context methods...

// Inside CartContext.js within the CartProvider component

const goToCheckout = async () => {
    if (cartId) {
      try {
        const checkoutUrl = await createCheckout(cartId);
        // Here, you'd usually return checkoutUrl or handle opening the browser directly
        return checkoutUrl;
      } catch (error) {
        console.error("Error creating checkout:", error);
      }
    }
  };
  
  // ...rest of your code
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateBuyerIdentity, removeFromCart, goToCheckout   }}>
      {children}
    </CartContext.Provider>
  );
};
