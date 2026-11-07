import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import CustomLogoIcon from '../CustomLogoIcon.jsx';
import NavigationList from '../NavigationList/NavigationList.jsx';
import css from './MobileMenu.module.css';

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <div
      id="mobile-navigation-menu"
      className={`${css.mobileMenu} ${isOpen ? css.open : ''}`}
      aria-hidden={!isOpen}
    >
      <div className={css.menuHeader}>
        <Link to="/" className={css.logo} aria-label="Home" onClick={onClose}>
          <CustomLogoIcon />
        </Link>
        <Button className={css.closeButton} as="button" type="button" aria-label="Close menu" onClick={onClose}>
          <AiOutlineClose size={24} />
        </Button>
      </div>
      <nav className={css.nav} aria-label="Mobile navigation">
        <NavigationList onNavigate={onClose} showChevron />
      </nav>
    </div>
  );
}
