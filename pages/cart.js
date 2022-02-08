import ClientOnly from '../hooks/ClientOnly'
import Link from 'next/link'
import { getStrapiMedia } from '../utils'
import Image from 'next/image'
import Shipping from '../components/Shipping'
import { getDeliveryMethods } from '../apollo/getQueries'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleRight,
  faMinus,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import OrderSummary from '../components/OrderSummary'
import { useContext, useEffect } from 'react'
import Head from 'next/head'
import { CartContext } from '../contexts/cart/CartContext'

function Cart({ data }) {
  const {
    increase,
    decrease,
    clearCart,
    removeProduct,
    items,
    count,
    setDelivery,
    delivery,
  } = useContext(CartContext)

  const deliveries = data.deliveries.data

  useEffect(() => {
    if (delivery == null) {
      setDelivery(deliveries[0])
    }
    // return () => {
    //   cleanup
    // }
  }, [])

  if (!count)
    return (
      <ClientOnly>
        <h1>Cart</h1>
        <div>
          <p>Your cart is currently empty.</p>
          <p>
            Continue browsing{' '}
            <Link href="/">
              <a>here</a>
            </Link>
            .
          </p>
        </div>
      </ClientOnly>
    )

  return (
    <ClientOnly>
      {/*   <Head>
        <script type="text/javascript" src="pickup.js"></script>
      </Head> */}
      <h1 className="mb-8 border-b-2 pb-8 p-10 text-center">Cart</h1>
      <div className="gap-12 md:flex">
        <div className="grow space-y-6">
          <h2>Your Cart Items</h2>
          <div className="grid gap-4">
            {items.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-8 rounded-lg bg-white p-4 shadow-md"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                  <Image
                    src={getStrapiMedia(product.image.data)}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-1 justify-between">
                  <h3 className="">{product.title}</h3>
                  <div>{product.price}$</div>
                  <div className="flex gap-8">
                    <button
                      className="btn-icon"
                      onClick={() =>
                        product.quantity == 1
                          ? removeProduct(product)
                          : decrease(product)
                      }
                      aria-label="add"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    {product.quantity}
                    <button
                      className="btn-icon"
                      onClick={() => increase(product)}
                      aria-label="add"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <div>{product.price * product.quantity}$</div>
                  <div>
                    <button
                      className="btn-icon"
                      onClick={() => removeProduct(product)}
                      aria-label="add"
                    >
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

          {/* 
          <div onClick={() => { window.PickupsSDK.onClick(); return; }} className="ups-pickups ups-pickups-48" ></div>
          <div className="ups-pickups-info"></div> 
          */}
        </div>

        <div className="basis-1/4 space-y-8">
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
    </ClientOnly>
  )
}

export default Cart

export async function getServerSideProps() {
  const data = await getDeliveryMethods()
  return { props: { data } }
}
