import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  // clearWarehousesTypes,
  setFilterCities,
  setSelectedCity,
  setSelectedMethod,
} from '../../redux/delivery/slice.js';
import { fetchDeliveryCities, fetchDeliveryMethodsOfCity } from '../../redux/delivery/operations.js';
import { useDropdownClose } from '../../hooks/useDropdownClose.js';
import { useSearch } from '../../hooks/useSearch.js';
import { usePaginated } from '../../hooks/usePaginated.js';

import SelectDropdownList from '../SelectDropdownList/SelectDropdownList.jsx';

import css from './CitySelect.module.css';

export default function CitySelect({ cities, totalCount, selectedCity }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);
  const observerRef = useRef();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const onSearch = useCallback(
    (value, page) => {
      dispatch(setFilterCities({ name: value, page }));
    },
    [dispatch],
  );

  const { query, setQuery, handleChange } = useSearch(onSearch);
  const { page, setPage, hasMore, handleLoadMore } = usePaginated({
    dataLength: cities.length,
    totalCount,
  });

  const visibleCity = selectedCity
    ? `${selectedCity.SettlementTypeDescription?.slice(0, 1) || ''}. ${selectedCity.Description || ''}`
    : '';

  useEffect(() => {
    if (selectedCity && selectedCity.Description) {
      setQuery(visibleCity);
    }
  }, [selectedCity, setQuery, visibleCity]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPage(1);
    handleChange(value, page);
  };

  const handleSelect = (city) => {
    dispatch(setSelectedCity(city));
    setIsOpen(false);
    dispatch(setSelectedMethod(''));
    dispatch(fetchDeliveryMethodsOfCity(city.Ref));
  };

  const openDrop = () => {
    if (selectedCity) {
      const searchCityName = getSearchCity(selectedCity.Description);
      const filterParams = { name: searchCityName, page: 1 };

      dispatch(fetchDeliveryCities(filterParams));
    }

    setQuery('');
    setIsOpen(true);
    // dispatch(clearWarehousesTypes());
  };

  const getSearchCity = (cityString) => {
    if (!cityString) return '';
    return cityString.split(' ')[0];
  };

  useDropdownClose({ wrapperRef, setIsOpen });

  useEffect(() => {
    if (page > 1) {
      dispatch(setFilterCities({ name: '', page }));
    } else {
      // Очищуємо список при новому пошуку
      dispatch(setFilterCities({ name: '', page: 1 }));
    }
  }, [dispatch, page, query]);

  return (
    <div className={css.selectWrapper} ref={wrapperRef}>
      <TextField.Root
        className={css.textField}
        value={isFocused ? query : visibleCity}
        size="3"
        placeholder="City"
        variant="surface"
        name="city"
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
