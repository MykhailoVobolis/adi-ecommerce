import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Flex, Heading, Section, Text } from '@radix-ui/themes';
import { selectCartData } from '../../redux/cart/selectors.js';
import {
  selectCustomer,
  selectDeliveryAddress,
  selectDeliveryCost,
  selectPaymentMethod,
} from '../../redux/checkout/selectors.js';
import { setPaymentMethod } from '../../redux/checkout/slice.js';
import { useEffect } from 'react';

import CheckoutCart from '../../components/CheckoutCart/CheckoutCart.jsx';
import OrderSummary from '../../components/OrderSummary/OrderSummary.jsx';
import DeliverySummary from '../../components/DeliverySummary/DeliverySummary.jsx';
import PaymentMethodSelector from '../../components/PaymentMethodSelector/PaymentMethodSelector.jsx';
import ActionButton from '../../components/ActionButton/ActionButton.jsx';

import css from './PaymentPage.module.css';

export default function PaymentPage() {
  const dispatch = useDispatch();
  const selectedPaymentMethod = useSelector(selectPaymentMethod);
  const cartData = useSelector(selectCartData);
  const deliveryAddress = useSelector(selectDeliveryAddress);
  const customerData = useSelector(selectCustomer);
  const selectedDeliveryCost = useSelector(selectDeliveryCost);
  const { selectedMethod: selectedDeliveryMethod } = useSelector(selectDeliveryAddress);

  const { products, totalPrice, totalQuantityProducts } = cartData;
  const { id, firstName, lastName, phone, email } = customerData;
  const {
    selectedCity,
    selectedMethod,
    selectedWarehouse: { selectedBranch, selectedPostomat },
    selectedStreet,
    buildingUnit,
    apartmentUnit,
  } = deliveryAddress;

  useEffect(() => {
    dispatch(setPaymentMethod(''));
  }, [dispatch]);

  const handleChange = (value) => {
    dispatch(setPaymentMethod(value));
  };

  const handlePlaceOrder = () => {
    const city = selectedCity
      ? `${selectedCity.SettlementTypeDescription?.slice(0, 1) || ''}. ${selectedCity.Description || ''}`
      : '';

    const isBranch = selectedMethod === 'branch';
    const isPostomat = selectedMethod === 'postomat';
    const isCourier = selectedMethod === 'courier';

    let address = '';

    if (isBranch && selectedBranch?.Description) {
      address = `${city}, ${selectedBranch.Description}`;
    } else if (isPostomat && selectedPostomat?.Description) {
      address = `${city}, ${selectedPostomat.Description}`;
    } else if (isCourier) {
      address = `${city}, ${selectedStreet?.StreetsType || ''} ${selectedStreet?.Description || ''}, ${
        buildingUnit || ''
      }, кв. ${apartmentUnit || ''}`;
    }

    const deliveryCost = totalPrice < 300 ? Number(selectedDeliveryCost) : 0;

    const orderData = {
      contact: {
        firstName,
        lastName,
        email,
        phone,
      },
      delivery: {
        method: selectedMethod,
        address,
        cost: deliveryCost,
      },
      paymentMethod: selectedPaymentMethod,
      products,
      totalPrice,
    };

    console.log('Order Data:', orderData);
  };

  return (
    <Section size="4">
      <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
        <Flex justify="between" mb="7">
          <Box className={css.optionWrapper}>
            <Heading as="h1" size="7" mb="4" weight="bold">
              PAYMENT AND ORDER CONFIRMATION
            </Heading>
            <Text as="p" size="3" mb="4">
              Choose a convenient payment method
            </Text>
            <PaymentMethodSelector
              selectedPaymentMethod={selectedPaymentMethod}
              handleChange={handleChange}
              selectedDeliveryMethod={selectedDeliveryMethod}
            />
            {selectedPaymentMethod && <ActionButton label="place order" handleClick={handlePlaceOrder} />}
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
