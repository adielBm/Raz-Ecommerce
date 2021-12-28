import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'

export  default function Item() {

  const [showMessage, setShowMessage] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowMessage(true)}
      onMouseLeave={() => setShowMessage(false)}
    >
      <div className={` ${showMessage ? `bg-white text-blue-500` : `bg-blue-300 text-white`} 
          transition ease-in-out cursor-pointer hover: rounded-t-lg h-8 flex items-center px-4`}>
        Cloting 
      </div>
      <CSSTransition
        in={showMessage}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <div
          className="absolute left-0 z-10 w-1/2"
          variant="primary"
          dismissible
          onClose={() => setShowMessage(false)}
        >
          <div className="bg-white shadow-md p-6 grid gap-4 rounded-b-lg">
            <div>Cloting A</div>
            <div>Cloting B</div>
            <div>Cloting C</div>
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

