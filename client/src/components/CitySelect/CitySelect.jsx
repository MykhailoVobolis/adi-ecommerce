import debounce from 'lodash.debounce';

import { useEffect, useMemo, useRef, useState } from 'react';
import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useDispatch } from 'react-redux';
import { setFilterCities } from '../../redux/delivery/slice.js';

import SelectDropdownList from '../SelectDropdownList/SelectDropdownList.jsx';

import css from './CitySelect.module.css';

export default function CitySelect({ cities }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value.trim());
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        if (value === '') {
          dispatch(setFilterCities(''));
          return;
        }

        if (value.length < 2) return;
        dispatch(setFilterCities(value));
      }, 500),
    [dispatch],
  );

  const handleSelect = (city) => {
    setQuery(city);
    setIsOpen(false);
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
    setIsOpen(true);
  };

  return (
    <div className={css.selectWrapper} ref={wrapperRef}>
      <TextField.Root
        className={css.textField}
        value={query}
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
      {isOpen && <SelectDropdownList cities={cities} handleSelect={handleSelect} />}
    </div>
  );
}
