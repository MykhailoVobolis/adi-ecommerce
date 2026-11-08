import clsx from 'clsx';
import { Button } from '@radix-ui/themes';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import css from './SubmitButton.module.css';

export default function SubmitButton({ label = 'Continue checkout', variant, formId }) {
  return (
    <Button type="submit" form={formId} className={clsx(css.submitBtn, css[variant])}>
      {label}
      <HiOutlineArrowNarrowRight size={24} />
    </Button>
  );
}
