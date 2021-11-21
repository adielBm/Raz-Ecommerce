import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";

function Cart() {
  const cart = useContext(CartContext);
  return ( 
    <div>
      <h1>Cart Total ({cart.cartItems.length})</h1>
    </div>
   );
}

export default Cart;