import { forwardRef } from 'react';
import { Select } from '@radix-ui/themes';

import css from './SelectItem.module.css';

const SelectItem = forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <Select.Item className={css.selectItem} {...props} ref={forwardedRef}>
      {children}
    </Select.Item>
  );
});

SelectItem.displayName = 'SelectQuantityItem';

export default SelectItem;
