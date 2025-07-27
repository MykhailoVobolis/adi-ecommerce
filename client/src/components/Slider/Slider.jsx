import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Keyboard, Zoom } from 'swiper/modules';
import { Box } from '@radix-ui/themes';
import { useState } from 'react';
import { useMedia } from 'react-use';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './swiperStyles.css';

export default function Slider({ product, selectedColor }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const isTablet = useMedia('(min-width: 768px)');

  const slides = product.images.variants[selectedColor]?.images || [];

  const isProduction = process.env.NODE_ENV === 'production';
  const thumbsConfig = isProduction ? { swiper: thumbsSwiper } : thumbsSwiper ? { swiper: thumbsSwiper } : undefined;

  return (
    <Box className="sliderContainer">
      <Swiper
        loop={true}
        navigation={true}
        thumbs={thumbsConfig}
        modules={[FreeMode, Navigation, Thumbs, Keyboard, Zoom]}
        keyboard={{ enabled: true }}
        zoom={{ maxRatio: 4, minRatio: 1 }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} zoom>
            <img className="mainImage" src={slide.src} alt={slide.alt} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={isTablet ? 9 : 5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img className="secondaryImage" src={slide.src} alt={slide.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
