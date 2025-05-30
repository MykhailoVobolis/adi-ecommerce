import Navigation from '../Navigation/Navigation.jsx';
import css from './AppBar.module.css';

export default function AppBar() {
  return (
    <header className={css.header}>
      <div className={css.navContainer}>
        <Navigation />
      </div>
    </header>
  );
}
