import * as RadioGroup from '@radix-ui/react-radio-group';
import { Flex, Text } from '@radix-ui/themes';
import { SiApplepay } from 'react-icons/si';
import { PiMoneyThin } from 'react-icons/pi';

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
        <Flex className={css.RadioItem}>
          <Flex gap="4">
            <RadioGroup.Item value="online_card" className={css.Item} /> Payment by card online
          </Flex>
          <SiApplepay size={48} />
        </Flex>
      </Text>

      {selectedDeliveryMethod !== 'postomat' && (
        <Text as="label" size="3" weight="bold">
          <Flex className={css.RadioItem}>
            <Flex gap="4">
              <RadioGroup.Item value="on_delivery" className={css.Item} /> Payment upon receipt
            </Flex>
            <PiMoneyThin size={48} />
          </Flex>
        </Text>
      )}
    </RadioGroup.Root>
  );
}
