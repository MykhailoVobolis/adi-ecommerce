import { forwardRef } from 'react';
import css from './WarehouseDropdownItem.module.css';

const WarehouseDropdownItem = forwardRef(({ warehouse, onSelect }, ref) => {
  const [title, address] = warehouse.Description.split(':').map((str) => str.trim());

  return (
    <li ref={ref} className={css.dropdownItem} onClick={() => onSelect(warehouse)}>
      <p className={css.cityName}>{title}</p>
      <p className={css.cityArea}>{address}</p>
    </li>
  );
});

WarehouseDropdownItem.displayName = 'WarehouseDropdownItem';

export default WarehouseDropdownItem;
