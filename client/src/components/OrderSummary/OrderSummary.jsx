import { Box, Flex, Heading, Separator } from '@radix-ui/themes';

import CheckoutButton from '../CheckoutButton/CheckoutButton.jsx';
import SummaryItem from '../SummaryItem/SummaryItem.jsx';

import css from './OrderSummary.module.css';

export default function OrderSummary({ totalPrice, totalQuantityProducts, onCheckout, discount = 0 }) {
  return (
    <Flex direction="column" gap="7">
      <Box className={css.orderSummaryWrapper}>
        <Heading className={css.titleOrderSummary} as="h2" size="5" weight="bold" mb="5">
          Order Summary
        </Heading>
        <SummaryItem
          label={`${totalQuantityProducts} ${totalQuantityProducts === 1 ? 'item' : 'items'}`}
          value={`$${totalPrice.toFixed(2)}`}
        />
        <SummaryItem label="Discount" value={`$${discount.toFixed(2)}`} />
        <SummaryItem label="Delivery" value="FREE" />
        <Separator my="4" size="2" />
        <SummaryItem label="Total" value={`$${totalPrice}`} bold />
      </Box>
      <CheckoutButton onCheckout={onCheckout} />
    </Flex>
  );
}
