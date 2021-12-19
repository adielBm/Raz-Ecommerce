import { useCart } from "../hooks/useCart";
import ClientOnly from '../hooks/ClientOnly';
import Link from 'next/link'
import { fromImageToUrl } from "../utils/fromImageToUrl"
import Image from 'next/image'
import Shipping from "../components/Shipping";
import { getDeliveryMethods } from '../apollo/getQueries'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import OrderSummary from "../components/OrderSummary";
import { useEffect } from "react";

function Cart({ data }) {

  const {
    increase,
    decrease,
    clearCart,
    removeProduct,
    cartItems,
    total,
    itemCount,
    handleCheckout,
    handleDelivery,
    delivery
  } = useCart()

  const deliveries = data.deliveries.data

  useEffect(() => {
    if (delivery == null) {
      handleDelivery(deliveries[0])
    }
    // return () => {
    //   cleanup
    // }
  }, [])

  if (!itemCount) return (
    <ClientOnly>
      <h1>Cart</h1>
      <div>
        <p>Your cart is currently empty.</p>
        <p>Continue browsing <Link href="/"><a>here</a></Link>.</p>
      </div>
    </ClientOnly>
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
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    {product.quantity}
                    <button className="btn-icon" onClick={() => increase(product)} aria-label="add">
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <div>{product.price * product.quantity}$</div>
                  <div>
                    <button className="btn-icon" onClick={() => removeProduct(product)} aria-label="add">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="btn" onClick={clearCart}>
            Clear
            <FontAwesomeIcon icon={faTrash} />
          </button>

        </div>

        <div className="space-y-6 basis-1/4">
          <h2>Shipping</h2>
          <Shipping data={data} />
          <OrderSummary />
          <Link href={'/checkout/'}>
            <button className="btn w-full">
              Checkout
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </Link>
        </div>
      </div>
    </ClientOnly >
  );
}

export default Cart;

export async function getServerSideProps() {
  const data = await getDeliveryMethods()
  return { props: { data } }
}
