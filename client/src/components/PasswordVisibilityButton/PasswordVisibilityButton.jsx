import { LiaEyeSolid } from 'react-icons/lia';
import { LiaEyeSlashSolid } from 'react-icons/lia';

import css from './PasswordVisibilityButton.module.css';

export default function PasswordVisibilityButton({ onClick, visible }) {
  return (
    <button className={css.passwordVisibilityButton} type="button" onClick={onClick}>
      {!visible ? (
        <LiaEyeSolid className={css.buttonIcon} size={24} />
      ) : (
        <LiaEyeSlashSolid className={css.buttonIcon} size={24} />
      )}
    </button>
  );
}
