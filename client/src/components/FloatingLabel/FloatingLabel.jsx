import clsx from 'clsx';

import css from './FloatingLabel.module.css';

export default function FloatingLabel({ name, placeholder, showFloatingLabel }) {
  return (
    <label
      htmlFor={name}
      className={clsx(css.floatingLabel, {
        [css.labelActive]: showFloatingLabel,
      })}
    >
      {placeholder}
    </label>
  );
}
