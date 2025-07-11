import { Box, Heading, Text } from '@radix-ui/themes';

import DeliveryBranchForm from '../DeliveryBranchForm/DeliveryBranchForm.jsx';

import css from './BranchDeliverySection.module.css';

export default function BranchDeliverySection({
  warehousesOfCity,
  selectedWarehouse,
  selectedCityName,
  selectedMethod,
  handleSubmit,
}) {
  const { warehouses, totalCount } = warehousesOfCity;

  return (
    <Box>
      <Heading as="h2" size="7" mb="3" weight="bold">
        BRANCH ADDRESS
      </Heading>
      <Text as="p" mb="4">
        Please specify the address where it is convenient for you to pick up the order.
      </Text>
      <DeliveryBranchForm
        onSubmit={handleSubmit}
        warehouses={warehouses}
        selectedWarehouse={selectedWarehouse}
        totalCount={totalCount}
        selectedCityName={selectedCityName}
        selectedMethod={selectedMethod}
      />
    </Box>
  );
}
