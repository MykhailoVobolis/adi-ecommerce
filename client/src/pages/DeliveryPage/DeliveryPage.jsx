import { Container, Flex, Section } from '@radix-ui/themes';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartData } from '../../redux/cart/selectors.js';
import { useEffect } from 'react';
import { fetchDeliveryCities } from '../../redux/delivery/operations.js';
import { selectDeliveryAddress, selectDeliveryCities, selectFilterCities } from '../../redux/delivery/selectors.js';

import DeliveryOptions from '../../components/DeliveryOptions/DeliveryOptions.jsx';
import OrderSummary from '../../components/OrderSummary/OrderSummary.jsx';

import css from './DeliveryPage.module.css';

export default function DeliveryPage() {
  const dispatch = useDispatch();
  const cartData = useSelector(selectCartData);
  const deliveryCities = useSelector(selectDeliveryCities);
  const filterParams = useSelector(selectFilterCities);
  const deliveryAddress = useSelector(selectDeliveryAddress);

  const { products, totalPrice, totalQuantityProducts } = cartData;
  const { cities, totalCount } = deliveryCities;

  useEffect(() => {
    dispatch(fetchDeliveryCities(filterParams));
  }, [dispatch, filterParams]);

  return (
    <Section size="4">
      <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
        <Flex justify="between" mb="7">
          <DeliveryOptions cities={cities} deliveryAddress={deliveryAddress} />
          {totalQuantityProducts > 0 && (
            <OrderSummary totalPrice={totalPrice} totalQuantityProducts={totalQuantityProducts} isDelivery="true" />
          )}
        </Flex>
      </Container>
    </Section>
  );
}
