import { useCart } from "../hooks/useCart";
import ClientOnly from '../hooks/ClientOnly';
import Link from 'next/link'
import { fromImageToUrl } from "../utils/fromImageToUrl"
import Image from 'next/image'
import Shipping from "../components/Shipping";
import { FaAngleRight, FaMinus, FaPlus, FaTrash } from "react-icons/fa";

function Cart() {

  const { increase, decrease, clearCart, removeProduct, cartItems, total, itemCount, handleCheckout } = useCart()

  if (itemCount == 0) return (
    <h3>Your shopping cart is empty.</h3>
  )


  return (
    <ClientOnly>
      <h1 className="text-center border-b-2 pb-8 mb-8">Cart</h1>
      <div className="md:flex gap-12">
        <div className="space-y-6 grow">
          <h2>Your Cart Items</h2>
          <div className="grid gap-4">
            {cartItems.map((product) => (
              <div key={product.id} className="flex items-center gap-8 rounded-lg shadow-md p-4 bg-white">
                <div className="h-16 w-16 rounded-lg overflow-hidden relative">
                  <Image src={fromImageToUrl(product.image)} layout="fill" objectFit="cover" />
                </div>
                <div className="flex justify-between flex-1">
                  <h3 className="">{product.title}</h3>
                  <div>{product.price}$</div>
                  <div className="flex gap-8">
                    <button className="btn-icon" onClick={() => product.quantity == 1 ? removeProduct(product) : decrease(product)} aria-label="add">
                      <FaMinus />
                    </button>
                    {product.quantity}
                    <button className="btn-icon" onClick={() => increase(product)} aria-label="add">
                      <FaPlus />
                    </button>
                  </div>
                  <div>{product.price * product.quantity}$</div>
                  <div>
                    <button className="btn-icon" onClick={() => removeProduct(product)} aria-label="add">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="btn" onClick={() => handleCheckout()}>Clear</button>

        </div>

        <div className="space-y-6 basis-1/4">
          <h2>Shipping</h2>
          <Shipping />
          <h2>Order summary</h2>
          <div className="box p-6">
            <div className="flex justify-between">
              <span>Cost of products: ({itemCount})</span>
              <span>{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{total}</span>
            </div>
            <div className="flex justify-between border-t-2 pt-3 mt-3">
              <span>Total:</span>
              <h3>{total}</h3>
            </div>
          </div>
          <Link href={`/checkout/`}>
            <button className="btn w-full">
              Checkout
              <FaAngleRight />
            </button>
          </Link>
        </div>
      </div>
    </ClientOnly >
  );
}

export default Cart;