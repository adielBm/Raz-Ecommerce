import Link from 'next/link'
import Image from 'next/image'
import { fromImageToUrl } from '../utils/fromImageToUrl'

const ProductList = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <Link key={product.attributes.slug} href={`/product/${product.attributes.slug}`} className="group">
          <a className="box">
            <div className="h-64 w-auto relative">
              <Image
                src={fromImageToUrl(product.attributes.image)}
                alt="Picture of the author"
                layout="fill" // required
                objectFit="cover" // change to suit your needs
              />
            </div>
            <div className="p-3">
              <h3 className="text-gray-700">{product.attributes.title}</h3>
              <p className="font-medium text-gray-900">{product.attributes.price}</p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default ProductList