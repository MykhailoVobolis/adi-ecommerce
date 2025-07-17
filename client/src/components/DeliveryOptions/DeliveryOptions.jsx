import { useEffect, useRef } from 'react';
import { Box, Flex, Heading } from '@radix-ui/themes';
import { LiaTruckSolid } from 'react-icons/lia';
import { LiaMapMarkerSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterStreets, selectFilterWarehouses, selectLoading } from '../../redux/delivery/selectors.js';
import { setFilterStreets, setFilterWarehouses } from '../../redux/delivery/slice.js';
import { selectDeliveryAddress } from '../../redux/checkout/selectors.js';
import { setSelectedDeliveryCost, setSelectedMethod } from '../../redux/checkout/slice.js';
import { fetchStreetsOfCity, fetchWarehousesOfCity } from '../../redux/delivery/operations.js';
import { useNavigate } from 'react-router-dom';

import BranchDeliverySection from '../BranchDeliverySection/BranchDeliverySection.jsx';
import CourierDeliverySection from '../CourierDeliverySection/CourierDeliverySection.jsx';
import CitySelect from '../CitySelect/CitySelect.jsx';
import DeliveryMethodSelector from '../DeliveryMethodSelector/DeliveryMethodSelector.jsx';
import Loader from '../Loader/Loader.jsx';

import css from './DeliveryOptions.module.css';

const options = [
  {
    value: 'branch',
    title: 'Доставка на відділення «Нова пошта»',
    price: 'Безкоштовно',
    infoText: 'Безкоштовна доставка при замовленні від 300 $',
    checkIcon: <LiaMapMarkerSolid size={24} />,
  },
  {
    value: 'courier',
    title: 'Кур’єрська доставка «Нова пошта»',
    price: 'Безкоштовно',
    infoText: 'Безкоштовна доставка при замовленні від 300 $',
    checkIcon: <LiaTruckSolid size={24} />,
  },
  {
    value: 'postomat',
    title: 'Доставка в поштомат «Нова пошта»',
    price: 'Безкоштовно',
    infoText: 'Безкоштовна доставка при замовленні від 300 $',
    checkIcon: <LiaMapMarkerSolid size={24} />,
  },
];

export default function DeliveryOptions({
  deliveryCities,
  deliveryAddress,
  warehouseTypes,
  warehousesOfCity,
  streetsOfCity,
  totalPrice,
  totalQuantityProducts,
  deliveryCost,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectLoading);
  const { selectedMethod } = useSelector(selectDeliveryAddress);

  const { selectedCity, selectedWarehouse, selectedStreet } = deliveryAddress;
  const { hasBranch, hasPostomat, hasCourier } = warehouseTypes;
  const { cities, totalCount } = deliveryCities;
  const { courierDeliveryCost, pickupPointCost } = deliveryCost;

  const formRef = useRef(null);

  const filteredOptions = options.filter(
    (option) =>
      (option.value === 'branch' && hasBranch) ||
      (option.value === 'postomat' && hasPostomat) ||
      (option.value === 'courier' && hasCourier),
  );

  const isReady = hasBranch !== null || hasPostomat !== null || hasCourier !== null;
  const isBranch = selectedMethod === 'branch';
  const isPostomat = selectedMethod === 'postomat';
  const isCourier = selectedMethod === 'courier';

  const { name, page } = useSelector(selectFilterWarehouses);
  const { name: streetQuery, page: streetPage } = useSelector(selectFilterStreets);

  useEffect(() => {
    if (!selectedCity?.Ref || selectedMethod === 'courier' || !selectedMethod) return;

    const filterParams = {
      page,
      CityRef: selectedCity.Ref,
      CategoryOfWarehouse: selectedMethod,
      warehouseName: name,
    };

    dispatch(fetchWarehousesOfCity(filterParams));
  }, [dispatch, page, name, selectedMethod, selectedCity?.Ref]);

  useEffect(() => {
    if (!selectedCity?.Ref || selectedMethod !== 'courier') return;

    const filterParams = {
      Page: streetPage,
      CityRef: selectedCity.Ref,
      streetName: streetQuery,
    };

    dispatch(fetchStreetsOfCity(filterParams));
  }, [dispatch, selectedMethod, selectedCity?.Ref, streetPage, streetQuery]);

  useEffect(() => {
    if (!selectedMethod) {
      dispatch(setSelectedDeliveryCost(null));
      return;
    }

    const selectedDeliveryCost = selectedMethod === 'courier' ? courierDeliveryCost : pickupPointCost;

    dispatch(setSelectedDeliveryCost(selectedDeliveryCost));
  }, [selectedMethod, courierDeliveryCost, pickupPointCost, dispatch]);

  const handleSelect = (value) => {
    dispatch(setSelectedMethod(value));
    if (value !== 'courier') {
      dispatch(setFilterWarehouses({ name: '', page: 1 }));
    } else {
      // в противному випадку викликати запит на список вулиць
      dispatch(setFilterStreets({ name: '', page: 1 }));
    }
  };

  useEffect(() => {
    if ((isBranch || isPostomat || isCourier) && formRef.current) {
      const headerOffset = 80;
      const top = formRef.current.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({
        top: top,
        behavior: 'smooth',
      });
    }
  }, [isBranch, isPostomat, isCourier]);

  const handleSubmit = (data) => {
    console.log('Form data:', data);
    // Тут можемо робити dispatch або перехід на сторінку payment
    navigate('/payment');
  };

  return (
    <Box className={css.optionWrapper}>
      <Heading as="h1" size="7" mb="4" weight="bold">
        {!selectedMethod && selectedCity ? 'CHOOSE A DELIVERY METHOD' : 'CHOOSE A DELIVERY ADDRESS'}
      </Heading>
      <CitySelect
        cities={cities}
        totalCount={totalCount}
        selectedCity={selectedCity}
        totalPrice={totalPrice}
        totalQuantityProducts={totalQuantityProducts}
      />
      <p className={css.deliveryOptionDescription}>
        The specification and delivery term depend on the delivery method. At the next moment you can clarify this
        information.
      </p>
      {isLoading && <Loader heightValue={'100%'} />}
      {isReady && filteredOptions.length > 0 && (
        <DeliveryMethodSelector
          options={filteredOptions}
          handleSelect={handleSelect}
          selectedMethod={selectedMethod}
          deliveryCost={deliveryCost}
          totalPrice={totalPrice}
        />
      )}
      {isReady && filteredOptions.length === 0 && (
        <Flex className={css.messageWrapper}>
          <p className={css.noDeliveryMessage}>No delivery options available</p>
        </Flex>
      )}
      <Box ref={formRef}>
        {(isBranch || isPostomat) && isReady && (
          <BranchDeliverySection
            warehousesOfCity={warehousesOfCity}
            selectedWarehouse={selectedWarehouse}
            selectedCityName={selectedCity.Description}
            selectedMethod={selectedMethod}
            handleSubmit={handleSubmit}
          />
        )}
        {isCourier && isReady && (
          <CourierDeliverySection
            streetsOfCity={streetsOfCity}
            selectedStreet={selectedStreet}
            selectedCityName={selectedCity.Description}
            selectedMethod={selectedMethod}
            handleSubmit={handleSubmit}
          />
        )}
      </Box>
    </Box>
  );
}
