import Link from 'next/link'
import ClientOnly from '../../hooks/ClientOnly'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark,
  faShoppingBasket,
  faPhone,
  faBook,
  faQuestionCircle,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import Search from './Search'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart/CartContext'

const Header = () => {
  const { count } = useContext(CartContext)

  return (
    <header className="paddingscreen sticky top-0 z-50 flex items-center justify-between gap-6 bg-blue py-6 text-white shadow-lg sm:relative">
      <Link href="/">
        <a className="basis-1/2 md:basis-1/3 lg:basis-1/4">
          <img src="/logo.png"></img>
        </a>
      </Link>
      <Search />
      <div className="flex basis-1/2 justify-between md:basis-1/3 lg:basis-1/4">
        <ClientOnly>
          <Link href="/cart">
            <a className="space-y-1">
              <div className="relative">
                <span
                  className={`${
                    count ? 'opacity-1 visible' : 'invisible opacity-0'
                  } absolute top-0 right-0 inline-flex h-7 w-7 translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red font-bold leading-none text-white transition-all`}
                >
                  {count}
                </span>
                <FontAwesomeIcon className="m-auto" icon={faShoppingBasket} />
              </div>
              <div className="hidden text-base sm:block">Cart</div>
            </a>
          </Link>
        </ClientOnly>

        <Link href="#">
          <a className="space-y-1">
            <FontAwesomeIcon className="m-auto" icon={faPhone} />
            <div className="hidden text-base sm:block">Contact</div>
          </a>
        </Link>

        <Link href="/blog">
          <a className="space-y-1">
            <FontAwesomeIcon className="m-auto" icon={faBook} />
            <div className="hidden text-base sm:block">Blog</div>
          </a>
        </Link>

        <Link href="#">
          <a className="space-y-1">
            <FontAwesomeIcon className="m-auto" icon={faQuestionCircle} />
            <div className="hidden text-base sm:block">Help</div>
          </a>
        </Link>
      </div>
    </header>
  )
}

export default Header
