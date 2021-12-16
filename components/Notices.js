import { useContext, useEffect } from "react";
import { NoticesContext } from "../contexts/NoticesContext";
import { useCart } from "../hooks/useCart";
import usePrevious from "../hooks/usePrevious";
import Toast from "./Toast"

function Notices() {

  const Notices = useContext(NoticesContext)

  // Get the previous value (was passed into hook on last render)
  const { cartItems } = useCart()
  const prevCartItems = usePrevious(cartItems.length);

  useEffect(() => {
    if (cartItems.length > prevCartItems) {
      Notices.addNotice({
        msg: `The product ${cartItems.at(-1).title} has been successfully added to your shopping cart.`
      })
    }
  }, [cartItems.length])

  return (
    <>
      {Notices.notices.map((notice, i) => (
        <div key={i}>
          <Toast notice={notice}/>
        </div>
      ))}
    </>
  )
}

export default Notices;