import { useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favorites/slice.js';

export function useToggleFavoriteProduct(isFavorite, curentProduct, selectedColor) {
  const dispatch = useDispatch();

  const handleToggleFavorite = () => {
    const productWithColor = { ...curentProduct, selectedColor };

    if (isFavorite) {
      dispatch(removeFavorite(productWithColor));
    } else {
      dispatch(addFavorite(productWithColor));
    }
  };

  return handleToggleFavorite;
}
