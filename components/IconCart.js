import Badge from '@mui/material/Badge';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import IconButton from '@mui/material/IconButton';
import Link from "next/link"
import { useCart } from '../hooks/useCart';
import ClientOnly from '../hooks/ClientOnly';

function IconCart() {

  const { itemCount } = useCart()

  return (
    <ClientOnly>
      <Link href="/cart">
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Badge badgeContent={itemCount} color="secondary">
            <ShoppingBasketIcon />
          </Badge>
        </IconButton>
      </Link>
    </ClientOnly>
  )
}

export default IconCart;