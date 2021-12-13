import Link from "next/link"
import ClientOnly from '../hooks/ClientOnly';
import { useCart } from "../hooks/useCart";
import styles from './Header.module.scss';

const Header = () => {

  const { itemCount } = useCart()

  return (
    <header className={`${styles.header} flex`}>
      <Link href="/"><h2 className="col">raz ecommerce</h2></Link>
      <ClientOnly>
        <Link href="/cart"><a className={`${styles.cart}`}>{itemCount}</a></Link>
      </ClientOnly>
    </header>
  )
}

export default Header