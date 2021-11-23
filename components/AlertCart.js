import { Alert, Collapse, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from "../hooks/useCart";
import Link from "next/link"

const AlertCart = () => {

  const { clearAlert, alertShow } = useCart()

  return (
    <Collapse in={alertShow}>
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
        sx={{ mb: 2 }}>
        The "<Link href={`/product/${alertShow.slug}`}><a>{alertShow ? alertShow.title : null}</a></Link>" product has been added to the shopping cart
      </Alert>
    </Collapse>
  )
}

export default AlertCart