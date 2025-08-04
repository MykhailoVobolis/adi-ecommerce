import clsx from 'clsx';
import { Button } from '@radix-ui/themes';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import css from './ActionButton.module.css';

export default function ActionButton({ label = 'Action Button', handleClick, variant }) {
  return (
    <Button type="button" className={clsx(css.actionBtn, css[variant])} onClick={handleClick}>
      {label}
      <HiOutlineArrowNarrowRight size={24} />
    </Button>
  );
}
