import clsx from 'clsx';
import { Button } from '@radix-ui/themes';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import css from './CancelButton.module.css';

export default function CancelButton({ label = 'cancel', handleCancel, variant }) {
  return (
    <Button
      type="button"
      className={clsx(css.cancelBtn, {
        [css.editProfile]: variant === 'editProfile',
      })}
      onClick={handleCancel}
    >
      {label}
      <HiOutlineArrowNarrowRight size={24} />
    </Button>
  );
}
