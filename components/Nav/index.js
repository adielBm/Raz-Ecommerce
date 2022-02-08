import React, { useEffect, useState } from 'react'
import { getProductCategories } from '../../apollo/getQueries'
import Item from './Item'

const Nav = ({ items }) => {
  const [menuItems, setMenuItems] = useState(items)

  return (
    <div className="h-auto bg-blue-400 px-8 pt-1">
      <div className="relative flex gap-2">
        {menuItems.map((data, i) => (
          <Item key={i} data={data} />
        ))}
      </div>
    </div>
  )
}

export default Nav
