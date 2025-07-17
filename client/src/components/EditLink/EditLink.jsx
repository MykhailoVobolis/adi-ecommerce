import { Link } from 'react-router-dom';
import { LiaEditSolid } from 'react-icons/lia';

import css from './EditLink.module.css';

export default function EditLink({ navTo }) {
  return (
    <Link to={navTo} className={css.link}>
      <LiaEditSolid size={24} />
    </Link>
  );
}
