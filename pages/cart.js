import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import { useCart } from "../hooks/useCart";
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClientOnly from '../hooks/ClientOnly';
import Link from 'next/link'


function Cart() {

  const { increase, decrease, clearCart, removeProduct, cartItems, total, itemCount, handleCheckout } = useCart()

  return (
    <div>
      <ClientOnly>
        <h1>Total Items ({itemCount})</h1>
        <Button onClick={() => handleCheckout()}>handleCheckout</Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((product) => (
                <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {product.quantity}
                      <IconButton onClick={() => increase(product)} aria-label="add">
                        <AddIcon />
                      </IconButton>
                      <IconButton onClick={() => product.quantity == 1 ? removeProduct(product) : decrease(product)} aria-label="add">
                        <RemoveIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => removeProduct(product)} aria-label="add">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{total}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </ClientOnly>
      <Link href={`/checkout/`}>
        <button>Checkout</button>
      </Link>
    </div>
  );
}

export default Cart;