import { Alert, Collapse, IconButton, Button } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect } from "react";
import { NoticesContext } from "../contexts/NoticesContext";
import { TransitionGroup } from 'react-transition-group';

import { useCart } from "../hooks/useCart";
import usePrevious from "../hooks/usePrevious";

const itemNotice = ({ notice, handleRemoveNotice }) => {
  return (
    <Alert
      severity={notice.severity}
      action={
        <IconButton
          onClick={() => handleRemoveNotice(notice)}
          aria-label="close"
          color="inherit"
          size="small"
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ mb: 2 }}>
      {notice.msg}
    </Alert>
  )
}

function Notices() {

  const Notices = useContext(NoticesContext)

  // Get the previous value (was passed into hook on last render)
  const { cartItems } = useCart()
  const prevCartItems = usePrevious(cartItems.length);

  useEffect(() => {
    if (cartItems.length > prevCartItems) {
      Notices.addNotice({
        msg: `The product ${cartItems.at(-1).title} has been successfully added to your shopping cart.`,
        severity: 'success'
      })
    } 
/*     if (cartItems.length < prevCartItems) {
      Notices.addNotice({
        msg: `The product has been removed from the shopping cart.`,
        severity: 'info'
      })
    } */
  }, [cartItems.length])

  const handleRemoveNotice = (notice) => {
    Notices.removeNotice(notice)
  };

  return (
    <TransitionGroup>
      {Notices.notices.map((notice, i) => (
        <Collapse key={i}>
          {itemNotice({ notice, handleRemoveNotice })}
        </Collapse>
      ))}
    </TransitionGroup>
  )
}

export default Notices;