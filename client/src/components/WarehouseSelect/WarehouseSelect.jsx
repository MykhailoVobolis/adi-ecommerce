import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { setFilterWarehouses, setSelectedWarehouse } from '../../redux/delivery/slice.js';
import { useDropdownClose } from '../../hooks/useDropdownClose.js';
import { useSearch } from '../../hooks/useSearch.js';
import { usePaginated } from '../../hooks/usePaginated.js';

import WarehouseDropdownList from '../WarehouseDropdownList/WarehouseDropdownList.jsx';

import css from './WarehouseSelect.module.css';

export default function WarehouseSelect({
  warehouses,
  totalCount,
  selectedWarehouse,
  selectValue,
  onChange,
  onBlur,
  hasError,
  isSuccess,
}) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);
  const observerRef = useRef();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const onSearch = useCallback(
    (value, page) => {
      dispatch(setFilterWarehouses({ name: value, page }));
    },
    [dispatch],
  );

  const { query, setQuery, handleChange } = useSearch(onSearch);
  const { page, setPage, hasMore, handleLoadMore } = usePaginated({
    dataLength: warehouses.length,
    totalCount,
  });

  const visible = selectedWarehouse ? selectValue : '';

  useEffect(() => {
    if (!selectedWarehouse?.Description) return;
    setQuery(visible);
  }, [selectedWarehouse]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPage(1);
    handleChange(value, page);
  };

  const handleSelect = (warehouse) => {
    dispatch(setSelectedWarehouse(warehouse));
    dispatch(setFilterWarehouses({ name: '' }));
    onChange?.(warehouse.Description);
    setIsOpen(false);
  };

  const openDrop = () => {
    setQuery('');
    setIsOpen(true);
  };

  useDropdownClose({ wrapperRef, setIsOpen });

  useEffect(() => {
    dispatch(setFilterWarehouses({ name: '', page }));
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
        placeholder="Branch number *"
        variant="surface"
        name="branch"
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
        <WarehouseDropdownList
          warehouses={warehouses}
          handleSelect={handleSelect}
          observerRef={observerRef}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
}
