import { fromImageToUrl } from "../../utils/fromImageToUrl"
import Link from 'next/link'
import { PRODUCTS, PRODUCT_BY_SLUG } from "../../apollo/queries"
import client from "../../apollo/client"

const Product = ({ data }) => {
  const product = data.products[0]
  return (
    <div className="review-card">
      <img src={fromImageToUrl(product.image)} />
      <h3>{product.title}</h3>+
      {product.product_categories.map((c) => (
        <Link key={c.id} href={`/product-category/${c.slug}`}><a><small>{c.title}</small></a></Link>
      ))}
      <p>{product.content}</p>
      <h1>{`${product.price} $`}</h1>
    </div>
  )
} 

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: PRODUCT_BY_SLUG,
    variables: {slug: params.slug}
  })
  return { props: { data } }
}

export async function getStaticPaths() {

  const { data } = await client.query({
    query: PRODUCTS
  })
  
  const paths = data.products.map((product) => ({
    params: { slug: product.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export default Product