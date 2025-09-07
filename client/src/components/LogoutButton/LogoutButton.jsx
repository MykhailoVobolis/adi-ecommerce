import { Button } from '@radix-ui/themes';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import css from './LogoutButton.module.css';

export default function LogoutButton({ handleClick }) {
  return (
    <Button className={css.logoutBtn} type="button" onClick={handleClick}>
      <span>Log me out</span>
      <HiOutlineArrowNarrowRight size={24} />
    </Button>
  );
}
