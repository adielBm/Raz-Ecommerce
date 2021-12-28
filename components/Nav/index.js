import React from 'react'
import Item from './Item'

export default function Nav() {

  return (
    <div className="bg-blue-400 px-8 h-auto">
      <div className="flex relative gap-4">
        <Item />
        <Item />
      </div>
    </div>
  )
}
