import { Text } from '@radix-ui/themes';

import css from './InputErrorMessage.module.css';

export default function InputErrorMessage({ errors, name }) {
  return (
    errors[name] && (
      <Text as="p" className={css.errorMessage}>
        {errors[name].message}
      </Text>
    )
  );
}
