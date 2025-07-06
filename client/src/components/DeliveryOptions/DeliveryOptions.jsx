import { useEffect, useRef } from 'react';
import { Box, Heading } from '@radix-ui/themes';
import { LiaTruckSolid } from 'react-icons/lia';
import { LiaMapMarkerSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import { selectDeliveryAddress, selectFilterWarehouses, selectLoading } from '../../redux/delivery/selectors.js';
import {
  setFilterWarehouses,
  setSelectedDeliveryCost,
  setSelectedMethod,
  setSelectedWarehouse,
} from '../../redux/delivery/slice.js';
import { fetchWarehousesOfCity } from '../../redux/delivery/operations.js';

import DeliveryBranchForm from '../DeliveryBranchForm/DeliveryBranchForm.jsx';
import DeliveryCourierForm from '../DeliveryCourierForm/DeliveryCourierForm.jsx';
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
  totalPrice,
  totalQuantityProducts,
  deliveryCost,
}) {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const { selectedMethod } = useSelector(selectDeliveryAddress);

  const { selectedCity, selectedWarehouse } = deliveryAddress;
  const { hasBranch, hasPostomat, hasCourier } = warehouseTypes;
  const { cities, totalCount } = deliveryCities;
  const { courierDeliveryCost, pickupPointCost } = deliveryCost;

  const formRef = useRef(null);

  const filteredOptions = options.filter((option) => {
    if (option.value === 'branch') return hasBranch;
    if (option.value === 'postomat') return hasPostomat;
    if (option.value === 'courier') return hasCourier;
    return false;
  });

  const isReady = hasBranch !== null || hasPostomat !== null || hasCourier !== null;
  const isBranch = selectedMethod === 'branch';
  const isPostomat = selectedMethod === 'postomat';
  const isCourier = selectedMethod === 'courier';

  const { name, page } = useSelector(selectFilterWarehouses);

  useEffect(() => {
    if (!selectedCity?.Ref || selectedMethod === 'courier' || !selectedMethod) return;

    const filterParams = {
      page,
      cityRef: selectedCity.Ref,
      CategoryOfWarehouse: selectedMethod,
      warehouseName: name,
    };
    dispatch(fetchWarehousesOfCity(filterParams));
  }, [dispatch, page, name, selectedMethod, selectedCity?.Ref]);

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
      dispatch(setSelectedWarehouse(null));
      dispatch(setFilterWarehouses({ name: '', page: 1 }));
    } else {
      // в противному випадку викликати запит на список вулиць
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
        <p className={css.noDeliveryMessage}>No delivery options available</p>
      )}
      <Box ref={formRef}>
        {(isBranch || isPostomat) && isReady && (
          <DeliveryBranchForm
            warehousesOfCity={warehousesOfCity}
            selectedWarehouse={selectedWarehouse}
            selectedCityName={selectedCity.Description}
            selectedMethod={selectedMethod}
          />
        )}
        {isCourier && isReady && <DeliveryCourierForm />}
      </Box>
    </Box>
  );
}
