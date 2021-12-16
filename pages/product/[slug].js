import { fromImageToUrl } from "../../utils/fromImageToUrl"
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from "../../hooks/useCart"
import { getProductBySlug } from "../../apollo/getQueries"

const Product = ({ data }) => {

  const id = data.id
  const product = data.product
  const { addProduct } = useCart()

  return (
    <div className="grid md:grid-cols-2">
      <div>
        <Image width={600} height={600} src={fromImageToUrl(product.image)} />
      </div>
      <div className="grid content-start gap-5 justify-items-start">
        <h1>{product.title}</h1>
        {data.productCategories.data.map((c) => (
          <Link key={c.id} href={`/product-category/${c.attributes.slug}`}><a><small>{c.attributes.title}</small></a></Link>
        ))}
        <div>{product.content}</div>
        <div className="font-bold text-4xl">{`$ ${product.price}`}</div>
        <button type="submit" onClick={() => addProduct({ ...product, id })} className="btn">Add to bag</button>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const data = await getProductBySlug(params.slug)
  return { props: { data } }
}

export default Product