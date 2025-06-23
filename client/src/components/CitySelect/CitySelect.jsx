import debounce from 'lodash.debounce';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useDispatch } from 'react-redux';
import { clearWarehousesTypes, setFilterCities, setSelectedCity } from '../../redux/delivery/slice.js';
import { fetchWarehousesOfCity } from '../../redux/delivery/operations.js';

import SelectDropdownList from '../SelectDropdownList/SelectDropdownList.jsx';

import css from './CitySelect.module.css';

export default function CitySelect({ cities, totalCount, selectedCity }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const wrapperRef = useRef(null);
  const observerRef = useRef();

  const hasMore = cities.length < totalCount;

  useEffect(() => {
    if (selectedCity && selectedCity.Description) {
      setQuery(`${selectedCity.SettlementTypeDescription?.slice(0, 1) || ''}. ${selectedCity.Description || ''}`);
    }
  }, [selectedCity]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setPage(1);
    debouncedSearch(value.trim());
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        if (value === '') {
          dispatch(setFilterCities({ name: '', page: 1 }));
          return;
        }

        if (value.length < 2) return;
        dispatch(setFilterCities({ name: value, page: page }));
      }, 500),
    [dispatch, page],
  );

  const handleSelect = (city) => {
    dispatch(setSelectedCity(city));
    setIsOpen(false);
    dispatch(fetchWarehousesOfCity(city.Ref));
  };

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  useEffect(() => {
    function handleClick(event) {
      if (!wrapperRef.current) return;

      if (!wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        document.activeElement?.blur();
      }
    }

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const openDrop = () => {
    setQuery('');
    setIsOpen(true);
    dispatch(clearWarehousesTypes());
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(setFilterCities({ name: query, page }));
    } else {
      // Очищуємо список при новому пошуку
      dispatch(setFilterCities({ name: '', page: 1 }));
    }
  }, [dispatch, page, query]);

  const handleLoadMore = useCallback(() => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);
    setPage((prev) => prev + 1);
  }, [isFetching, hasMore]);

  useEffect(() => {
    setIsFetching(false);
  }, [cities.length]);

  return (
    <div className={css.selectWrapper} ref={wrapperRef}>
      <TextField.Root
        className={css.textField}
        value={query || ''}
        size="3"
        placeholder="City"
        variant="surface"
        onClick={openDrop}
        onChange={handleChange}
      >
        <TextField.Slot side="right">
          <MagnifyingGlassIcon height="24" width="24" />
        </TextField.Slot>
      </TextField.Root>
      {isOpen && (
        <SelectDropdownList
          cities={cities}
          handleSelect={handleSelect}
          observerRef={observerRef}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
}
