import React, { useEffect, useState } from 'react'
import { getProductCategories } from '../../apollo/getQueries'
import Item from './Item'

const Nav = ({items}) => {

  const [ menuItems, setMenuItems ] = useState(items)

  return (
    <div className="bg-blue-400 px-8 pt-1 h-auto">
      <div className="flex relative gap-2">
         {menuItems.map((data, i) => <Item key={i} data={data} />)}
      </div>
    </div>
  )
}

export default Nav