import * as RadioGroup from '@radix-ui/react-radio-group';
import { Flex, Text } from '@radix-ui/themes';

import css from './PaymentMethodSelector.module.css';

export default function PaymentMethodSelector({ selectedPaymentMethod, handleChange, selectedDeliveryMethod }) {
  return (
    <RadioGroup.Root
      className={css.RadioGroupRoot}
      value={selectedPaymentMethod}
      onValueChange={handleChange}
      aria-label="Payment selection"
    >
      <Text as="label" size="3" weight="bold">
        <Flex gap="4" className={css.RadioItem}>
          <RadioGroup.Item value="online_card" className={css.Item} /> Payment by card online
        </Flex>
      </Text>

      {selectedDeliveryMethod !== 'postomat' && (
        <Text as="label" size="3" weight="bold">
          <Flex gap="4" className={css.RadioItem}>
            <RadioGroup.Item value="on_delivery" className={css.Item} /> Payment upon receipt
          </Flex>
        </Text>
      )}
    </RadioGroup.Root>
  );
}
