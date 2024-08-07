import { useState } from "react";
import Header from "./components/Header";
import { db } from "./data/data.js";
import Guitar from "./components/Guitar";

const App = () => {
  const [guitar, setGuitar] = useState(db);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExist  >= 0 ) {
     const updateCart = [...cart];
     updateCart[itemExist].quantity++;
     setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  };
  return (
    <>
      <Header cart={cart} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitar.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} total={total}  />
          ))}
        </div>
      </main>
    </>
  );
};

export default App;
