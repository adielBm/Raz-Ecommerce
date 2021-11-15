import { useQuery } from "@apollo/client";
import client from "../../apollo/client";
import { PRODUCTS_CATEGORY_BY_SLUG } from "../../apollo/queries";
import ProductList from "../../components/ProductList"
import { getProductCategories, getProductCategory } from "../../utils/api"

const ProductCategory = ({ data }) => {
  const productCategory =  data.productCategories[0]
  return (
    <div>
      <div className="review-card">
        <h2> {productCategory.title} </h2>
      </div>
      <ProductList products={productCategory.products} />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: PRODUCTS_CATEGORY_BY_SLUG,
    variables: {slug: params.slug}
  })
  return { props: { data } }
}

export async function getStaticPaths() {
  const productCategories = await getProductCategories()
  const paths = productCategories.map((productCategory) => ({
    params: { slug: productCategory.slug },
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export default ProductCategory