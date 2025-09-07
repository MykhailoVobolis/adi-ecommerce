import { forwardRef } from 'react';

import css from './StreetDropdownItem.module.css';

const StreetDropdownItem = forwardRef(({ street, onSelect }, ref) => {
  const { StreetsType, Description } = street;
  return (
    <li ref={ref} className={css.dropdownItem} onClick={() => onSelect(street)}>
      <p className={css.streetName}>
        {StreetsType} {Description}
      </p>
    </li>
  );
});

StreetDropdownItem.displayName = 'StreetDropdownItem';

export default StreetDropdownItem;
