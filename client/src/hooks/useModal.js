import { useState } from 'react';

export default function useModal() {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => setModalType(null);

  return {
    modalType,
    isOpen: modalType !== null,
    openModal,
    closeModal,
  };
}
