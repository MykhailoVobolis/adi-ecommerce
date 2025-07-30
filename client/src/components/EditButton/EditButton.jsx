import { Button } from '@radix-ui/themes';

import css from './EditButton.module.css';

export default function EditButton({ openModal, type }) {
  return (
    <Button className={css.editButton} as="button" onClick={() => openModal(type)}>
      edit
    </Button>
  );
}
