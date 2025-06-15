import SelectDropdownItem from '../SelectDropdownItem/SelectDropdownItem.jsx';

import css from './SelectDropdownList.module.css';

export default function SelectDropdownList({ cities, handleSelect }) {
  return (
    <ul className={css.dropdown}>
      {cities.length === 0 ? (
        <li className={css.noResultsItem}>No results</li>
      ) : (
        cities.map((city) => <SelectDropdownItem key={city.Ref} city={city} onSelect={handleSelect} />)
      )}
    </ul>
  );
}
