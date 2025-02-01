import React from 'react'
import silder from "../../assets/silder/silder.webp"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Pagination } from 'swiper/modules';
function Silder() {
  return (
    <Swiper
    pagination={true}
    modules={[Pagination]}
    className="mySwiper"
  >
    <SwiperSlide className="rounded-2xl">
      <div className="silder-img w-full h-[100%]">
        <img src={silder} alt="" className="w-full h-full  object-cover" />
      </div>
    </SwiperSlide>
    
    <SwiperSlide className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
      <div className="silder-img w-full h-full">
        <img src={silder} alt="" className="w-full h-full object-cover" />
      </div>
    </SwiperSlide>
  </Swiper>
  )
}

export default Silder