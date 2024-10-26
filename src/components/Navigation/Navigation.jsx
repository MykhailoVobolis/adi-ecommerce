import NavigationList from "../NavigationList/NavigationList.jsx";
import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <div className={css.barContainer}>
      <nav className={css.navigation}>
        <NavigationList />
      </nav>
    </div>
  );
}
