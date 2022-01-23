import Link from "next/link"
import ClientOnly from '../../hooks/ClientOnly';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faShoppingBasket, faPhone, faBook, faQuestionCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import Search from "./Search";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart/CartContext";

const Header = () => {

  const { count } = useContext(CartContext)

  return (
    <header className="sticky sm:relative shadow-lg top-0 z-50 flex text-white justify-between items-center gap-6 paddingscreen py-6 bg-blue">
      <Link href="/">
        <a className="basis-1/2 md:basis-1/3 lg:basis-1/4"><img src="/logo.png"></img></a>
      </Link>
      <Search />
      <div className="flex basis-1/2 md:basis-1/3 lg:basis-1/4 justify-between">
        <ClientOnly>
          <Link href="/cart">
            <a className="space-y-1">
              <div className="relative">
                <span className={`${count ? 'opacity-1 visible' : 'opacity-0 invisible'} inline-flex absolute top-0 right-0 transition-all items-center justify-center h-7 w-7 font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red rounded-full`}>{count}</span>
                <FontAwesomeIcon className="m-auto" icon={faShoppingBasket} />
              </div>
              <div className="text-base hidden sm:block">Cart</div>
            </a>
          </Link>
        </ClientOnly>

        <Link href="#">
          <a className="space-y-1">
            <FontAwesomeIcon className="m-auto" icon={faPhone} />
            <div className="text-base hidden sm:block">Contact</div>
          </a>
        </Link>

        <Link href="/blog">
          <a className="space-y-1">
            <FontAwesomeIcon className="m-auto" icon={faBook} />
            <div className="text-base hidden sm:block">Blog</div>
          </a>
        </Link>

        <Link href="#">
          <a className="space-y-1">
            <FontAwesomeIcon className="m-auto" icon={faQuestionCircle} />
            <div className="text-base hidden sm:block">Help</div>
          </a>
        </Link>

      </div>

    </header>
  )
}

export default Header