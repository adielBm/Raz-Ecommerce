import { PRODUCTS } from '../apollo/queries'
import client from '../apollo/client'
import ProductList from '../components/ProductList'

const HomePage = ({ data }) => {
  return (
    <ProductList products={data.products.data} />
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: PRODUCTS
  })
  return { props: { data } }
}

export default HomePage