import { useDispatch } from 'react-redux';
import { addFavoriteLocal, removeFavoriteLocal } from '../redux/favorites/slice.js';
import { addFavorite, removeFavorite } from '../redux/favorites/operations.js';

export function useToggleFavoriteProduct(isLoggedIn, isFavorite, selectedProduct, selectedColor) {
  const dispatch = useDispatch();

  const handleToggleFavorite = () => {
    const productWithColor = { ...selectedProduct, selectedColor };

    if (isLoggedIn) {
      if (isFavorite) {
        dispatch(removeFavorite(productWithColor));
      } else {
        dispatch(addFavorite([productWithColor]));
      }
    } else {
      if (isFavorite) {
        dispatch(removeFavoriteLocal(productWithColor));
      } else {
        dispatch(addFavoriteLocal(productWithColor));
      }
    }
  };

  return handleToggleFavorite;
}
