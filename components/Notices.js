import { useContext, useEffect } from "react";
import { NoticesContext } from "../contexts/NoticesContext";
import usePrevious from "../hooks/usePrevious";
import Toast from "./Toast"
import { CartContext } from "../contexts/cart/CartContext";

function Notices() {

  const Notices = useContext(NoticesContext)

  // Get the previous value (was passed into hook on last render)
  const { items } = useContext(CartContext)
  const prevItems = usePrevious(items.length);

  useEffect(() => {
    if (items.length > prevItems) {
      Notices.addNotice({
        msg: `The product ${items.at(-1).title} has been successfully added to your shopping cart.`
      })
    }
  }, [items.length])

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