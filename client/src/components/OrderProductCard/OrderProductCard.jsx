import { Box, Card, Flex, Inset, Text } from '@radix-ui/themes';
import { capitalize } from '../../utils/capitalize.js';

import css from './OrderProductCard.module.css';

export default function OrderProductCard({ product }) {
  const { image, price, productName, size, colorName, quantity } = product;
  const imageUrl = image.src;

  const capitalizedColor = capitalize(colorName);

  return (
    <li>
      <Box>
        <Card size="1">
          <Flex direction={{ initial: 'column', sm: 'row' }} gap="1">
            <Inset side="left" clip="padding-box" pr="current">
              <img
                src={imageUrl}
                alt="Product"
                style={{
                  display: 'block',
                  width: 128,
                  height: 128,
                  objectFit: 'cover',
                  backgroundColor: 'var(--gray-5)',
                }}
              />
            </Inset>
            <Flex direction="column" justify="between">
              <Box>
                <Text as="p" size="3" className={css.productName}>
                  {productName}
                </Text>
                <Text as="p" size="3" mb="2">
                  ${price.toFixed(2)}
                </Text>
                <Text as="p" size="3" className={css.productOption}>
                  Size: {size} UK / Quantity: {quantity}
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
