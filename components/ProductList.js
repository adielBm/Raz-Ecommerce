import { fromImageToUrl } from '../utils/fromImageToUrl'
import Link from 'next/link'
import Image from 'next/image'
import styles from './ProductList.module.scss'

const ProductList = (products) => {

  return (
    <div className="grid">
      {products.products.map((product) => (
        <div className={`${styles.product} block`} key={product.id}>
          <Link href={`/product/${product.slug}`}>
            <a className="flex">
              <img
                className={styles.image}
                src={fromImageToUrl(product.image)}
              />
              <div>
                <h3>{product.title}</h3>
                <span>{product.content.substring(0, 30)}...</span>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ProductList