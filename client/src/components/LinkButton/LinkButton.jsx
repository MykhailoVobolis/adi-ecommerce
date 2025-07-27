import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import css from './LinkButton.module.css';

export default function LinkButton({ to, text, variant = 'primary' }) {
  return (
    <Link to={to} className={clsx(css.linkButton, css[variant])}>
      <span className={css.text}>{text}</span>
      <HiOutlineArrowNarrowRight size={24} />
    </Link>
  );
}
