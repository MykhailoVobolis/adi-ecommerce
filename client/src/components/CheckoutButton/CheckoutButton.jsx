import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import css from './CheckoutButton.module.css';

export default function CheckoutButton() {
  return (
    <Link className={css.checkoutBtn} to="/delivery">
      <span>CHECKOUT</span>
      <HiOutlineArrowNarrowRight size={24} />
    </Link>
  );
}
