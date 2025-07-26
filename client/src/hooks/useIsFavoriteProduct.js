import { useSelector } from 'react-redux';
import { selectFavoriteProducts } from '../redux/favorites/selectors.js';

export function useIsFavoriteProduct(_id, selectedColor) {
  const favoriteProducts = useSelector(selectFavoriteProducts);

  const isFavorite = favoriteProducts.some((favItem) => favItem._id === _id && favItem.color === selectedColor);

  return isFavorite;
}
