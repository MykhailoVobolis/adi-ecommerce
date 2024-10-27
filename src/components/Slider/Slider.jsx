import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Keyboard } from "swiper/modules";
import { Box } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./swiperStyles.css";

export default function Slider({ product, curentColor }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const slides = product.images.variants[curentColor]?.images || [];

  useEffect(() => {
    if (thumbsSwiper) {
      thumbsSwiper.update();
    }
  }, [thumbsSwiper, curentColor]);

  return (
    <Box className="sliderContainer">
      <Swiper
        loop={true}
        navigation={true}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        modules={[FreeMode, Navigation, Thumbs, Keyboard]}
        keyboard={{ enabled: true }}
        className="mySwiper2">
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img className="mainImage" src={slide.src} alt={slide.alt} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={(swiper) => {
          if (swiper && !swiper.destroyed) {
            setThumbsSwiper(swiper);
            setTimeout(() => swiper.update(), 200);
          }
        }}
        spaceBetween={12}
        slidesPerView={9}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper">
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img className="secondaryImage" src={slide.src} alt={slide.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
