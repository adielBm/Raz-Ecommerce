import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Link from "next/link"

export default function Item({ data: { attributes } }) {

  const [showMessage, setShowMessage] = useState(false);

  if (attributes.subcategories.data.length < 1) return null

  return (
    <div
      onMouseEnter={() => setShowMessage(true)}
      onMouseLeave={() => setShowMessage(false)}
    >
      <Link href={`/product-category/${attributes.slug}/`} >
        <a className={` ${showMessage ? `bg-white text-blue-500` : `bg-blue-300 text-white`} 
          transition ease-in-out cursor-pointer hover: rounded-t-lg h-8 flex items-center px-4`}>
          {attributes.title}
        </a>
      </Link>
      <CSSTransition
        in={showMessage}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <div
          className="absolute left-0 z-10 w-1/2"
          variant="primary"
          onClose={() => setShowMessage(false)}
        >
          <div className="bg-white shadow-md p-6 grid grid-cols-2 gap-4 rounded-b-lg">
            {attributes.subcategories.data.map(({ attributes }) => (
              <Link key={attributes.slug} href={`/product-category/${attributes.slug}/`}>
                <a className="p-2 rounded-lg hover:bg-blue-100 transition-all ">
                  {attributes.title}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

