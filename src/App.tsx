import { useEffect, useState } from "react";
import Header from "./components/Header";
import { db } from "./data/data.js";
import Guitar from "./components/Guitar";
const MAX_ITEM=5 
const MIN_ITEM=1

const App = () => {

  const inicialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [guitar, setGuitar] = useState(db);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(inicialCart);

  const addToCart = (item) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    
    if (itemExist >= 0) {
      if(cart[itemExist].quantity >= MAX_ITEM) return
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
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])
  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitar.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
              total={total}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default App;
