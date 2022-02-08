import { getStrapiMedia, splitByCommaa } from '../../utils'
import Link from 'next/link'
import Image from 'next/image'
import { getProductBySlug } from '../../apollo/getQueries'
import { useContext, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Markdown } from '../../components/Markdown'
import { CartContext } from '../../contexts/cart/CartContext'
import Slider from '../../components/Slider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const Product = ({ data }) => {
  const id = data.id
  const product = data.product
  const brand = product?.brand?.data?.attributes

  const { addProduct } = useContext(CartContext)
  const [count, setCount] = useState(1)

  const handleAddToCart = () => {
    addProduct({
      product: { ...product, id },
      count: parseInt(count),
    })
    setCount(1)
  }

  return (
    <div className="grid grid-cols-1 gap-12 sm:items-start md:grid-cols-4">

      <div className="col-span-2">
        <Slider image={product.image} gallery={product.gallery} />
      </div>



      <div className="grid col-span-2 content-start justify-items-start gap-5">
        <div>
          {brand && (
            <Image
              title={brand.title}
              alt={brand.title}
              width={150}
              height={59}
              objectPosition="left"
              objectFit="contain"
              src={getStrapiMedia(brand.logo.data)}
            />
          )}
        </div>

        <h1>{product.title}</h1>
        <div className="text-4xl font-bold">{`$ ${product.price}`}</div>

        <div>
          <div>
            {product.summary.map(item => (
              <div className="space-x-4">
                <FontAwesomeIcon className="inline-block" icon={faCheckCircle} />
                <span>
                  {item.row}
                </span>
              </div>
            ))}
          </div>
          <table>
            {product.prop.map((item) => (
              <tr className="flex marign space-x-5">
                <th className="space-x-4">
                  <FontAwesomeIcon className="inline-block" icon={faCheckCircle} />
                  <span>
                    {item?.key}
                  </span>
                </th>
                <td>{splitByCommaa(item.value)}</td>
              </tr>
            ))}
          </table>
        </div>

        {data.productCategories.data.map((c) => (
          <Link key={c.id} href={`/product-category/${c.attributes.slug}`}>
            <a>
              <small>{c.attributes.title}</small>
            </a>
          </Link>
        ))}


        <div className="flex gap-4">
          <button type="submit" onClick={handleAddToCart} className="btn">
            Add to bag
          </button>
          <input
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="input-text w-20"
            type="number"
            placeholder="1"
            min="1"
            max="100"
          />
        </div>
      </div>


      <div className="col-span-3">
        <Tabs selectedTabClassName="bg-white" className="w-full">
          <TabList className="-mb-1 flex cursor-pointer  flex-wrap gap-1 overflow-hidden rounded-t-md border-x-4 border-t-4 border-blue-100 bg-blue-100 font-bold sm:inline-flex ">
            <Tab className="w-40 p-2 text-center">Description</Tab>
            <Tab className="w-40 p-2 text-center">Payment</Tab>
            <Tab className="w-40 p-2 text-center">Shipping</Tab>
          </TabList>
          <div className="rounded-b-md border-y-4 border-x-4 border-blue-100 bg-white p-6 ">
            <TabPanel>
              <Markdown>{product.content}</Markdown>
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



      <div className="col-span-1">
        Glossary
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const data = await getProductBySlug(params.slug)
  return { props: { data } }
}

export default Product
