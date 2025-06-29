import { Box, Heading } from '@radix-ui/themes';

import css from './DeliveryBranchForm.module.css';
import WarehouseSelect from '../WarehouseSelect/WarehouseSelect.jsx';

export default function DeliveryBranchForm({ warehousesOfCity, selectedWarehouse }) {
  const { warehouses, totalCount } = warehousesOfCity;

  return (
    <Box>
      <Heading as="h2" size="7" mb="3" weight="bold">
        BRANCH ADDRESS
      </Heading>
      <p className={css.description}>Please specify the address where it is convenient for you to pick up the order.</p>
      <WarehouseSelect warehouses={warehouses} totalCount={totalCount} selectedWarehouse={selectedWarehouse} />
    </Box>
  );
}
