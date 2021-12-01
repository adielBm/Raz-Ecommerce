import { fromImageToUrl } from "../../utils/fromImageToUrl"
import Link from 'next/link'
import { Grid } from "@mui/material"
import Image from 'next/image'
import { useCart } from "../../hooks/useCart"
import { getProductBySlug } from "../../apollo/getQueries"

const Product = ({ data }) => {
  const product = data.product
  const { addProduct } = useCart()
  return (
    <Grid container spacing={5}>
      <Grid item md={6}>
        <div>
          <Image width={600} height={600} src={fromImageToUrl(product.image)} />
        </div>
      </Grid>
      <Grid item md={6}>
        <h1>{product.title}</h1>
        {data.productCategories.data.map((c) => (
          <Link key={c.id} href={`/product-category/${c.attributes.slug}`}><a><small>{c.attributes.title}</small></a></Link>
        ))}
        <div>{product.content}</div>
        <h2>{`${product.price} $`}</h2>
        <button onClick={() => addProduct(product)}>Add To Cart</button>
      </Grid>
    </Grid>
  )
}

export async function getServerSideProps({ params }) {
  const data = await getProductBySlug(params.slug)
  return { props: { data } }
}

export default Product