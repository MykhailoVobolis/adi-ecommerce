import * as RadioGroup from "@radix-ui/react-radio-group";
import { Text } from "@radix-ui/themes";

import css from "./SizePicker.module.css";

export default function SizePicker({ sizes, selectedSize, onChange }) {
  return (
    <div className={css.sizePickerContainer}>
      <Text as="p" size="3" mt="2" mb="3" weight="bold">
        Sizes
      </Text>
      <RadioGroup.Root
        className={css.sizePickerRoot}
        value={selectedSize}
        onValueChange={onChange}
        aria-label="Shoe Size">
        {sizes.map((size) => (
          <RadioGroup.Item key={size} value={size} className={css.sizePickerItem}>
            {size} UK
            <RadioGroup.Indicator className={css.sizePickerIndicator} />
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
}
