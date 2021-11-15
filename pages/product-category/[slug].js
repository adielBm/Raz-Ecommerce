import ProductList from "../../components/ProductList"
import { getProductCategories, getProductCategory } from "../../utils/api"

const ProductCategory = ({ productCategory, params }) => {
  console.log('productCategory', productCategory)
  return (
    <div>
      <div className="review-card">
        <h2> {productCategory.title} </h2>
      </div>
      <ProductList products={productCategory.products} />
    </div>


  )
}

export async function getStaticProps({params}) {
  const productCategory = await getProductCategory( params.slug )
  return { props: { productCategory, params } }
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