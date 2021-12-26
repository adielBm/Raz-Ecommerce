import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NoticesContext } from "../contexts/NoticesContext";
import { useCart } from "../hooks/useCart";
import { gql, useMutation } from '@apollo/client';
import { CREATE_ORDER } from "../apollo/queries";
import { useRouter } from 'next/router'
import OrderSummary from "../components/OrderSummary";
import Paypal from "../components/Paypal";
import ClientOnly from "../hooks/ClientOnly";

function Checkout() {

  const router = useRouter()

  const { cartItems, total, clearCart, itemCount, delivery } = useCart()
  const Notices = useContext(NoticesContext)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER);


  if (itemCount == 0 ) {
    router.push('/cart')
  }

  if (loading) return 'Loading...';

  if (error) {
    console.log('🌋', error)
    return `Submission error! ${error.message}`
  };

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
        items: cartItems.map((el) => ({ count: el.quantity, product: parseInt(el.id) })),
        delivery: parseInt(delivery.id)
      }
    })

    console.log('Order created. (pendding to pay..) ✔🎉')

  };

  return (
    <div>
      <h1 className="text-center border-b-2 pb-8 mb-8">Checkout</h1>
      <form className="md:flex gap-12" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6 grow">
          <div className="grid gap-4 grid-cols-2">
            <div>
              <label>First Name</label>
              <input className="input-text" type="text" defaultValue="" {...register("first_name")} />
            </div>
            <div>
              <label>Last Name</label>
              <input className="input-text" type="text" defaultValue="" {...register("last_name")} />
            </div>
            <div className="col-span-2">
              <label>Email</label>
              <input className="input-text" type="text" defaultValue="" {...register("email")} />
            </div>
            <div className="col-span-2">
              <label>Address</label>
              <input className="input-text" type="text" defaultValue="" {...register("address")} />
            </div>
            <div className="col-span-2">
              <label>Phone</label>
              <input className="input-text" type="text" defaultValue="" {...register("phone")} />
            </div>
          </div>
        </div>
        <div className="space-y-6 basis-1/4">
          <ClientOnly>
            <OrderSummary />
          </ClientOnly>
          <h2>Payment</h2>
          <button type="submit" className="btn w-full">Place Order</button>
          {data && <p>order create! 🎉</p>}
        </div>
      </form>
    </div>
  );
}

export default Checkout;