import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Button } from '@radix-ui/themes';

import css from './CheckoutButton.module.css';

export default function CheckoutButton({ onCheckout }) {
  return (
    <Button className={css.checkoutBtn} size="3" onClick={onCheckout}>
      <span>CHECKOUT</span>
      <HiOutlineArrowNarrowRight size={24} />
    </Button>
  );
}
