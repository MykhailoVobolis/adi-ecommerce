import { Box, Card, Inset, Strong, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

import css from './ProductCard.module.css';

export default function ProductCard({ product, category }) {
  const { _id, productName, price, images } = product;

  const countColors = Object.keys(images.variants).length;
  const imageUrl = images.variants.main.images[0].src;

  return (
    <li>
      <Link to={`/products/${category}/${_id}`}>
        <Box className={css.productBox}>
          <Card size="2">
            <Inset clip="padding-box" side="top" pb="current">
              <img
                src={imageUrl}
                alt="Product Image"
                style={{
                  display: 'block',
                  objectFit: 'cover',
                  width: '100%',
                  height: 'auto',
                  backgroundColor: 'var(--gray-5)',
                }}
              />
            </Inset>
            <Text as="p" size="3">
              <Strong>${price}</Strong>
            </Text>
            <Text as="p" size="3" className={css.productName}>
              {productName}
            </Text>
            <Text as="p" size="2" className={css.productOptions}>
              {countColors} colors
            </Text>
          </Card>
        </Box>
      </Link>
    </li>
  );
}
