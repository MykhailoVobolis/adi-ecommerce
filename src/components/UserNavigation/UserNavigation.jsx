import { LiaUser } from "react-icons/lia";
import { LiaUserCheckSolid } from "react-icons/lia";
import { LiaHeart } from "react-icons/lia";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";

import css from "./UserNavigation.module.css";

export default function UserNavigation() {
  const isLoggedIn = false;

  return (
    <ul className={css.userNavMenu}>
      <li>
        <NavLink to={"/login"} className={css.link}>
          {isLoggedIn ? <LiaUserCheckSolid size={24} /> : <LiaUser size={24} />}
        </NavLink>
      </li>
      <li>
        <NavLink to={"/favorites"} className={css.link}>
          <LiaHeart size={24} />
        </NavLink>
      </li>
      <li>
        <NavLink to={"/cart"} className={css.link}>
          <LiaShoppingBagSolid size={24} />
        </NavLink>
      </li>
    </ul>
  );
}
