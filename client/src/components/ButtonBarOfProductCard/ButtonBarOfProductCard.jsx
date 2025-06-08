import { Flex } from '@radix-ui/themes';

import RemoveFromCartButton from '../RemoveFromCartButton/RemoveFromCartButton.jsx';
import AddToFavoriteButton from '../AddToFavoriteButton/AddToFavoriteButton.jsx';

export default function ButtonBarOfProductCard({ handleRemoveFromCart, handleToggleFavorite, isFavoriteProduct }) {
  return (
    <Flex position="absolute" top="1" right="1" direction="column">
      <RemoveFromCartButton onRemoveFromCartClick={handleRemoveFromCart} />
      <AddToFavoriteButton
        onAddToFavoriteClick={handleToggleFavorite}
        isFavorite={isFavoriteProduct}
        isInProductCard={true}
      />
    </Flex>
  );
}
