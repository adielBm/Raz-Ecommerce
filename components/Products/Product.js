import Link from 'next/link'
import Image from 'next/image'
import { getStrapiMedia } from '../../utils'

const Product = ({ s: { attributes: product } }) => {

  return (
    <Link key={product.slug} href={`/product/${product.slug}`} className="group">
      <a className="box flex align-middle justify-start h-36 pr-3">
        <div className="w-36 h-auto relative">
          <Image
            src={getStrapiMedia(product.image.data)}
            layout="fill"
            objectFit="cover"
            width={50}
            hidden={50}
          />
        </div>
        <div className="p-3 flex-1">
          <h3 className="text-gray-700">{product.title}</h3>
          <p className="font-medium text-gray-900">{product.price}</p>
        </div>

        <div className="mr-0 my-auto">
          {product.brand?.data?.attributes?.logo?.data &&
            <Image
              
              src={getStrapiMedia(product.brand.data.attributes.logo.data)}
              width={50}
              height={50}
              objectFit="contain"
              objectPosition="right 50%"
            />
          }
        </div>
      </a>
    </Link>
  )
}

export default Product