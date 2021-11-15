import { fromImageToUrl } from '../utils/fromImageToUrl'
import Link from 'next/link'

const ProductList = (products) => {
  const aaa = products.products
  return (
    <div>
      {aaa.map((product) => (
        <div key={product.id} className="review-card">
          <Link href={`/product/${product.slug}`}>
            <a>
              <img src={fromImageToUrl(product.image)} />
              <h2>{product.title}</h2>
              <p>{product.content.substring(0, 200)}...</p>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ProductList