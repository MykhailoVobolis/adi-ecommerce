import { forwardRef } from 'react';
import css from './SelectDropdownItem.module.css';

const SelectDropdownItem = forwardRef(({ city, onSelect }, ref) => {
  const { Description, AreaDescription, SettlementTypeDescription } = city;
  const settlementType = SettlementTypeDescription?.slice(0, 1);

  const cityName = Description.split('(')[0].trim();
  const regionsDescription = Description.split('(')[1]?.replace(')', '').trim();

  return (
    <li ref={ref} className={css.dropdownItem} onClick={() => onSelect(city)}>
      <p className={css.cityName}>
        {settlementType}. {cityName}
      </p>
      <p className={css.cityArea}>
        {regionsDescription
          ? regionsDescription.includes('обл')
            ? regionsDescription
            : `${regionsDescription}, ${AreaDescription} обл.`
          : `${AreaDescription} обл.`}
      </p>
    </li>
  );
});

SelectDropdownItem.displayName = 'DropdownItem';

export default SelectDropdownItem;
