import { Box, Flex, Inset, Text } from '@radix-ui/themes';
import { capitalize } from '../../utils/capitalize.js';

import css from './ProductAddedInfo.module.css';

export default function ProductAddedInfo({ product }) {
  const { image, price, productName, size, colorName, quantity } = product;
  const imageUrl = image.src;

  const capitalizedColor = capitalize(colorName);

  return (
    <Flex className={css.productInfoContainer} direction={{ initial: 'column', sm: 'row' }}>
      <Inset side="left" clip="padding-box" pr="current" width="150px" style={{ flexShrink: 0 }}>
        <img
          src={imageUrl}
          alt="Product"
          style={{
            display: 'block',
            width: 150,
            height: 150,
            objectFit: 'cover',
            backgroundColor: 'var(--gray-5)',
          }}
        />
      </Inset>
      <Box>
        <Text as="p" size="4" className={css.productName}>
          {productName}
        </Text>
        <Text as="p" size="3" mb="1" weight="bold">
          ${price.toFixed(2)}
        </Text>

        <Text as="p" size="3" className={css.productOption}>
          Color: {capitalizedColor}
        </Text>
        <Text as="p" size="3" className={css.productOption}>
          Size: {size}
        </Text>
        <Text as="p" size="3">
          Quantity: {quantity}
        </Text>
      </Box>
    </Flex>
  );
}
