import { Link } from 'react-router-dom';
import { Box, Card, Flex, Text } from '@radix-ui/themes';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductFromLocalCart, updateLocalProductQuantity } from '../../redux/cart/slice.js';
import { useIsFavoriteProduct } from '../../hooks/useIsFavoriteProduct.js';
import { useToggleFavoriteProduct } from '../../hooks/useToggleFavoriteProduct.js';
import { changeProductQuantity, deleteProductFromCart } from '../../redux/cart/operations.js';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';

import ButtonBarOfProductCard from '../ButtonBarOfProductCard/ButtonBarOfProductCard.jsx';
import SelectQuantity from '../SelectQuantity/SelectQuantity.jsx';

import css from './CartProductCard.module.css';

export default function CartProductCard({ product }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { _id: productId, category, image, price, productName, size, color, colorName, quantity } = product;
  const imageUrl = image.src;

  const handleRemoveFromCart = () => {
    if (isLoggedIn) {
      dispatch(deleteProductFromCart(product));
    } else {
      dispatch(deleteProductFromLocalCart(product));
    }
  };

  const isFavoriteProduct = useIsFavoriteProduct(productId, color);

  const selectedProduct = {
    _id: product._id,
    productName: product.productName,
    category: product.category,
    color: product.color,
    colorName: product.colorName,
    image: product.image,
    price: product.price,
  };

  const handleToggleFavorite = useToggleFavoriteProduct(isLoggedIn, isFavoriteProduct, selectedProduct, color);

  const handleQuantityChange = (value) => {
    const newQuantity = Number(value);

    const updatedProduct = {
      _id: productId,
      color,
      size,
      quantity: newQuantity,
    };

    if (isLoggedIn) {
      dispatch(changeProductQuantity(updatedProduct));
    } else {
      dispatch(updateLocalProductQuantity(updatedProduct));
    }
  };

  return (
    <li>
      <Box className={css.productBox}>
        <Card size="2" className={css.productCard}>
          <Flex className={css.cardContent} direction="row">
            <Link className={css.imageLink} to={`/products/${category}/${productId}?color=${color}&size=${size}`}>
              <img src={imageUrl} alt={productName} className={css.productImage} />
            </Link>
            <Flex className={css.productDetails} direction="column" justify="between">
              <Box className={css.productInfo}>
                <Flex className={css.productHeading}>
                  <Link to={`/products/${category}/${productId}?color=${color}&size=${size}`}>
                    <Text as="p" size="3" className={css.productName}>
                      {productName}
                    </Text>
                  </Link>
                  <Text as="p" size="3" className={`${css.productPrice} ${css.desktopPrice}`}>
                    ${price.toFixed(2)}
                  </Text>
                </Flex>
                <Box className={css.productOptions}>
                  <Text as="p" size="3" className={css.productOption}>
                    {colorName}
                  </Text>
                  <Text as="p" size="3" className={`${css.productOption} ${css.sizeOption}`}>
                    size: {size}
                  </Text>
                </Box>
              </Box>
              <Flex className={css.productFooter} align="center">
                <Flex className={css.quantityGroup} align="center">
                  <Text as="span" size="2" className={css.quantityLabel}>
                    QTY:
                  </Text>
                  <SelectQuantity quantity={quantity} handleQuantityChange={handleQuantityChange} />
                </Flex>
                <Text as="p" size="3" className={`${css.productPrice} ${css.mobilePrice}`}>
                  ${price.toFixed(2)}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <ButtonBarOfProductCard
            handleRemoveFromCart={handleRemoveFromCart}
            handleToggleFavorite={handleToggleFavorite}
            isFavoriteProduct={isFavoriteProduct}
          />
        </Card>
      </Box>
    </li>
  );
}
