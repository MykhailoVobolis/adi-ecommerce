// src/components/AccountSidebar/AccountSidebar.jsx
import { NavLink } from 'react-router-dom';
import { Flex, Heading } from '@radix-ui/themes';

import css from './AccountSidebar.module.css';

export default function AccountSidebar() {
  return (
    <Flex direction="column">
      <Heading className={css.title} as="h2" size="5" mb="5" weight="bold">
        account overview
      </Heading>
      <nav className={css.sidebar}>
        <NavLink to="/account" end className={({ isActive }) => (isActive ? css.active : '')}>
          Account
        </NavLink>
        <NavLink to="/account/profile" className={({ isActive }) => (isActive ? css.active : '')}>
          Personal Information
        </NavLink>
        <NavLink to="/account/history" className={({ isActive }) => (isActive ? css.active : '')}>
          Orders History
        </NavLink>
        <NavLink to="/account/favorites" className={({ isActive }) => (isActive ? css.active : '')}>
          Favorites
        </NavLink>
      </nav>
    </Flex>
  );
}
