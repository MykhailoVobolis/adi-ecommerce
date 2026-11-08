import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '@radix-ui/themes';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CustomLogoIcon from '../CustomLogoIcon.jsx';
import NavigationList from '../NavigationList/NavigationList.jsx';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import css from './MobileMenu.module.css';

export default function MobileMenu({ isOpen, onClose }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

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
      {isLoggedIn && (
        <>
          <div className={css.accountDivider} aria-hidden="true" />
          <section className={css.accountSection} aria-labelledby="mobile-account-heading">
            <h2 id="mobile-account-heading" className={css.accountTitle}>
              Account overview
            </h2>
            <nav className={css.accountNav} aria-label="Account navigation">
              <NavLink to="/account" end onClick={onClose}>
                Account
              </NavLink>
              <NavLink to="/account/profile" onClick={onClose}>
                Personal Information
              </NavLink>
              <NavLink to="/account/history" onClick={onClose}>
                Orders History
              </NavLink>
              <NavLink to="/account/favorites" onClick={onClose}>
                Favorites
              </NavLink>
            </nav>
          </section>
        </>
      )}
    </div>
  );
}
