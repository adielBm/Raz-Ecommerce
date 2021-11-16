import { fromImageToUrl } from "../../utils/fromImageToUrl"
import Link from 'next/link'
import { PRODUCT_BY_SLUG } from "../../apollo/queries"
import client from "../../apollo/client"
import { Button, Grid } from "@mui/material"
import Image from 'next/image'

const Product = ({ data }) => {
  const product = data.products[0]
  return (
    <div className="review-card">
      <Grid container spacing={5}>
        <Grid item md={6}>
          <div>
            <Image width={600} height={600} src={fromImageToUrl(product.image)} />
          </div>
        </Grid>
        <Grid item md={6}>
          <h1>{product.title}</h1>
          {product.product_categories.map((c) => (
            <Link key={c.id} href={`/product-category/${c.slug}`}><a><small>{c.title}</small></a></Link>
          ))}
          <p>{product.content}</p>
          <h2>{`${product.price} $`}</h2>
          <Button variant="contained" color="primary">Add To Cart</Button>
        </Grid>
      </Grid>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: PRODUCT_BY_SLUG,
    variables: { slug: params.slug }
  })
  return { props: { data } }
}

export default Product