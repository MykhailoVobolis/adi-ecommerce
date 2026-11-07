import NavigationList from '../NavigationList/NavigationList.jsx';
import CustomLogoIcon from '../CustomLogoIcon.jsx';
import UserNavigation from '../UserNavigation/UserNavigation.jsx';

import { LiaBarsSolid } from 'react-icons/lia';
import { Button, Link } from '@radix-ui/themes';

import css from './Navigation.module.css';

export default function Navigation({ openModal, isDesktop, isMenuOpen }) {
  return (
    <div className={css.barContainer}>
      {!isDesktop && (
        <Button
          className={css.menuButton}
          as="button"
          type="button"
          aria-label="Open menu"
          aria-controls="mobile-navigation-menu"
          aria-expanded={isMenuOpen}
          onClick={() => openModal('mobile-menu')}
        >
          <LiaBarsSolid size={24} />
        </Button>
      )}
      <Link href="/" size={'1'}>
        <CustomLogoIcon />
      </Link>
      {isDesktop && (
        <nav className={css.navigation}>
          <NavigationList />
        </nav>
      )}
      <nav className={css.userNavigation}>
        <UserNavigation />
      </nav>
    </div>
  );
}
