import React from 'react';
import silder from "../../assets/silder/silder.webp";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import required modules
import { Pagination, Autoplay } from 'swiper/modules';

function Silder() {
  return (
    <Swiper
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }} // ✅ Avtomatik keçid (4 saniyə)
      loop={true} // ✅ Sonsuz dövr (loop)
      modules={[Pagination, Autoplay]}
      className="mySwiper rounded-lg w-full max-w-screen-xl mx-auto"
    >
      {/* ✅ 1-ci Banner Slayd */}
      <SwiperSlide className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] rounded-lg overflow-hidden">
        <img src={silder} alt="Banner 1" className="w-full h-full object-cover rounded-lg" />
      </SwiperSlide>

      {/* ✅ 2-ci Banner Slayd */}
      <SwiperSlide className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] rounded-lg overflow-hidden">
        <img src={silder} alt="Banner 2" className="w-full h-full object-cover rounded-lg" />
      </SwiperSlide>
    </Swiper>
  );
}

export default Silder;
