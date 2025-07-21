import clsx from 'clsx';
import { Button } from '@radix-ui/themes';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import css from './SubmitButton.module.css';

export default function SubmitButton({ label = 'Continue checkout', variant }) {
  return (
    <Button
      type="submit"
      // className={css.submitBtn}
      className={clsx(css.submitBtn, {
        [css.authBtn]: variant === 'auth',
      })}
    >
      {label}
      <HiOutlineArrowNarrowRight size={24} />
    </Button>
  );
}
