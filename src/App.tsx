
import Header from "./components/Header";
import type{ Guitar as data } from "./types";
import Guitar from "./components/Guitar";
import { useCart } from "./hooks/useCart";


const App = () => {
  

  const {
    guitar,
    total,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();


  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        cartTotal={total}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitar.map((guitar: data) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
              
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default App;
