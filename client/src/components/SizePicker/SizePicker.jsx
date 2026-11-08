import * as RadioGroup from '@radix-ui/react-radio-group';
import { Text } from '@radix-ui/themes';
import clsx from 'clsx';

import RadioInput from '../RadioInput/RadioInput.jsx';

import css from './SizePicker.module.css';

export default function SizePicker({ sizes, selectedSize, onChange, hasError }) {
  return (
    <div className={css.sizePickerContainer}>
      <Text as="p" size="3" mt="2" mb="3" weight="bold">
        Sizes
      </Text>
      <RadioGroup.Root
        className={css.sizePickerRoot}
        value={selectedSize}
        onValueChange={onChange}
        aria-label="Shoe Size"
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? 'size-picker-error' : undefined}
      >
        {sizes.map((size) => (
          <RadioInput
            key={size}
            value={size}
            label={`${size}`}
            className={css.sizePickerItem}
            indicatorClassName={css.sizePickerIndicator}
          >
            <span>{size}</span>
          </RadioInput>
        ))}
      </RadioGroup.Root>
      <Text
        id="size-picker-error"
        as="p"
        className={clsx(css.errorMessage, { [css.visibleError]: hasError })}
        role={hasError ? 'alert' : undefined}
        aria-hidden={!hasError}
      >
        Please select your size
      </Text>
    </div>
  );
}
