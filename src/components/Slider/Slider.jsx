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

  const {
    images: {
      variants: {
        white: { color: whiteColor, images: whiteImages },
        blue: { color: blueColor, images: blueImages },
        green: { color: greenColor, images: greenImages },
      },
    },
  } = product;

  let slides;

  switch (curentColor) {
    case whiteColor:
      slides = whiteImages;
      break;
    case blueColor:
      slides = blueImages;
      break;
    case greenColor:
      slides = greenImages;
      break;
  }

  useEffect(() => {
    if (thumbsSwiper) {
      thumbsSwiper.update();
    }
  }, [thumbsSwiper]);

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
