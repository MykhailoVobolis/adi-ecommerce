import { Box, Card, Flex, Text } from '@radix-ui/themes';
import { capitalize } from '../../utils/capitalize.js';

import css from './OrderProductCard.module.css';

export default function OrderProductCard({ product }) {
  const { image, price, productName, size, colorName, quantity } = product;
  const imageUrl = image.src;

  const capitalizedColor = capitalize(colorName);

  return (
    <li>
      <Box>
        <Card size="1" className={css.productCard}>
          <Flex className={css.productLayout} direction="row" gap="3">
            <img src={imageUrl} alt={productName} className={css.productImage} />
            <Flex className={css.productDetails} direction="column" justify="between">
              <Box>
                <Text as="p" size="3" className={css.productName}>
                  {productName}
                </Text>
                <Text as="p" size="3" mb="2">
                  ${price.toFixed(2)}
                </Text>
                <Text as="p" size="3" className={css.productOption}>
                  Size: {size} / Quantity: {quantity}
                </Text>
                <Text as="p" size="3" className={css.productOption}>
                  Color: {capitalizedColor}
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Card>
      </Box>
    </li>
  );
}
