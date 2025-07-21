import { Text } from '@radix-ui/themes';

import css from './InfoRow.module.css';

export default function InfoRow({ label, value }) {
  return (
    <Text as="p" mb="6">
      <span className={css.label}>{label}:</span> {value}
    </Text>
  );
}
