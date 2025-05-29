import * as RadioGroup from '@radix-ui/react-radio-group';
import { nanoid } from 'nanoid';
import { Text } from '@radix-ui/themes';

import RadioInput from '../RadioInput/RadioInput.jsx';

import css from './ColorPicker.module.css';

export default function ColorPicker({ changeColor, productImagesVariants, selectedColor }) {
  const { variants } = productImagesVariants;

  const previewVariants = Object.values(variants).map((variant) => ({
    _id: nanoid(),
    color: variant.color,
    image: variant.images[0],
  }));

  const handleColorChange = (value) => {
    changeColor(value);
  };

  return (
    <div className={css.colorPickerContainer}>
      <Text as="p" size="3" mt="2" mb="3" weight="bold">
        Colors
      </Text>
      <RadioGroup.Root
        className={css.RadioGroupRoot}
        value={selectedColor}
        onValueChange={handleColorChange}
        aria-label="Color selection"
      >
        {previewVariants.map(({ _id, color, image }) => (
          <RadioInput
            key={_id}
            value={color}
            label={`${color.charAt(0).toUpperCase()}${color.slice(1)}`}
            className={css.colorPickerItem}
            indicatorClassName={css.activeIndicator}
          >
            <img src={image.src} alt={`${image.alt || image.color} color`} className={css.colorImage} />
          </RadioInput>
        ))}
      </RadioGroup.Root>
    </div>
  );
}
