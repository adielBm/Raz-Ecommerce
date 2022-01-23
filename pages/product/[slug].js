import { getStrapiMedia } from "../../utils"
import Link from 'next/link'
import Image from 'next/image'
import { getProductBySlug } from "../../apollo/getQueries"
import { useContext, useState } from "react"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Markdown } from "../../components/Markdown"
import { CartContext } from "../../contexts/cart/CartContext"
import Slider from "../../components/Slider"


const Product = ({ data }) => {

  const id = data.id
  const product = data.product
  const brand = product?.brand?.data?.attributes

  const { addProduct } = useContext(CartContext)
  const [count, setCount] = useState(1)

  const handleAddToCart = () => {
    addProduct({
      product: { ...product, id },
      count: parseInt(count)
    })
    setCount(1)
  }


  return (
    <div className="sm:items-start grid-cols-1 grid md:grid-cols-2 gap-12">

      <div>
        <Slider image={product.image} gallery={product.gallery} />

        <div>

          <Tabs selectedTabClassName="bg-white" className="w-full">
            <TabList className="flex sm:inline-flex -mb-1  cursor-pointer font-bold overflow-hidden rounded-t-md border-t-4 border-x-4 border-blue-100 gap-1 flex-wrap bg-blue-100 ">
              <Tab className="p-2 w-40 text-center">Description</Tab>
              <Tab className="p-2 w-40 text-center">Payment</Tab>
              <Tab className="p-2 w-40 text-center">Shipping</Tab>
            </TabList>
            <div className="bg-white p-6 rounded-b-md border-y-4 border-x-4 border-blue-100 ">
              <TabPanel>
                <Markdown>
                  {product.content}
                </Markdown>
              </TabPanel>
              <TabPanel>
                <h2>Payment methods 💰 </h2>
              </TabPanel>
              <TabPanel>
                <h2>Any content 🛳</h2>
              </TabPanel>
            </div>
          </Tabs>
        </div>

      </div>

      <div className="grid content-start gap-5 justify-items-start">

        <div>
          {brand && <Image
            title={brand.title} alt={brand.title}
            width={150} height={59} objectPosition="left" objectFit="contain"
            src={getStrapiMedia(brand.logo.data)}
          />
          }
        </div>

        <h1>{product.title}</h1>

        {data.productCategories.data.map((c) => (
          <Link key={c.id} href={`/product-category/${c.attributes.slug}`}><a><small>{c.attributes.title}</small></a></Link>
        ))}

        <div className="font-bold text-4xl">{`$ ${product.price}`}</div>

        <div className="flex gap-4">
          <button type="submit" onClick={handleAddToCart} className="btn">Add to bag</button>
          <input value={count} onChange={e => setCount(e.target.value)} className="input-text w-20" type="number" placeholder="1" min="1" max="100" />
        </div>

      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const data = await getProductBySlug(params.slug)
  return { props: { data } }
}

export default Product