import css from './SelectDropdownItem.module.css';

export default function SelectDropdownItem({ city, onSelect }) {
  const { Description, Ref, AreaDescription, RegionsDescription, SettlementTypeDescription } = city;

  const settlementType = SettlementTypeDescription.slice(0, 1);

  return (
    <li className={css.dropdownItem} key={Ref} onClick={() => onSelect(Description)}>
      <p className={css.cityName}>
        {settlementType}. {Description}
      </p>
      <p className={css.cityArea}>
        {AreaDescription ? `${AreaDescription} обл.` : ''}
        {RegionsDescription ? `, ${RegionsDescription} р-н.` : ''}
      </p>
    </li>
  );
}
