import { fromImageToUrl } from '../utils/fromImageToUrl'
import Link from 'next/link'
import Image from 'next/image'
import styles from './ProductList.module.scss'

const ProductList = ({products}) => {
  return (
    <div className="grid">
      {products.map((product) => (
        <div className={`${styles.product} block`} key={product.id}>
          <Link href={`/product/${product.attributes.slug}`}>
            <a className="flex">
              <img
                className={styles.image}
                src={fromImageToUrl(product.attributes.image)}
              />
              <div>
                <h3>{product.attributes.title}</h3>
                <span>{product.attributes.content.substring(0, 30)}...</span>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ProductList