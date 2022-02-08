import React, { useState } from 'react'
import Image from 'next/image'
import { getStrapiMedia } from '../utils'

// Swiper
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

SwiperCore.use([FreeMode, Navigation, Thumbs])

export default function Slider({ image, gallery }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const getSlieds = (height) => {
    return (
      <>
        {getSlide(image.data, height, true)}
        {gallery.data.map((image) => getSlide(image, height))}
      </>
    )
  }
  const getSlide = (img, height, priority = false) => {
    return (
      <SwiperSlide key={img.id}>
        <div className={`${height} relative w-full`}>
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

  return (
    <div className="mb-8 cursor-pointer overflow-hidden rounded-lg border-2 border-blue-300 shadow-lg">
      <Swiper
        className="w-full"
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        /* spaceBetween={10} */
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {getSlieds('h-96')}
      </Swiper>
      {gallery.data.length > 0 && (
        <Swiper
          className="w-full "
          style={{ 'swiper-slide-thumb-active': 'border 3px solid' }}
          onSwiper={setThumbsSwiper}
          /* spaceBetween={10} */
          slidesPerView={gallery.data.length + 1}
          freeMode={true}
          watchSlidesProgress={true}
        >
          {getSlieds('h-24')}
        </Swiper>
      )}
    </div>
  )
}
