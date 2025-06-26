import { Box, Heading } from '@radix-ui/themes';

import css from './DeliveryBranchForm.module.css';

export default function DeliveryBranchForm() {
  return (
    <Box>
      <Heading as="h2" size="7" mb="3" weight="bold">
        BRANCH ADDRESS
      </Heading>
      <p className={css.description}>Please specify the address where it is convenient for you to pick up the order.</p>
    </Box>
  );
}
