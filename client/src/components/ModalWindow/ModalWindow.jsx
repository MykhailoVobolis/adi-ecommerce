import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '@radix-ui/themes';
import { Theme } from '@radix-ui/themes';
import clsx from 'clsx';

import css from './ModalWindow.module.css';

export default function ModalWindow({ children, label, isOpen, toggleModal }) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel={label}
        overlayClassName={clsx(css.modalContainer, {
          [css.openedModalContainer]: isOpen,
          [css.closedModalContainer]: !isOpen,
        })}
        className={clsx(css.modalContent, {
          [css.openedModalContent]: isOpen,
          [css.closedModalContent]: !isOpen,
        })}
      >
        <Button className={css.closeButton} as="button" onClick={toggleModal}>
          <AiOutlineClose size={24} />
        </Button>
        <Theme accentColor="gray" radius="none">
          {children}
        </Theme>
      </Modal>
    </div>
  );
}
