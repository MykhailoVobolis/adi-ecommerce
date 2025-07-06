import { Box, Flex, Heading, Separator } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectDeliveryCost } from '../../redux/delivery/selectors.js';

import CheckoutButton from '../CheckoutButton/CheckoutButton.jsx';
import SummaryItem from '../SummaryItem/SummaryItem.jsx';

import css from './OrderSummary.module.css';

export default function OrderSummary({ totalPrice, totalQuantityProducts, onCheckout, discount = 0, isDelivery }) {
  const location = useLocation();
  const deliveryCost = useSelector(selectDeliveryCost);
  const { selectedDeliveryCost } = deliveryCost;

  const isDeliveryPage = location.pathname === '/delivery';

  let totalWithDelivery;

  if (isDeliveryPage && selectedDeliveryCost) {
    const deliveryCost = parseFloat(selectedDeliveryCost.replace(',', '.'));
    totalWithDelivery = (totalPrice + deliveryCost).toFixed(2);
  }

  return (
    <Flex direction="column" gap="7">
      <Box className={css.orderSummaryWrapper}>
        <Heading className={css.titleOrderSummary} as="h2" size="5" weight="bold" mb="5">
          {isDelivery ? <span>Your Order</span> : <span>Order Summary</span>}
        </Heading>
        <SummaryItem
          label={`${totalQuantityProducts} ${totalQuantityProducts === 1 ? 'item' : 'items'}`}
          value={`$${totalPrice.toFixed(2)}`}
        />
        <SummaryItem label="Discount" value={`$${discount.toFixed(2)}`} />
        {isDeliveryPage && (
          <SummaryItem
            label="Delivery"
            value={totalPrice >= 300 ? 'FREE' : selectedDeliveryCost ? `$${selectedDeliveryCost}` : '–'}
          />
        )}
        <Separator my="4" size="2" />
        <SummaryItem
          label="Total"
          value={`$${isDeliveryPage && totalWithDelivery && totalPrice < 300 ? totalWithDelivery : totalPrice}`}
          bold
        />
      </Box>
      {!isDelivery && <CheckoutButton onCheckout={onCheckout} />}
    </Flex>
  );
}
