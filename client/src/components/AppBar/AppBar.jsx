import { useEffect } from 'react';
import { useMedia } from 'react-use';

import Navigation from '../Navigation/Navigation.jsx';
import MobileMenu from '../MobileMenu/MobileMenu.jsx';
import useModal from '../../hooks/useModal.js';

import css from './AppBar.module.css';

export default function AppBar() {
  const { modalType, openModal, closeModal } = useModal();
  const isDesktop = useMedia('(min-width: 1024px)');
  const isMobileMenuOpen = modalType === 'mobile-menu' && !isDesktop;

  useEffect(() => {
    if (isDesktop && modalType === 'mobile-menu') {
      closeModal();
    }
  }, [isDesktop, modalType, closeModal]);

  return (
    <header className={css.header}>
      <div className={css.navContainer}>
        <Navigation openModal={openModal} isDesktop={isDesktop} isMenuOpen={isMobileMenuOpen} />
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeModal} />
    </header>
  );
}
