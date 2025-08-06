import { Box, Container, Flex, Heading, Section, Text } from '@radix-ui/themes';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchOrderById } from '../../redux/orders/operations.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectConfirmedOrder, selectIsLoading } from '../../redux/orders/selectors.js';

import OrderSummary from '../../components/OrderSummary/OrderSummary.jsx';
import CheckoutCart from '../../components/CheckoutCart/CheckoutCart.jsx';
import Loader from '../../components/Loader/Loader.jsx';

import css from './OrderConfirmationPage.module.css';

export default function OrderConfirmationPage() {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const isLoading = useSelector(selectIsLoading);
  const confirmedOrder = useSelector(selectConfirmedOrder);
  const { _id, createdAt, contact, products, delivery, totalQuantityProducts, totalPrice } = confirmedOrder;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const orderData = formatDate(createdAt);

  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, [orderId, dispatch]);

  return isLoading ? (
    <Loader heightValue={'calc(100vh - 64px)'} />
  ) : (
    <Section size="4">
      <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
        <Flex justify="between" mb="7">
          <Box className={css.optionWrapper}>
            <Heading as="h2" size="8" mb="4" weight="bold">
              THANK YOU FOR YOUR ORDER
            </Heading>

            {Object.keys(confirmedOrder).length > 0 && (
              <>
                <Text as="p" size="3" mb="5">
                  An email confirmation has been sent to <span className={css.email}>{contact.email}</span>
                </Text>
                <Box className={css.wrapper}>
                  <Text className={css.title} as="p" size="4" mb="3" weight="bold">
                    Delivery address
                  </Text>
                  <Text as="p" mb="2" weight="bold">
                    {contact.firstName} {contact.lastName}
                  </Text>
                  <Text as="p" mb="1">
                    {delivery.address}
                  </Text>
                  <Text as="p" mb="5">
                    {contact.phone}
                  </Text>

                  <Text className={css.title} as="p" size="4" mb="3" weight="bold">
                    DETAILS
                  </Text>
                  <Text as="p" mb="1">
                    Order ID: {_id}
                  </Text>
                  <Text as="p">Date: {orderData}</Text>
                </Box>
              </>
            )}
          </Box>

          {Object.keys(confirmedOrder).length > 0 && (
            <Flex direction="column">
              <OrderSummary totalPrice={totalPrice} totalQuantityProducts={totalQuantityProducts} isDelivery={true} />
              <CheckoutCart products={products} />
            </Flex>
          )}
        </Flex>
      </Container>
    </Section>
  );
}
