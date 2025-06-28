import { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

export function useSearch(onSearch) {
  const [query, setQuery] = useState('');

  const debouncedSearch = useMemo(
    () =>
      debounce((value, page) => {
        if (value === '') {
          onSearch('', page);
          return;
        }

        if (value.length < 2) return;
        onSearch(value, page);
      }, 500),
    [onSearch],
  );

  const handleChange = (value, page) => {
    setQuery(value);
    debouncedSearch(value.trim(), page);
  };

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return {
    query,
    setQuery,
    handleChange,
  };
}
