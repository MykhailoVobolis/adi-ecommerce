import { Button } from '@radix-ui/themes';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import css from './CancelButton.module.css';

export default function CancelButton({ label = 'cancel', handleCancel }) {
  return (
    <Button type="button" className={css.cancelBtn} onClick={handleCancel}>
      {label}
      <HiOutlineArrowNarrowRight size={24} />
    </Button>
  );
}
