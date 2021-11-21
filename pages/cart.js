import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";
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


function Cart() {

  const cart = useContext(CartContext);
  const { increase, decrease, clearCart, removeProduct } = useCart()

  return (
    <div>
      <h1>Cart Total ({cart.cartItems.length})</h1>
      <Button onClick={() => clearCart()}>Clear Cart</Button>
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
            {cart.cartItems.map((product) => (
              <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    {product.quantity}
                    <IconButton aria-label="add">
                      <AddIcon onClick={() => increase(product)} />
                    </IconButton>
                    <IconButton aria-label="add">
                      <RemoveIcon onClick={() => product.quantity == 1 ? removeProduct(product) : decrease(product)} />
                    </IconButton>
                  </Stack>
                </TableCell>
                <TableCell>
                  <IconButton aria-label="add">
                    <DeleteIcon onClick={() => removeProduct(product)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{cart.total}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

    </div>
  );
}

export default Cart;