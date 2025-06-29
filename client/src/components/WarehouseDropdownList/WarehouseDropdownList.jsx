import { useEffect } from 'react';

import WarehouseDropdownItem from '../WarehouseDropdownItem/WarehouseDropdownItem.jsx';

import css from './WarehouseDropdownList.module.css';

export default function WarehouseDropdownList({ warehouses, handleSelect, observerRef, hasMore, onLoadMore }) {
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
      {warehouses.length === 0 ? (
        <li className={css.noResultsItem}>No results</li>
      ) : (
        warehouses.map((warehouse, index) => (
          <WarehouseDropdownItem
            key={warehouse.Ref}
            warehouse={warehouse}
            onSelect={handleSelect}
            ref={index === warehouses.length - 1 ? observerRef : null}
          />
        ))
      )}
    </ul>
  );
}
