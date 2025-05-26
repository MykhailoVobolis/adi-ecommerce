import { Button } from "@radix-ui/themes";
import { LiaHeart } from "react-icons/lia";
import { LiaHeartSolid } from "react-icons/lia";

import css from "./AddToFavoriteButton.module.css";

export default function AddToFavoriteButton({ onAddToFavoriteClick, isFavorite }) {
  return (
    <Button className={css.toFavoriteBtn} size="3" mt="4" onClick={onAddToFavoriteClick}>
      {isFavorite ? <LiaHeartSolid size={24} /> : <LiaHeart size={24} />}
    </Button>
  );
}
