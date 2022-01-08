import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

export default function Search() {

  const [focus, setFocus] = useState(false)

  return (
    <div className={`w-1/4 rounded-lg relative hidden md:flex
    ${focus && 'border-transparent outline-none ring-2 ring-blue-300 '} `}>
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="input-text rounded-r-none"
        id="username" type="text" placeholder="Search products..."
      />
      <button className="w-16 rounded-r-lg overflow-hidden bg-blue-400 hover:bg-blue-500 focus:bg-blue-300 transition ease-in duration-200">
        <FontAwesomeIcon className="m-auto" icon={faSearch} />
      </button>
    </div>
  )
}
