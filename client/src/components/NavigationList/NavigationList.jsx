import { NavLink } from 'react-router-dom';

import '@radix-ui/themes/styles.css';
import css from './NavigationList.module.css';

export default function NavigationList() {
  const navItems = [
    { to: '/products/men', label: 'MEN' },
    { to: '/products/women', label: 'WOMEN' },
    { to: '/products/kids', label: 'KIDS' },
    // { to: '/product', label: 'PRODUCT' },
  ];

  return (
    <ul className={css.navMenu}>
      {navItems.map(({ to, label, icon }) => (
        <li key={to}>
          <NavLink to={to} className={css.link}>
            {label || icon}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
