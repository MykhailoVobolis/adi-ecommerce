import SelectItem from '../SelectItem/SelectItem.jsx';
import { Select } from '@radix-ui/themes';

import css from './SelectQuantity.module.css';

export default function SelectQuantity({ quantity, handleQuantityChange }) {
  return (
    <Select.Root defaultValue={quantity.toString()} onValueChange={handleQuantityChange}>
      <Select.Trigger className={css.selectTrigger} />
      <Select.Content>
        <SelectItem value="1">1</SelectItem>
        <SelectItem value="2">2</SelectItem>
        <SelectItem value="3">3</SelectItem>
        <SelectItem value="4">4</SelectItem>
        <SelectItem value="5">5</SelectItem>
      </Select.Content>
    </Select.Root>
  );
}
