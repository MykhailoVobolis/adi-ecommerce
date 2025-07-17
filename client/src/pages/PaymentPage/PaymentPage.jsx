import { useSelector } from 'react-redux';
import { Box, Container, Flex, Heading, Section } from '@radix-ui/themes';
import { selectCartData } from '../../redux/cart/selectors.js';
import { selectCustomer, selectDeliveryAddress, selectDeliveryCost } from '../../redux/checkout/selectors.js';

import CheckoutCart from '../../components/CheckoutCart/CheckoutCart.jsx';
import OrderSummary from '../../components/OrderSummary/OrderSummary.jsx';
import DeliverySummary from '../../components/DeliverySummary/DeliverySummary.jsx';

import css from './PaymentPage.module.css';

export default function PaymentPage() {
  const cartData = useSelector(selectCartData);
  const deliveryAddress = useSelector(selectDeliveryAddress);
  const customerData = useSelector(selectCustomer);
  const selectedDeliveryCost = useSelector(selectDeliveryCost);

  const { products, totalPrice, totalQuantityProducts } = cartData;
  const { phone } = customerData;

  return (
    <Section size="4">
      <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
        <Flex justify="between" mb="7">
          <Box className={css.optionWrapper}>
            <Heading as="h1" size="7" mb="4" weight="bold">
              PAYMENT AND ORDER CONFIRMATION
            </Heading>
          </Box>
          {totalQuantityProducts > 0 && (
            <Flex direction="column">
              <OrderSummary totalPrice={totalPrice} totalQuantityProducts={totalQuantityProducts} isDelivery="true" />
              <CheckoutCart products={products} />
              <DeliverySummary
                customerPhone={phone}
                deliveryAddress={deliveryAddress}
                selectedDeliveryCost={selectedDeliveryCost}
              />
            </Flex>
          )}
        </Flex>
      </Container>
    </Section>
  );
}
