import { Box, Heading } from '@radix-ui/themes';

import css from './DeliveryCourierForm.module.css';

export default function DeliveryCourierForm() {
  return (
    <Box>
      <Heading as="h2" size="7" mb="3" weight="bold">
        DELIVERY ADDRESS
      </Heading>
      <p className={css.description}>We use your contact information only to inform you about your order.</p>
    </Box>
  );
}
