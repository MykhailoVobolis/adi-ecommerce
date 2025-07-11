import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import css from './SubmitDeliveryButton.module.css';

export default function SubmitDeliveryButton({ label = 'Continue checkout' }) {
  return (
    <button type="submit" className={css.submitBtn}>
      {label}
      <HiOutlineArrowNarrowRight size={24} />
    </button>
  );
}
