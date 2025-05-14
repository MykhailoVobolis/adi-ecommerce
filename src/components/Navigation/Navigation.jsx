import NavigationList from "../NavigationList/NavigationList.jsx";
import CustomLogoIcon from "../CustomLogoIcon.jsx";

import { Link } from "@radix-ui/themes";

import css from "./Navigation.module.css";
import UserNavigation from "../UserNavigation/UserNavigation.jsx";

export default function Navigation() {
  return (
    <div className={css.barContainer}>
      <Link href="/" size={"1"}>
        <CustomLogoIcon />
      </Link>
      <nav className={css.navigation}>
        <NavigationList />
      </nav>
      <nav className={css.userNavigation}>
        <UserNavigation />
      </nav>
    </div>
  );
}
