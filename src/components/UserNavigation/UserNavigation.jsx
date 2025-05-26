import { LiaUser } from "react-icons/lia";
import { LiaUserCheckSolid } from "react-icons/lia";
import { LiaHeart } from "react-icons/lia";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { LiaHeartSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectSelectedFavoriteProducts } from "../../redux/favorites/selectors.js";

import CounterBadge from "../CounterBadge/CounterBadge.jsx";

import css from "./UserNavigation.module.css";

export default function UserNavigation() {
  const isLoggedIn = false;
  const favoriteProducts = useSelector(selectSelectedFavoriteProducts);

  const count = favoriteProducts.length;

  return (
    <ul className={css.userNavMenu}>
      <li>
        <NavLink to={"/login"} className={css.link}>
          {isLoggedIn ? <LiaUserCheckSolid size={24} /> : <LiaUser size={24} />}
        </NavLink>
      </li>
      <li className={css.iconWithBadge}>
        <NavLink to={"/favorites"} className={css.link}>
          {count ? <LiaHeartSolid size={24} /> : <LiaHeart size={24} />}
          {count > 0 && <CounterBadge count={count} />}
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
