import { PRODUCTS } from '../apollo/queries'
import client from '../apollo/client'
import ProductList from '../components/ProductList'


const HomePage = ({ data }) => {
  return (
    <ProductList products={data.products} />
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: PRODUCTS
  })
  return { props: { data } }
}

export default HomePage