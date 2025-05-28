import { NavLink } from "react-router-dom";

import "@radix-ui/themes/styles.css";
import css from "./NavigationList.module.css";

export default function NavigationList() {
  const navItems = [
    { to: "/men", label: "MEN" },
    { to: "/women", label: "WOMEN" },
    { to: "/kids", label: "KIDS" },
    { to: "/product", label: "PRODUCT" },
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
