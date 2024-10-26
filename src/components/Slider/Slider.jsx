import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Keyboard } from "swiper/modules";
import { Box } from "@radix-ui/themes";
import { useState } from "react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./swiperStyles.css";

export default function Slider() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const slides = [
    { src: "/src/assets/img/adidas1.avif", alt: "Product Image 1" },
    { src: "/src/assets/img/adidas2.avif", alt: "Product Image 2" },
    { src: "/src/assets/img/adidas3.avif", alt: "Product Image 3" },
    { src: "/src/assets/img/adidas4.avif", alt: "Product Image 4" },
    { src: "/src/assets/img/adidas5.avif", alt: "Product Image 5" },
    { src: "/src/assets/img/adidas6.avif", alt: "Product Image 6" },
    { src: "/src/assets/img/adidas7.avif", alt: "Product Image 7" },
    { src: "/src/assets/img/adidas8.avif", alt: "Product Image 8" },
    { src: "/src/assets/img/adidas9.avif", alt: "Product Image 9" },
    { src: "/src/assets/img/adidas10.avif", alt: "Product Image 10" },
  ];

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
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={10}
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
