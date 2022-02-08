import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { NoticesContext } from '../contexts/NoticesContext'
import { gql, useMutation } from '@apollo/client'
import { CREATE_ORDER } from '../apollo/queries'
import { useRouter } from 'next/router'
import OrderSummary from '../components/OrderSummary'
import Paypal from '../components/Paypal'
import ClientOnly from '../hooks/ClientOnly'
import { CartContext } from '../contexts/cart/CartContext'

function Checkout() {
  const router = useRouter()

  const { items, total, clearCart, count, delivery } = useContext(CartContext)

  const Notices = useContext(NoticesContext)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER)

  if (count == 0) {
    router.push('/cart')
  }

  if (loading) return 'Loading...'

  if (error) {
    console.log('🌋', error)
    return `Submission error! ${error.message}`
  }

  if (data) {
    console.log('🚚data', data)
    router.push(`/order/${data.createOrder.data.attributes.code}`)
  }

  // add here Notices 🔔
  /*   useEffect(() => {
      if (data) {
        Notices.addNotice({
          msg: `The order was completed successfully.`,
          severity: 'success'
        })
      }
    }, [data]) */

  const onSubmit = (data) => {
    const { first_name, last_name, email, address, phone } = data

    createOrder({
      variables: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        address: address,
        phone: phone,
        items: items.map((el) => ({
          count: el.quantity,
          product: parseInt(el.id),
        })),
        delivery: parseInt(delivery.id),
      },
    })

    console.log('Order created. (pendding to pay..) ✔🎉')
  }

  return (
    <div>
      <h1 className="mb-8 border-b-2 pb-8 text-center">Checkout</h1>
      <form className="gap-12 md:flex" onSubmit={handleSubmit(onSubmit)}>
        <div className="grow space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>First Name</label>
              <input
                className="input-text"
                type="text"
                defaultValue=""
                {...register('first_name')}
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                className="input-text"
                type="text"
                defaultValue=""
                {...register('last_name')}
              />
            </div>
            <div className="col-span-2">
              <label>Email</label>
              <input
                className="input-text"
                type="text"
                defaultValue=""
                {...register('email')}
              />
            </div>
            <div className="col-span-2">
              <label>Address</label>
              <input
                className="input-text"
                type="text"
                defaultValue=""
                {...register('address')}
              />
            </div>
            <div className="col-span-2">
              <label>Phone</label>
              <input
                className="input-text"
                type="text"
                defaultValue=""
                {...register('phone')}
              />
            </div>
          </div>
        </div>
        <div className="basis-1/4 space-y-6">
          <ClientOnly>
            <OrderSummary />
          </ClientOnly>
          <h2>Payment</h2>
          <button type="submit" className="btn w-full">
            Place Order
          </button>
          {data && <p>order create! 🎉</p>}
        </div>
      </form>
    </div>
  )
}

export default Checkout
