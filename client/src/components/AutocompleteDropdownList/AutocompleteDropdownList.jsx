import { useEffect } from 'react';

import WarehouseDropdownItem from '../WarehouseDropdownItem/WarehouseDropdownItem.jsx';
import StreetDropdownItem from '../StreetDropdownItem/StreetDropdownItem.jsx';

import css from './AutocompleteDropdownList.module.css';

export default function AutocompleteDropdownList({
  selectType,
  items,
  handleSelect,
  observerRef,
  hasMore,
  onLoadMore,
}) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          onLoadMore();
        }
      },
      { threshold: 1 },
    );

    const current = observerRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [observerRef, hasMore, onLoadMore]);

  return (
    <ul className={css.dropdown}>
      {items.length === 0 ? (
        <li className={css.noResultsItem}>No results</li>
      ) : (
        items.map((item, index) => {
          const ref = index === items.length - 1 ? observerRef : null;

          return selectType === 'warehouse' ? (
            <WarehouseDropdownItem key={item.Ref} warehouse={item} onSelect={handleSelect} ref={ref} />
          ) : (
            <StreetDropdownItem key={item.Ref} street={item} onSelect={handleSelect} ref={ref} />
          );
        })
      )}
    </ul>
  );
}
