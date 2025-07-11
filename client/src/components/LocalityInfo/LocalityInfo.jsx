import { Text } from '@radix-ui/themes';

import css from './LocalityInfo.module.css';

export default function LocalityInfo({ cityName }) {
  return (
    <Text as="p" mb="6">
      <span className={css.locality}>Locality:</span> {cityName}
    </Text>
  );
}
