import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Button } from "@radix-ui/themes";

import css from "./AddToCartButton.module.css";

export default function AddToCartButton({ onAddToCartClick }) {
  return (
    <Button className={css.buyBtn} size="3" mt="4" onClick={onAddToCartClick}>
      <span>ADD TO CART</span>
      <HiOutlineArrowNarrowRight size={24} />
    </Button>
  );
}
