import { Button } from '@radix-ui/themes';

import css from './EditButton.module.css';

export default function EditButton({ toggleModal }) {
  return (
    <Button className={css.editButton} as="button" onClick={toggleModal}>
      edit
    </Button>
  );
}
