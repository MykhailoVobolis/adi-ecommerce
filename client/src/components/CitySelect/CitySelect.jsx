import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { clearWarehousesTypes, setFilterCities } from '../../redux/delivery/slice.js';
import { fetchDeliveryCities, fetchDeliveryCost, fetchDeliveryMethodsOfCity } from '../../redux/delivery/operations.js';
import { useDropdownClose } from '../../hooks/useDropdownClose.js';
import { useSearch } from '../../hooks/useSearch.js';
import { usePaginated } from '../../hooks/usePaginated.js';
import {
  setSelectedBranch,
  setSelectedCity,
  setSelectedMethod,
  setSelectedPostomat,
  setSelectedStreet,
} from '../../redux/checkout/slice.js';

import SelectDropdownList from '../SelectDropdownList/SelectDropdownList.jsx';
import FloatingLabel from '../FloatingLabel/FloatingLabel.jsx';

import css from './CitySelect.module.css';

export default function CitySelect({ cities, totalCount, selectedCity, totalPrice, totalQuantityProducts }) {
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

  const visible = selectedCity
    ? `${selectedCity.SettlementTypeDescription?.slice(0, 1) || ''}. ${selectedCity.Description || ''}`
    : '';

  useEffect(() => {
    if (!selectedCity?.Description) return;
    setQuery(visible);

    const shortName = selectedCity.Description.trim().split(' ')[0];
    const filterParams = { name: shortName, page: 1 };

    dispatch(fetchDeliveryCities(filterParams));
  }, [dispatch, selectedCity]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPage(1);
    handleChange(value, page);
  };

  const handleSelect = (city) => {
    dispatch(setSelectedCity(city));

    dispatch(setSelectedBranch(null));
    dispatch(setSelectedPostomat(null));

    dispatch(setSelectedStreet(null));
    dispatch(clearWarehousesTypes());
    setIsOpen(false);
    dispatch(setSelectedMethod(''));

    const baseOptions = {
      cost: totalPrice,
      amount: totalQuantityProducts,
      cityRecipient: city.Ref,
    };

    Promise.all([
      dispatch(fetchDeliveryCost({ ...baseOptions, serviceType: 'WarehouseWarehouse' })),
      dispatch(fetchDeliveryCost({ ...baseOptions, serviceType: 'WarehouseDoors' })),
      dispatch(fetchDeliveryMethodsOfCity(city.Ref)),
    ]);
  };

  const openDrop = () => {
    setQuery('');
    setIsOpen(true);
  };

  useDropdownClose({ wrapperRef, setIsOpen });

  useEffect(() => {
    dispatch(setFilterCities({ name: '', page }));
  }, [dispatch, page]);

  const showFloatingLabel = isFocused || visible;

  return (
    <div className={css.selectWrapper} ref={wrapperRef}>
      <FloatingLabel name="city" placeholder="City/Town *" showFloatingLabel={showFloatingLabel} />
      <TextField.Root
        className={css.textField}
        value={isFocused ? query : visible}
        size="3"
        variant="surface"
        id="city"
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
