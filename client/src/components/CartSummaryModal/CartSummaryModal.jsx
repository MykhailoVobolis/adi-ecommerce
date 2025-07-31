import { Box, Flex, Separator, Text } from '@radix-ui/themes';

import SummaryItem from '../SummaryItem/SummaryItem.jsx';
import LinkButton from '../LinkButton/LinkButton.jsx';
import CancelButton from '../CancelButton/CancelButton.jsx';

import css from './CartSummaryModal.module.css';

export default function CartSummaryModal({ cartData, closeModal }) {
  const { totalPrice, totalQuantityProducts } = cartData;

  return (
    <Flex className={css.cartSummaryWrapper} direction="column" gap="4">
      <Box>
        <Text className={css.title} as="p" size="4" weight="bold">
          YOUR BAG
        </Text>
        <Text as="p">
          {totalQuantityProducts} {totalQuantityProducts === 1 ? 'item' : 'items'}
        </Text>
        <SummaryItem label={'Total Product Cost:'} value={`$${totalPrice.toFixed(2)}`} />
        <Separator my="2" size="4" />
        <SummaryItem label="Total:" value={`$${totalPrice.toFixed(2)}`} bold />
      </Box>
      <LinkButton to="/cart" text="view bag" variant="cartSummaryModal" />
      <CancelButton label="continue shopping" handleCancel={closeModal} variant="cartSummaryModal" />
    </Flex>
  );
}
