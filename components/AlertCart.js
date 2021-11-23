import { Alert, Collapse, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from "../hooks/useCart";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";

const AlertCart = () => {

  const { clearAlert } = useCart()
  const cart = useContext(CartContext);

  return (
    <Collapse in={cart.alertShow}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => { clearAlert() }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}>The "<b>{cart.alertShow ? cart.alertShow.title : null}</b>" product has been added to the shopping cart</Alert>
    </Collapse>
  )
}

export default AlertCart