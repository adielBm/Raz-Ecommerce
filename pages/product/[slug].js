import { fromImageToUrl } from "../../utils/fromImageToUrl"
import Link from 'next/link'
import { PRODUCT_BY_SLUG } from "../../apollo/queries"
import client from "../../apollo/client"

const Product = ({ data }) => {
  const product = data.products[0]
  return (
    <div className="review-card">
      <img src={fromImageToUrl(product.image)} />
      <h1>{product.title}</h1>
      {product.product_categories.map((c) => (
        <Link key={c.id} href={`/product-category/${c.slug}`}><a><small>{c.title}</small></a></Link>
      ))}
      <p>{product.content}</p>
      <h1>{`${product.price} $`}</h1>
    </div>
  )
} 

export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: PRODUCT_BY_SLUG,
    variables: {slug: params.slug}
  })
  return { props: { data } }
}

export default Product