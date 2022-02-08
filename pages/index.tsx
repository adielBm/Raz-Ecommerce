import { PRODUCTS } from '../apollo/queries'
import client from '../apollo/client'
import ProductList from '../components/Products'
import Separator from '../components/Separator'
import type { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'

type Props = {
  data: any
}

const HomePage: NextPage = ({ data }: Props) => {
  return (
    <div>
      <Separator> Products </Separator>
      <ProductList products={data.products.data.slice(0, 4)} />
      <Separator> Hoddides </Separator>
      <ProductList products={data.products.data.slice(0, 3)} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data }: any = await client.query({
    query: PRODUCTS,
  })
  return { props: { data } }
}

export default HomePage
