import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NoticesContext } from "../contexts/NoticesContext";
import { useCart } from "../hooks/useCart";
import { gql, useMutation } from '@apollo/client';
import { CREATE_ORDER } from "../apollo/queries";
import { useRouter } from 'next/router'


function Checkout() {

  const router = useRouter()

  const { cartItems, total, clearCart, itemCount } = useCart()
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
    return 'The order was completed successfully.✅🚚'
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

  const onSubmit = async (data) => {

    const { first_name, last_name, email, address } = data

    createOrder({
      variables: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        address: address,
        items: cartItems.map((el) => ({ count: el.quantity, product: parseInt(el.id) })),
        total: parseInt(total),
      }
    })

    clearCart()

  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <div>
            <label>First Name</label>
            <input type="text" defaultValue="" {...register("first_name")} />
          </div>

          <div>
            <label>Last Name</label>
            <input type="text" defaultValue="" {...register("last_name")} />
          </div>

          <div>
            <label>Email</label>
            <input type="text" defaultValue="" {...register("email")} />
          </div>

          <div>
            <label>Address</label>
            <input type="text" defaultValue="" {...register("address")} />
          </div>
        </div>

        <input type="submit" />

      </form>
    </div>
  );
}

export default Checkout;