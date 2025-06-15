import { Box, Heading } from '@radix-ui/themes';

import CitySelect from '../CitySelect/CitySelect.jsx';

import css from './DeliveryOptions.module.css';

// const cities = ['Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро', 'Чернівці', 'Тернопіль'];

export default function DeliveryOptions({ cities, deliveryAddress }) {
  const { selectedCity } = deliveryAddress;

  return (
    <Box className={css.optionWrapper}>
      <Heading as="h1" size="7" mb="4" weight="bold">
        CHOOSE A DELIVERY METHOD
      </Heading>
      {/* <Heading as="h1" size="8" mt="9" mb="4" weight="bold">
          CHOOSE A DELIVERY ADDRESS
        </Heading> */}
      <CitySelect cities={cities} selectedCity={selectedCity} />
    </Box>
  );
}
