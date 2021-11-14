import { getProduct, getProducts } from '../utils/api'
import { fromImageToUrl } from '../utils/fromImageToUrl'
import Link from 'next/link'


const HomePage = ({ products }) => {

  const product = getProduct('shirt')
  // console.log('💡product', product)

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="review-card">
          <Link href={`/product/${product.slug}`}>
            <a>
              <img src={fromImageToUrl(product.image)} />
              <h2>{product.title}</h2>
              {product.product_categories.map(c => (<small key={c.id}>{c.title}</small>))}
              <p>{product.content.substring(0, 200)}...</p>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProducts()
  return { props: { products } }
}

export default HomePage