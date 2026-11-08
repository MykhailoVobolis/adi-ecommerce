import { useEffect, useRef, useState } from 'react';
import { useMedia } from 'react-use';

import Navigation from '../Navigation/Navigation.jsx';
import MobileMenu from '../MobileMenu/MobileMenu.jsx';
import useModal from '../../hooks/useModal.js';

import css from './AppBar.module.css';

const SCROLL_THRESHOLD = 8;

export default function AppBar() {
  const { modalType, openModal, closeModal } = useModal();
  const isDesktop = useMedia('(min-width: 1024px)');
  const isMobileMenuOpen = modalType === 'mobile-menu' && !isDesktop;
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (isDesktop && modalType === 'mobile-menu') {
      closeModal();
    }
  }, [isDesktop, modalType, closeModal]);

  useEffect(() => {
    let animationFrameId = null;

    const updateHeaderVisibility = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const scrollDifference = currentScrollY - lastScrollY.current;

      if (currentScrollY === 0) {
        setIsHeaderVisible(true);
        lastScrollY.current = 0;
      } else if (Math.abs(scrollDifference) >= SCROLL_THRESHOLD) {
        setIsHeaderVisible(scrollDifference < 0);
        lastScrollY.current = currentScrollY;
      }

      animationFrameId = null;
    };

    const handleScroll = () => {
      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(updateHeaderVisibility);
      }
    };

    lastScrollY.current = Math.max(window.scrollY, 0);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <>
      <header className={`${css.header} ${isHeaderVisible ? '' : css.hidden}`}>
        <div className={css.navContainer}>
          <Navigation openModal={openModal} isDesktop={isDesktop} isMenuOpen={isMobileMenuOpen} />
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeModal} />
    </>
  );
}
