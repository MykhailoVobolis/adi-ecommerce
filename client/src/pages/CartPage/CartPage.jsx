import { Box, Container, Flex, Section } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { selectCartData } from '../../redux/cart/selectors.js';

import CartProductsList from '../../components/CartProductsList/CartProductsList.jsx';
import OrderSummary from '../../components/OrderSummary/OrderSummary.jsx';
import CheckoutButton from '../../components/CheckoutButton/CheckoutButton.jsx';
import CartHeaderInfo from '../../components/CartHeaderInfo/CartHeaderInfo.jsx';

export default function CartPage() {
  const cartData = useSelector(selectCartData);
  const { products, totalPrice, totalQuantityProducts } = cartData;

  const handleCheckout = () => {
    console.log('Proceed to checkout');
  };

  return (
    <Section size="4">
      <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
        <Flex justify="between" mb="7">
          <Box>
            <CartHeaderInfo totalQuantityProducts={totalQuantityProducts} totalPrice={totalPrice} />
            <CartProductsList products={products} />
          </Box>
          {totalQuantityProducts > 0 && (
            <OrderSummary
              totalPrice={totalPrice}
              totalQuantityProducts={totalQuantityProducts}
              onCheckout={handleCheckout}
            />
          )}
        </Flex>
        {totalQuantityProducts > 0 && <CheckoutButton onCheckout={handleCheckout} />}
      </Container>
    </Section>
  );
}
