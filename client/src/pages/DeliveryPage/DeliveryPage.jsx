import { Container, Flex, Section } from '@radix-ui/themes';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartData } from '../../redux/cart/selectors.js';
import { useEffect } from 'react';
import { fetchDeliveryCities, fetchDeliveryCost } from '../../redux/delivery/operations.js';
import {
  selectDeliveryAddress,
  selectDeliveryCities,
  selectDeliveryCost,
  selectDeliveryWarehouseTypes,
  selectFilterCities,
  selectWarehousesOfCity,
} from '../../redux/delivery/selectors.js';

import DeliveryOptions from '../../components/DeliveryOptions/DeliveryOptions.jsx';
import OrderSummary from '../../components/OrderSummary/OrderSummary.jsx';
import CheckoutCart from '../../components/CheckoutCart/CheckoutCart.jsx';

import css from './DeliveryPage.module.css';

export default function DeliveryPage() {
  const dispatch = useDispatch();
  const cartData = useSelector(selectCartData);
  const deliveryCities = useSelector(selectDeliveryCities);
  const filterParams = useSelector(selectFilterCities);
  const deliveryAddress = useSelector(selectDeliveryAddress);
  const warehouseTypes = useSelector(selectDeliveryWarehouseTypes);
  const warehousesOfCity = useSelector(selectWarehousesOfCity);
  const deliveryCost = useSelector(selectDeliveryCost);

  const { products, totalPrice, totalQuantityProducts } = cartData;
  const { selectedCity } = deliveryAddress;

  useEffect(() => {
    dispatch(fetchDeliveryCities(filterParams));
  }, [dispatch, filterParams]);

  useEffect(() => {
    if (!selectedCity?.Ref) return;

    const baseOptions = {
      cost: totalPrice,
      amount: totalQuantityProducts,
      cityRecipient: selectedCity.Ref,
    };

    Promise.all([
      dispatch(fetchDeliveryCost({ ...baseOptions, serviceType: 'WarehouseWarehouse' })),
      dispatch(fetchDeliveryCost({ ...baseOptions, serviceType: 'WarehouseDoors' })),
    ]);
  }, [dispatch, totalQuantityProducts]);

  return (
    <Section size="4">
      <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
        <Flex justify="between" mb="7">
          <DeliveryOptions
            deliveryCities={deliveryCities}
            deliveryAddress={deliveryAddress}
            warehouseTypes={warehouseTypes}
            warehousesOfCity={warehousesOfCity}
            totalPrice={totalPrice}
            totalQuantityProducts={totalQuantityProducts}
            deliveryCost={deliveryCost}
          />
          {totalQuantityProducts > 0 && (
            <Flex direction="column">
              <OrderSummary totalPrice={totalPrice} totalQuantityProducts={totalQuantityProducts} isDelivery="true" />
              <CheckoutCart products={products} />
            </Flex>
          )}
        </Flex>
      </Container>
    </Section>
  );
}
