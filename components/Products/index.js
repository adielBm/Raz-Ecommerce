import Link from 'next/link'
import Image from 'next/image'
import { getStrapiMedia } from '../../utils'
import Product from './Product'

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
      {products.map((p) => (
        <Product s={p} />
      ))}
    </div>
  )
}

export default ProductList
