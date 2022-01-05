import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCart } from "../hooks/useCart"
import Link from 'next/link'

const OrderSummary = () => {

  const {
    increase,
    decrease,
    clearCart,
    removeProduct,
    cartItems,
    total,
    itemCount,
    handleCheckout,
    delivery
  } = useCart()

  if (Object.keys(delivery).length === 0 && delivery.constructor === Object) return null

  return (
    <div className="space-y-4" >
      <h2>Order summary</h2>
      <div className="box p-6">
        <div className="flex justify-between">
          <span>Cost of products: ({itemCount})</span>
          <span> {total} $</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping: ({delivery?.attributes?.name})</span>
          <span>{delivery?.attributes?.cost} $</span>
        </div>
        <div className="flex justify-between border-t-2 pt-3 mt-3">
          <span>Total:</span>
          <h4>{total + delivery?.attributes?.cost} $</h4>
        </div>
      </div>
    </div>
  )
}
export default OrderSummary