import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Link from 'next/link'

export default function Item({ data: { attributes } }) {
  const [showMessage, setShowMessage] = useState(false)

  if (attributes.subcategories.data.length < 1) return null

  return (
    <div
      onMouseEnter={() => setShowMessage(true)}
      onMouseLeave={() => setShowMessage(false)}
    >
      <Link href={`/product-category/${attributes.slug}/`}>
        <a
          className={` ${
            showMessage ? `bg-white text-blue-500` : `bg-blue-300 text-white`
          } 
          hover: flex h-8 cursor-pointer items-center rounded-t-lg px-4 transition ease-in-out`}
        >
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
          <div className="grid grid-cols-2 gap-4 rounded-b-lg bg-white p-6 shadow-md">
            {attributes.subcategories.data.map(({ attributes }) => (
              <Link
                key={attributes.slug}
                href={`/product-category/${attributes.slug}/`}
              >
                <a className="rounded-lg p-2 transition-all hover:bg-blue-100 ">
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
