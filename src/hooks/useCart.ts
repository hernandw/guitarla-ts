import { useEffect, useState } from "react";
import { db } from "../data/data";
import type { Guitar, CartItem } from "../types";

export const useCart = () => {
  const inicialCart = (): CartItem[] => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };
  const [guitar] = useState(db);
  const [total] = useState(0);
  const [cart, setCart] = useState(inicialCart);

  const MAX_ITEM = 5;
  const MIN_ITEM = 1;
  const addToCart = (item: Guitar) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEM) return;
      const updateCart = [...cart];
      updateCart[itemExist].quantity++;
      setCart(updateCart);
    } else {
      const newItem: CartItem = { ...item, quantity: 1 };

      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id: Guitar["id"]) => {
    const updateCart = cart.filter((guitar) => guitar.id !== id);
    setCart(updateCart);
  };

  const increaseQuantity = (id: Guitar["id"]) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEM) {
        item.quantity++;
      }
      return item;
    });
    setCart(updateCart);
  };

  const decreaseQuantity = (id: Guitar["id"]) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEM) {
        item.quantity--;
      }
      return item;
    });
    setCart(updateCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return {
    guitar,
    total,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
  };
};
