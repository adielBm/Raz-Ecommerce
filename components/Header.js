import Link from "next/link"
import ClientOnly from '../hooks/ClientOnly';
import { useCart } from "../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const Header = () => {

  const { itemCount } = useCart()

  return (
    <header className="flex items-center gap-6 paddingscreen py-6 bg-blue">
      <Link href="/" >
        <a className="basis-1/4"><img src="/logo.png"></img></a>
      </Link>
      <input
        className="basis-1/4 input-text"
        id="username" type="text" placeholder="Search products..." />
      <ClientOnly>
        <Link href="/cart">
          <a className="relative inline-block">
            <span className={`${itemCount ? 'opacity-1 visible' : 'opacity-0 invisible'} inline-flex absolute -top-1 -right-1 transition-all items-center justify-center px-2 py-1 font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red rounded-full`}>{itemCount}</span>
            <FontAwesomeIcon className="text-white" icon={faShoppingBasket} />
          </a>
        </Link>
      </ClientOnly>
      <Link href="/blog">
        <a className="relative inline-block">
          <FontAwesomeIcon className="text-white" icon={faBookmark} />
        </a>
      </Link>
    </header>
  )
}

export default Header