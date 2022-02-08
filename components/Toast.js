import { useState } from 'react'
import { Transition } from '@headlessui/react'
import { faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Toast = ({ notice }) => {
  const [isShowing, setIsShowing] = useState(true)

  return (
    <Transition
      show={isShowing}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        id="alert-1"
        className="mb-4 flex rounded-lg bg-blue-100 p-4 dark:bg-blue-200"
        role="alert"
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        <div className="ml-3 font-medium text-blue-700 dark:text-blue-800">
          {notice.msg}
        </div>
        <button
          onClick={() => setIsShowing((isShowing) => !isShowing)}
          type="button"
          className="ml-auto"
          data-collapse-toggle="alert-1"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </Transition>
  )
}

export default Toast
