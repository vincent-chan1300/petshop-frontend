import React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './BannerSwiper.css';



function BannerSwiper({data_arr}) {
  return (
    <Swiper
    modules={[Navigation, Pagination]}
      slidesPerView={1}
      navigation
      loop={true}
      autoplay={true}
      
      pagination={{ clickable: true }}
    >
        {data_arr.map((slide, index) => {
            return (
                <SwiperSlide key={index} className=''>
                    <a href={slide.path} className='' >
                        <img className='w-full' src={slide.imgSrc} alt="banner" />
                    </a>
                    
                </SwiperSlide>
            )
        })}
      
    </Swiper>
  )
}

export default BannerSwiper