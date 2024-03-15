import React, { createContext, useContext, useState, useEffect } from 'react';
import { createCart, addItemToCart, setCartBuyerIdentity, removeItemFromCart, createCheckout } from './components/ShopifyCartService';
import { useUser } from './UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  goToCheckout: () => {},
  isCartLoading: true,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    async function loadCartData() {
      const storedCartId = await AsyncStorage.getItem('cartId');
      const storedCartItems = await AsyncStorage.getItem('cartItems');

      if (storedCartId && storedCartItems) {
        setCartId(storedCartId);
        setCartItems(JSON.parse(storedCartItems));
      } else {
        const newCartId = await createCart();
        setCartId(newCartId);
      }

      if (user && user.email) {
        await updateBuyerIdentity(user.email);
      }

      setIsCartLoading(false);
    }

    loadCartData();
  }, [user]);

  const addToCart = async (variantId, quantity) => {
    if (cartId) {
      try {
        const updatedCartItems = await addItemToCart(cartId, variantId, quantity);
        setCartItems(updatedCartItems);
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  const removeFromCart = async (lineItemId) => {
    if (cartId) {
      try {
        const updatedCartItems = await removeItemFromCart(cartId, lineItemId);
        setCartItems(updatedCartItems);
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  const updateBuyerIdentity = async (email) => {
    if (cartId) {
      try {
        await setCartBuyerIdentity(cartId, email);
      } catch (error) {
        console.error("Error setting cart buyer identity:", error);
      }
    }
  };

  const goToCheckout = async () => {
    if (cartId) {
      try {
        const checkoutUrl = await createCheckout(cartId);
        return checkoutUrl;
      } catch (error) {
        console.error("Error creating checkout:", error);
      }
    }
  };

  // Save cartId to AsyncStorage whenever it changes
  useEffect(() => {
    if (cartId) {
      AsyncStorage.setItem('cartId', cartId);
    }
  }, [cartId]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, goToCheckout, isCartLoading }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
