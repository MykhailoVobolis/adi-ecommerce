import { Flex } from '@radix-ui/themes';

import RemoveFromCartButton from '../RemoveFromCartButton/RemoveFromCartButton.jsx';
import AddToFavoriteButton from '../AddToFavoriteButton/AddToFavoriteButton.jsx';
import css from './ButtonBarOfProductCard.module.css';

export default function ButtonBarOfProductCard({ handleRemoveFromCart, handleToggleFavorite, isFavoriteProduct }) {
  return (
    <Flex className={css.buttonBar} position="absolute" direction="column">
      <RemoveFromCartButton onRemoveFromCartClick={handleRemoveFromCart} />
      <AddToFavoriteButton
        onAddToFavoriteClick={handleToggleFavorite}
        isFavorite={isFavoriteProduct}
        isInProductCard={true}
      />
    </Flex>
  );
}
