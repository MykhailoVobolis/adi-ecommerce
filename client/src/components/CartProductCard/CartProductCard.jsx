import { Link } from 'react-router-dom';
import { Box, Card, Flex, Inset, Text } from '@radix-ui/themes';
import { useDispatch } from 'react-redux';
import { removeProductCart } from '../../redux/cart/slice.js';
import { useIsFavoriteProduct } from '../../hooks/useIsFavoriteProduct.js';
import { useToggleFavoriteProduct } from '../../hooks/useToggleFavoriteProduct.js';

import ButtonBarOfProductCard from '../ButtonBarOfProductCard/ButtonBarOfProductCard.jsx';

import css from './CartProductCard.module.css';

export default function CartProductCard({ product }) {
  const dispatch = useDispatch();

  //   const favoriteProducts = useSelector(selectFavoriteProducts);

  const { _id: productId, category, image, price, productName, size, color } = product;
  const imageUrl = image.src;

  const handleRemoveFromCart = () => {
    dispatch(removeProductCart(product));
  };

  const isFavoriteProduct = useIsFavoriteProduct(productId, color);

  const handleToggleFavorite = useToggleFavoriteProduct(isFavoriteProduct, product, color);

  return (
    <li>
      <Box className={css.productBox}>
        <Card>
          <Flex direction={{ initial: 'column', sm: 'row' }} gap="4">
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
            <Box>
              <Flex>
                <Flex justify="between" mb="3" width="400px">
                  <Link to={`/products/${category}/${productId}`} state={{ color: color, size: size }}>
                    <Text as="p" size="3" className={css.productName}>
                      {productName}
                    </Text>
                  </Link>
                  <Text as="p" size="3">
                    ${price}
                  </Text>
                </Flex>
                <ButtonBarOfProductCard
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleToggleFavorite={handleToggleFavorite}
                  isFavoriteProduct={isFavoriteProduct}
                />
              </Flex>
              <Text as="p" size="3" className={css.sizeProduct}>
                size: {size} uk
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>
    </li>
  );
}
