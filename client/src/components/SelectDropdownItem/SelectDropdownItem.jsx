import { forwardRef } from 'react';
import css from './SelectDropdownItem.module.css';

const SelectDropdownItem = forwardRef(({ city, onSelect }, ref) => {
  const { Description, AreaDescription, RegionsDescription, SettlementTypeDescription } = city;
  const settlementType = SettlementTypeDescription?.slice(0, 1);

  return (
    <li ref={ref} className={css.dropdownItem} onClick={() => onSelect(city)}>
      <p className={css.cityName}>
        {settlementType}. {Description}
      </p>
      <p className={css.cityArea}>
        {AreaDescription} обл{RegionsDescription ? `, ${RegionsDescription} р-н.` : ''}
      </p>
    </li>
  );
});

SelectDropdownItem.displayName = 'DropdownItem';

export default SelectDropdownItem;
