import { useEffect } from 'react';

import SelectDropdownItem from '../SelectDropdownItem/SelectDropdownItem.jsx';

import css from './SelectDropdownList.module.css';

export default function SelectDropdownList({ cities, handleSelect, observerRef, hasMore, onLoadMore }) {
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
      {cities.length === 0 ? (
        <li className={css.noResultsItem}>No results</li>
      ) : (
        cities.map((city, index) => (
          <SelectDropdownItem
            key={city.Ref}
            city={city}
            onSelect={handleSelect}
            ref={index === cities.length - 1 ? observerRef : null}
          />
        ))
      )}
    </ul>
  );
}
