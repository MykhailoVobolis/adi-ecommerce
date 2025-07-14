import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { setFilterStreets } from '../../redux/delivery/slice.js';
import { useDropdownClose } from '../../hooks/useDropdownClose.js';
import { useSearch } from '../../hooks/useSearch.js';
import { usePaginated } from '../../hooks/usePaginated.js';
import { setSelectedStreet } from '../../redux/checkout/slice.js';

import AutocompleteDropdownList from '../AutocompleteDropdownList/AutocompleteDropdownList.jsx';

import css from './StreetSelect.module.css';

export default function StreetSelect({ streets, totalCount, selectedStreet, onChange, onBlur, hasError, isSuccess }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);
  const observerRef = useRef();

  const handleFocus = () => {
    setQuery('');
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const onSearch = useCallback(
    (value, page) => {
      dispatch(setFilterStreets({ name: value, page }));
    },
    [dispatch],
  );

  const { query, setQuery, handleChange } = useSearch(onSearch);
  const { page, setPage, hasMore, handleLoadMore } = usePaginated({
    dataLength: streets.length,
    totalCount,
  });

  const visible = selectedStreet ? `${selectedStreet.StreetsType} ${selectedStreet.Description}` : '';

  useEffect(() => {
    if (!selectedStreet?.Description) {
      setQuery('');
    } else {
      setQuery(selectedStreet.Description);
    }
  }, [selectedStreet]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPage(1);
    handleChange(value, page);
  };

  const handleSelect = (street) => {
    dispatch(setSelectedStreet(street));
    dispatch(setFilterStreets({ name: '' }));
    onChange?.(street.Description);
    setIsOpen(false);
  };

  const openDrop = () => {
    setQuery('');
    setIsOpen(true);
  };

  useDropdownClose({ wrapperRef, setIsOpen });

  useEffect(() => {
    dispatch(setFilterStreets({ name: '', page }));
  }, [dispatch, page]);

  return (
    <div className={css.selectWrapper} ref={wrapperRef}>
      <TextField.Root
        className={clsx(css.textField, {
          [css.inputError]: hasError,
          [css.inputSuccess]: isSuccess,
        })}
        value={isFocused ? query : visible}
        size="3"
        placeholder="Street name *"
        variant="surface"
        name="street"
        onClick={openDrop}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <TextField.Slot side="right">
          <MagnifyingGlassIcon height="24" width="24" />
        </TextField.Slot>
      </TextField.Root>
      {isOpen && (
        <AutocompleteDropdownList
          selectType="street"
          items={streets}
          handleSelect={handleSelect}
          observerRef={observerRef}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
}
