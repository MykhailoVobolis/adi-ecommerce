import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { resetCategoryData } from '../../redux/products/slice.js';

import '@radix-ui/themes/styles.css';
import css from './NavigationList.module.css';

export default function NavigationList() {
  const dispatch = useDispatch();

  const navItems = [
    { to: '/products/men', label: 'MEN' },
    { to: '/products/women', label: 'WOMEN' },
    { to: '/products/kids', label: 'KIDS' },
  ];

  return (
    <ul className={css.navMenu}>
      {navItems.map(({ to, label, icon }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={css.link}
            onClick={() => {
              dispatch(resetCategoryData({ label }));
            }}
          >
            {label || icon}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
