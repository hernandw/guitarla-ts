import { useEffect, useState } from "react";
import { db } from "../data/data";

export const useCart = () => {
    const inicialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [guitar, setGuitar] = useState(db);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(inicialCart);

  const MAX_ITEM = 5;
  const MIN_ITEM = 1;
  const addToCart = (item) => {
    

    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEM) return;
      const updateCart = [...cart];
      updateCart[itemExist].quantity++;
      setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id) => {
    const updateCart = cart.filter((guitar) => guitar.id !== id);
    setCart(updateCart);
  };

  const increaseQuantity = (id) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEM) {
        item.quantity++;
      }
      return item;
    });
    setCart(updateCart);
  };

  const decreaseQuantity = (id) => {
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
  };
};
