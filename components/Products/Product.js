import Link from 'next/link'
import Image from 'next/image'
import { getStrapiMedia } from '../../utils'

const Product = ({ s: { attributes: product } }) => {
  return (
    <Link
      key={product.slug}
      href={`/product/${product.slug}`}
      className="group"
    >
      <a className="box flex h-36 justify-start pr-3 align-middle">
        <div className="relative h-auto w-36">
          <Image
            src={getStrapiMedia(product.image.data)}
            layout="fill"
            objectFit="cover"
            width={50}
            hidden={50}
          />
        </div>
        <div className="flex-1 p-3">
          <div className="text-2xl text-blue-500">{product.title}</div>
          <div className="text-blue-300">{product.price}</div>
        </div>

        <div className="my-auto mr-0">
          {product.brand?.data?.attributes?.logo?.data && (
            <Image
              src={getStrapiMedia(product.brand.data.attributes.logo.data)}
              width={50}
              height={50}
              objectFit="contain"
              objectPosition="right 50%"
            />
          )}
        </div>
      </a>
    </Link>
  )
}

export default Product
