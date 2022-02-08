import router, { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { getOrderByCode, updateOrderComplated } from '../../apollo/getQueries'
import Paypal from '../../components/Paypal'
import ThankYou from '../../components/ThankYou'
import { CartContext } from '../../contexts/cart/CartContext'

const Order = ({ data }) => {
  const { clearCart } = useContext(CartContext)

  // function for refresh data of getServerSideProps
  const router = useRouter()
  const refreshData = () => router.replace(router.asPath)

  const [payed, setPayed] = useState(false)

  const {
    data: {
      orderByCode: {
        data: { attributes: order },
      },
    },
  } = data

  console.log(order)

  const handldePaymentSuccess = async () => {
    await updateOrderComplated(order.code)
    refreshData()
    setPayed(true)
    clearCart()
  }

  return (
    <div>
      <h1 className="mb-8 border-b-2 pb-8 text-center">Order</h1>
      <div className="m-auto max-w-md">
        <h3>Hello, {order.first_name}</h3>
        <div>Total: {order.total}$ </div>
        {order.status == 'completed' ? (
          <ThankYou name={order.first_name} />
        ) : (
          <Paypal onSuccess={handldePaymentSuccess} />
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const data = await getOrderByCode(params.code)
  return { props: { data } }
}

export default Order
