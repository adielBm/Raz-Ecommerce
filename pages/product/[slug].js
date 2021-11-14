import { getProduct, getProducts } from "../../utils/api"
import { fromImageToUrl } from "../../utils/fromImageToUrl"

const Product = ({ product, params }) => {
  console.log('params', params)
  return (
    <div className="review-card">
      <img src={fromImageToUrl(product.image)} />
      <h3>{product.title}</h3>
      {product.product_categories.map(c => (<small key={c.id}>{c.title}</small>))}
      <p>{product.content}</p>
      <h1>{`${product.price} $`}</h1>
    </div>
  )
}

export async function getStaticProps({params}) {
  const product = await getProduct( params.slug )
  return { props: { product, params } }
}

export async function getStaticPaths() {
  const products = await getProducts()
  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export default Product