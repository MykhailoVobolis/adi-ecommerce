import { Button } from '@radix-ui/themes';
import { LiaHeart, LiaHeartSolid } from 'react-icons/lia';
import clsx from 'clsx';

import css from './AddToFavoriteButton.module.css';

export default function AddToFavoriteButton({ onAddToFavoriteClick, isFavorite, isInProductCard = false }) {
  return (
    <Button
      className={clsx(css.toFavoriteBtn, {
        [css.inProductCard]: isInProductCard,
        [css.active]: isFavorite,
      })}
      size="3"
      onClick={onAddToFavoriteClick}
    >
      {isFavorite ? <LiaHeartSolid size={24} /> : <LiaHeart size={24} />}
    </Button>
  );
}
