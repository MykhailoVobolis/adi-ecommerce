import { Box, Card, Inset, Strong, Text } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { useIsFavoriteProduct } from '../../hooks/useIsFavoriteProduct.js';
import { useToggleFavoriteProduct } from '../../hooks/useToggleFavoriteProduct.js';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';

import AddToFavoriteButton from '../AddToFavoriteButton/AddToFavoriteButton.jsx';

import css from './ProductCard.module.css';

export default function ProductCard({ product, category }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { _id: productId, price, productName, images, countColors, variantKey } = product;

  const imageUrl = images[0].src;
  const selectedColor = variantKey;

  const isFavoriteProduct = useIsFavoriteProduct(productId, selectedColor);

  const selectedProduct = {
    _id: product._id,
    productName: product.productName,
    category: product.category,
    color: selectedColor,
    colorName: product.color,
    image: product.images?.[0],
    price: product.price,
  };

  const handleToggleFavorite = useToggleFavoriteProduct(isLoggedIn, isFavoriteProduct, selectedProduct, selectedColor);

  return (
    <li className={css.productBox}>
      <Card size="2">
        <Link to={`/products/${category}/${productId}?color=${selectedColor}`}>
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
        </Link>
      </Card>
      <Box className={css.toFavoritBtnWrapper}>
        <AddToFavoriteButton
          onAddToFavoriteClick={handleToggleFavorite}
          isFavorite={isFavoriteProduct}
          isInProductCard={true}
        />
      </Box>
    </li>
  );
}
