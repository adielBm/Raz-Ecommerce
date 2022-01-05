import { PRODUCTS } from '../apollo/queries'
import client from '../apollo/client'
import ProductList from '../components/Products'
import Separator from '../components/Separator'

const HomePage = ({ data }) => {
  return (
    <div>
      <Separator> All Products </Separator>
      <ProductList products={data.products.data.slice(0, 4)} />
      <Separator> Hoddides </Separator>
      <ProductList products={data.products.data.slice(0, 3)} />
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: PRODUCTS
  })
  return { props: { data } }
}

export default HomePage