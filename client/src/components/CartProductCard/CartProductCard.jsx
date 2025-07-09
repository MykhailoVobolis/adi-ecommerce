import { Link } from 'react-router-dom';
import { Box, Card, Flex, Inset, Text } from '@radix-ui/themes';
import { useDispatch } from 'react-redux';
import { removeProductCart, updateProductQuantity } from '../../redux/cart/slice.js';
import { useIsFavoriteProduct } from '../../hooks/useIsFavoriteProduct.js';
import { useToggleFavoriteProduct } from '../../hooks/useToggleFavoriteProduct.js';

import ButtonBarOfProductCard from '../ButtonBarOfProductCard/ButtonBarOfProductCard.jsx';
import SelectQuantity from '../SelectQuantity/SelectQuantity.jsx';

import css from './CartProductCard.module.css';

export default function CartProductCard({ product }) {
  const dispatch = useDispatch();

  const { _id: productId, category, image, price, productName, size, color, colorName, quantity } = product;
  const imageUrl = image.src;

  const handleRemoveFromCart = () => {
    dispatch(removeProductCart(product));
  };

  const isFavoriteProduct = useIsFavoriteProduct(productId, color);

  const handleToggleFavorite = useToggleFavoriteProduct(isFavoriteProduct, product, color);

  const handleQuantityChange = (value) => {
    const newQuantity = Number(value);

    dispatch(
      updateProductQuantity({
        _id: productId,
        color: color,
        size: size,
        quantity: newQuantity,
      }),
    );
  };

  return (
    <li>
      <Box className={css.productBox}>
        <Card size="2">
          <Flex direction={{ initial: 'column', sm: 'row' }} gap="3">
            <Link to={`/products/${category}/${productId}`} state={{ color: color, size: size }}>
              <Inset side="left" clip="padding-box" pr="current">
                <img
                  src={imageUrl}
                  alt="Product"
                  style={{
                    display: 'block',
                    width: 240,
                    height: 240,
                    objectFit: 'cover',
                    backgroundColor: 'var(--gray-5)',
                  }}
                />
              </Inset>
            </Link>
            <Flex direction="column" justify="between">
              <Box>
                <Flex>
                  <Flex justify="between" width="400px">
                    <Link to={`/products/${category}/${productId}`} state={{ color: color, size: size }}>
                      <Text as="p" size="3" className={css.productName}>
                        {productName}
                      </Text>
                    </Link>
                    <Text as="p" size="3">
                      ${price.toFixed(2)}
                    </Text>
                  </Flex>
                  <ButtonBarOfProductCard
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleToggleFavorite={handleToggleFavorite}
                    isFavoriteProduct={isFavoriteProduct}
                  />
                </Flex>
                <Text as="p" size="3" mb="3" className={css.productOption}>
                  {colorName}
                </Text>
                <Text as="p" size="3" className={css.productOption}>
                  size: {size} uk
                </Text>
              </Box>
              <SelectQuantity quantity={quantity} handleQuantityChange={handleQuantityChange} />
            </Flex>
          </Flex>
        </Card>
      </Box>
    </li>
  );
}
