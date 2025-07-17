import { Box, Flex, Heading, Separator } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectDeliveryCost } from '../../redux/checkout/selectors.js';

import CheckoutButton from '../CheckoutButton/CheckoutButton.jsx';
import SummaryItem from '../SummaryItem/SummaryItem.jsx';
import EditLink from '../EditLink/EditLink.jsx';

import css from './OrderSummary.module.css';

export default function OrderSummary({ totalPrice, totalQuantityProducts, discount = 0, isDelivery }) {
  const location = useLocation();
  const selectedDeliveryCost = useSelector(selectDeliveryCost);

  const shouldShowDeliveryCost = location.pathname === '/delivery' || location.pathname === '/payment';

  let totalWithDelivery;

  if (shouldShowDeliveryCost && selectedDeliveryCost) {
    const deliveryCost = parseFloat(selectedDeliveryCost.replace(',', '.'));
    totalWithDelivery = (totalPrice + deliveryCost).toFixed(2);
  }

  return (
    <Flex direction="column" gap="7">
      <Box className={css.orderSummaryWrapper}>
        <Flex align="center" justify="between" mb="5">
          <Heading className={css.title} as="h2" size="5" weight="bold">
            {isDelivery ? <span>Your Order</span> : <span>Order Summary</span>}
          </Heading>
          {isDelivery && <EditLink navTo="/cart" />}
        </Flex>
        <SummaryItem
          label={`${totalQuantityProducts} ${totalQuantityProducts === 1 ? 'item' : 'items'}`}
          value={`$${totalPrice.toFixed(2)}`}
        />
        <SummaryItem label="Discount" value={`$${discount.toFixed(2)}`} />
        {shouldShowDeliveryCost && (
          <SummaryItem
            label="Delivery"
            value={selectedDeliveryCost ? (totalPrice >= 300 ? 'FREE' : `$${selectedDeliveryCost}`) : '–'}
          />
        )}
        <Separator my="4" size="2" />
        <SummaryItem
          label="Total"
          value={`$${shouldShowDeliveryCost && totalWithDelivery && totalPrice < 300 ? totalWithDelivery : totalPrice}`}
          bold
        />
      </Box>
      {!isDelivery && <CheckoutButton />}
    </Flex>
  );
}
