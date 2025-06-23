import { Box, Heading } from '@radix-ui/themes';
import { useState } from 'react';
import { LiaTruckSolid } from 'react-icons/lia';
import { LiaMapMarkerSolid } from 'react-icons/lia';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../redux/delivery/selectors.js';

import CitySelect from '../CitySelect/CitySelect.jsx';
import DeliveryMethodSelector from '../DeliveryMethodSelector/DeliveryMethodSelector.jsx';
import Loader from '../Loader/Loader.jsx';

import css from './DeliveryOptions.module.css';

const options = [
  {
    value: 'branch',
    title: 'Доставка на відділення «Нова пошта»',
    price: 'Безкоштовно',
    infoText: 'Безкоштовна доставка при замовленні від 2500 грн.',
    checkIcon: <LiaMapMarkerSolid size={24} />,
  },
  {
    value: 'courier',
    title: 'Кур’єрська доставка «Нова пошта»',
    price: 'Безкоштовно',
    infoText: 'Безкоштовна доставка при замовленні від 2500 грн.',
    checkIcon: <LiaTruckSolid size={24} />,
  },
  {
    value: 'postomat',
    title: 'Доставка в поштомат «Нова пошта»',
    price: 'Безкоштовно',
    infoText: 'Безкоштовна доставка при замовленні від 2500 грн.',
    checkIcon: <LiaMapMarkerSolid size={24} />,
  },
];

export default function DeliveryOptions({ cities, totalCount, deliveryAddress, warehouseTypes }) {
  const [selectedMethod, setSelectedMethod] = useState('');
  const isLoading = useSelector(selectLoading);

  const { selectedCity } = deliveryAddress;
  const { hasBranch, hasPostomat, hasCourier } = warehouseTypes;

  const filteredOptions = options.filter((option) => {
    if (option.value === 'branch') return hasBranch;
    if (option.value === 'postomat') return hasPostomat;
    if (option.value === 'courier') return hasCourier;
    return false;
  });

  const isReady = hasBranch !== null || hasPostomat !== null || hasCourier !== null;

  const handleSelect = (value) => {
    setSelectedMethod(value);
    console.log('Selected delivery:', value);
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
        setSelectedMethod={setSelectedMethod}
      />
      <p className={css.deliveryOptionDescription}>
        The specification and delivery term depend on the delivery method. At the next moment you can clarify this
        information.
      </p>
      {isLoading && <Loader heightValue={'100%'} />}
      {isReady && filteredOptions.length > 0 && (
        <DeliveryMethodSelector options={filteredOptions} handleSelect={handleSelect} selectedMethod={selectedMethod} />
      )}
      {isReady && filteredOptions.length === 0 && (
        <p className={css.noDeliveryMessage}>No delivery options available</p>
      )}
    </Box>
  );
}
