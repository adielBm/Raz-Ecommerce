import router from "next/router"
import { useState } from "react"
import { getOrderByCode, updateOrderComplated } from "../../apollo/getQueries"
import Paypal from "../../components/Paypal"
import ThankYou from "../../components/ThankYou"
import { useCart } from "../../hooks/useCart"

const Order = ({ data }) => {

  const { cartItems, total, clearCart, itemCount, delivery } = useCart()

  const [payed, setPayed] = useState(false)

  const { data: { orderByCode: { data: { attributes: order } } } } = data

  const handldePaymentSuccess = async () => {
    await updateOrderComplated(order.code)
    setPayed(true)
    clearCart()
  }

  return (
    <div >
      <h1 className="text-center border-b-2 pb-8 mb-8">Order</h1>
      <div className="max-w-md m-auto">
        <h3>Hello, {order.first_name}</h3>
        <div>Total: {order.total}$ </div>
        {order.status == "completed" ? <ThankYou name={order.first_name} /> : <Paypal onSuccess={handldePaymentSuccess} />}
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const data = await getOrderByCode(params.code)
  return { props: { data } }
}

export default Order