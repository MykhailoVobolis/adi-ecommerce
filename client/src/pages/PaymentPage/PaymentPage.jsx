import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { sendOrder } from '../../redux/orders/operations.js';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import { clearLocalCart } from '../../redux/cart/slice.js';
import { getUserCart } from '../../redux/cart/operations.js';

import CheckoutCart from '../../components/CheckoutCart/CheckoutCart.jsx';
import OrderSummary from '../../components/OrderSummary/OrderSummary.jsx';
import DeliverySummary from '../../components/DeliverySummary/DeliverySummary.jsx';
import PaymentMethodSelector from '../../components/PaymentMethodSelector/PaymentMethodSelector.jsx';
import ActionButton from '../../components/ActionButton/ActionButton.jsx';

import css from './PaymentPage.module.css';

export default function PaymentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedPaymentMethod = useSelector(selectPaymentMethod);
  const cartData = useSelector(selectCartData);
  const deliveryAddress = useSelector(selectDeliveryAddress);
  const customerData = useSelector(selectCustomer);
  const selectedDeliveryCost = useSelector(selectDeliveryCost);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { selectedMethod: selectedDeliveryMethod } = useSelector(selectDeliveryAddress);

  const { products, totalPrice, totalQuantityProducts } = cartData;
  const { firstName, lastName, phone, email } = customerData;
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

    const formattedProducts = products.map(({ _id, ...rest }) => ({
      productId: _id,
      ...rest,
    }));

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
      products: formattedProducts,
      totalQuantityProducts,
      totalPrice,
    };

    dispatch(sendOrder(orderData))
      .unwrap()
      .then((res) => {
        const { orderId, checkoutUrl } = res.data;

        if (selectedPaymentMethod === 'on_delivery') {
          if (isLoggedIn) {
            dispatch(getUserCart())
              .unwrap()
              .catch(() => dispatch(clearLocalCart()));
          } else {
            dispatch(clearLocalCart());
          }

          navigate(`/order-confirmation/${orderId}`);
        }

        if (selectedPaymentMethod === 'online_card') {
          if (isLoggedIn) {
            dispatch(getUserCart())
              .unwrap()
              .then(() => {
                // Онлайн-оплата → редірект на Fondy checkout
                window.location.href = checkoutUrl;
              })
              .catch(() => dispatch(clearLocalCart()));
          } else {
            dispatch(clearLocalCart());
            window.location.href = checkoutUrl;
          }
        }
      })
      .catch((error) => {
        if (error.message !== 'Access token expired') {
          toast.error(error.message);
        }
      });
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
            {selectedPaymentMethod && (
              <ActionButton
                label={selectedPaymentMethod === 'on_delivery' ? 'place order' : 'pay online'}
                handleClick={handlePlaceOrder}
              />
            )}
          </Box>
          {totalQuantityProducts > 0 && (
            <Flex direction="column">
              <OrderSummary totalPrice={totalPrice} totalQuantityProducts={totalQuantityProducts} isDelivery="true" />
              <CheckoutCart products={products} />
              <DeliverySummary
                totalPrice={totalPrice}
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
