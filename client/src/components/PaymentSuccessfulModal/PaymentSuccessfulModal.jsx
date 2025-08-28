import { Flex, Heading, Text } from '@radix-ui/themes';
import { RiCheckboxCircleFill } from 'react-icons/ri';

import css from './PaymentSuccessfulModal.module.css';

export default function PaymentSuccessfulModal() {
  return (
    <Flex align="center" justify="center" direction="column" gap="5" pt="9" pb="9">
      <RiCheckboxCircleFill size={96} color="#16a34a" />
      <Heading as="h2" size="8" weight="bold">
        Payment Successful
      </Heading>
      <Text as="p" size="3">
        Your order has been placed and confirmed
      </Text>
    </Flex>
  );
}
