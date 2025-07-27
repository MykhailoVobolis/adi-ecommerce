import { nanoid } from 'nanoid';
import { Box } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import css from './AccountCartSummaryProductsList.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import '../Slider/swiperStyles.css';

export default function AccountCartSummaryProductsList({ products }) {
  return (
    <Box className="accountSliderContainer">
      <Swiper slidesPerView={4} spaceBetween={10} navigation={true} modules={[Navigation]} className="mySwiper2">
        {products.map((p) => (
          <SwiperSlide key={nanoid()} className={css.productItem}>
            <Link to={`/products/${p.category}/${p._id}`} state={{ color: p.color, size: p.size }}>
              <img src={p.image.src} alt={p.image.alt} className={css.productImage} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
