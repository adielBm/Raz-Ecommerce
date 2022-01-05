import { getStrapiMedia } from "../../utils"
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from "../../hooks/useCart"
import { getProductBySlug } from "../../apollo/getQueries"
import { useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';
SwiperCore.use([FreeMode, Navigation, Thumbs]);

const Product = ({ data }) => {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const id = data.id
  const product = data.product
  const { addProduct } = useCart()
  const [count, setCount] = useState(1)

  const handleAddToCart = () => {
    addProduct({ ...product, id, countToAdd: parseInt(count) })
    setCount(1)
  }

  const brand = product?.brand?.data?.attributes

  const getSlide = (img, height, priority = false) => {
    return (
      <SwiperSlide key={img.id} >
        <div className={`${height} w-full relative`}>
          <Image
            /* width={600}
            height={600} */
            layout="fill"
            objectFit="cover"
            src={getStrapiMedia(img)}
            priority={priority}
          />
        </div>
      </SwiperSlide>
    )
  }

  const getSlieds = (height) => {
    return (
      <>
        {getSlide(product.image.data, height, true)}
        {product.gallery.data.map(image => getSlide(image, height))}
      </>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div className="w-full rounded-lg overflow-hidden shadow-lg border-blue-300 border-2 cursor-pointer" >
        <Swiper
          className="w-full"
          style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }}
          /* spaceBetween={10} */
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
        >
          {getSlieds('h-96')}
        </Swiper>
        {product.gallery.data.length > 0 &&
          <Swiper
            className="w-full "
            style={{ 'swiper-slide-thumb-active': 'border 3px solid' }}
            onSwiper={setThumbsSwiper}
            /* spaceBetween={10} */
            slidesPerView={product.gallery.data.length + 1}
            freeMode={true}
            watchSlidesProgress={true}
          >
            {getSlieds('h-24')}
          </Swiper>
        }
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
        <div>{product.content}</div>
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