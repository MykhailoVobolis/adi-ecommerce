import * as RadioGroup from "@radix-ui/react-radio-group";
import { Text } from "@radix-ui/themes";

import RadioInput from "../RadioInput/RadioInput.jsx";

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
          <RadioInput
            key={size}
            value={size}
            label={`${size} UK`}
            className={css.sizePickerItem}
            indicatorClassName={css.sizePickerIndicator}>
            <span>{size} UK</span>
          </RadioInput>
        ))}
      </RadioGroup.Root>
    </div>
  );
}
