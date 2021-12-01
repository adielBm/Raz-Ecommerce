import { getProductsCategoryBySlug } from "../../apollo/getQueries";
import ProductList from "../../components/ProductList"

const ProductCategory = ({data}) => {
  return (
    <div>
      <div>
        <h2>{data.productCategory.title}</h2>
      </div>
      <ProductList products={data.products.data} />
    </div> 
  )
}

export async function getServerSideProps({ params }) {
  const data = await getProductsCategoryBySlug(params.slug)
  return { props: { data } }
}

export default ProductCategory