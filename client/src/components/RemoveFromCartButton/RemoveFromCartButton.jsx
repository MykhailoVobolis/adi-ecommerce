import { Button } from '@radix-ui/themes';
import { MdOutlineClose } from 'react-icons/md';

import css from './RemoveFromCartButton.module.css';

export default function RemoveFromCartButton({ onRemoveFromCartClick }) {
  return (
    <Button className={css.removeBtn} size="3" onClick={onRemoveFromCartClick}>
      <MdOutlineClose size={24} />
    </Button>
  );
}
