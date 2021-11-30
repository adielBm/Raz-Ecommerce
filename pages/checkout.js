import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NoticesContext } from "../contexts/NoticesContext";
import { useCart } from "../hooks/useCart";
import { gql, useMutation } from '@apollo/client';
import { CREATE_ORDER } from "../apollo/queries";

function Checkout() {

  const { cartItems, total, clearCart } = useCart()
  const Notices = useContext(NoticesContext)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER);

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

    const { email, name, address } = data

    createOrder({ variables: { name: name, total: parseInt(total), email: email } })

    clearCart()

  };

  return (
    <div>
      <h1>Checkout</h1>
      <h3>Billing Address</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          email
          <input defaultValue="" {...register("email")} />
        </div>
        <div>
          name
          <input defaultValue="" {...register("name")} />
        </div>
        <div>
          Address
          <input defaultValue="" {...register("address")} />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default Checkout;