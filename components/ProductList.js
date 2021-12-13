import { fromImageToUrl } from '../utils/fromImageToUrl'
import Link from 'next/link'
import Image from 'next/image'
import styles from './ProductList.module.scss'

const ProductList = ({products}) => {
  return (
    <div className="grid">
      {products.map((product) => (
        <div className={`${styles.product} block`} key={product.attributes.slug}>
          <Link href={`/product/${product.attributes.slug}`}>
            <a className="flex g0">
              <img
                className={styles.image}
                src={fromImageToUrl(product.attributes.image)}
              />
              <div className="flex-1 flex g1">
                <h3>{product.attributes.title}</h3>
                <span>{product.attributes.content.substring(0, 30)}...</span>
                <h2>{product.attributes.price}$</h2>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ProductList