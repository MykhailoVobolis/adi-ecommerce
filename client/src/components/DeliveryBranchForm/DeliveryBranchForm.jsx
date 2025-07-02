import { Box, Heading } from '@radix-ui/themes';

import DeliveryForm from '../DeliveryForm/DeliveryForm.jsx';

import css from './DeliveryBranchForm.module.css';

export default function DeliveryBranchForm({ warehousesOfCity, selectedWarehouse, selectedCityName }) {
  const { warehouses, totalCount } = warehousesOfCity;

  const handleSubmit = (data) => {
    console.log('Form data:', data);
    // Тут можеш робити dispatch або щось ще
  };

  return (
    <Box>
      <Heading as="h2" size="7" mb="3" weight="bold">
        BRANCH ADDRESS
      </Heading>
      <p className={css.description}>Please specify the address where it is convenient for you to pick up the order.</p>
      <DeliveryForm
        onSubmit={handleSubmit}
        warehouses={warehouses}
        selectedWarehouse={selectedWarehouse}
        totalCount={totalCount}
        selectedCityName={selectedCityName}
      />
    </Box>
  );
}
