import Link from "next/link"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './Header.module.css'
import Badge from '@mui/material/Badge';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";

const Header = () => {
  const cart = useContext(CartContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" >
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href={`/`} >
              <a>
                <Typography variant="h4" className={styles.title} >raz ecommerce</Typography>
              </a>
            </Link>
          </Typography>
          <Box color="white" sx={{ display: { xs: 'flex' } }}>
            <Link href="/cart">
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <Badge badgeContent={cart.itemCount} color="secondary">
                  <ShoppingBasketIcon />
                </Badge>
              </IconButton>
            </Link>
          </Box>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header