import { Flex } from '@radix-ui/themes';

import css from './OrderProductsPreview.module.css';

export default function OrderProductsPreview({ products }) {
  return (
    <Flex gap="2" className={css.previewContainer}>
      {products.map((product) => (
        <img
          key={`${product.productId}-${product.color}`}
          src={product.image?.src}
          alt={product.image?.alt || product.productName}
          className={css.productPreview}
        />
      ))}
    </Flex>
  );
}
