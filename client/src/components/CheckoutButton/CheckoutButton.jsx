import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import css from './CheckoutButton.module.css';

export default function CheckoutButton({ onCheckout }) {
  return (
    <Link className={css.checkoutBtn} to="/delivery" onClick={onCheckout}>
      <span>CHECKOUT</span>
      <HiOutlineArrowNarrowRight size={24} />
    </Link>
  );
}
