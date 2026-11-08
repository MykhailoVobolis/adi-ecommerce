import { Box, Container, Flex, Section } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { selectCartData } from '../../redux/cart/selectors.js';

import CartProductsList from '../../components/CartProductsList/CartProductsList.jsx';
import OrderSummary from '../../components/OrderSummary/OrderSummary.jsx';
import CheckoutButton from '../../components/CheckoutButton/CheckoutButton.jsx';
import CartHeaderInfo from '../../components/CartHeaderInfo/CartHeaderInfo.jsx';

import css from './CartPage.module.css';

export default function CartPage() {
  const cartData = useSelector(selectCartData);
  const { products, totalPrice, totalQuantityProducts } = cartData;

  return (
    <Section size="4" className={css.cartSection}>
      <Container className={css.cartContainer} size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
        <Flex className={css.cartLayout} justify="between">
          <Box className={css.productsColumn}>
            <CartHeaderInfo totalQuantityProducts={totalQuantityProducts} totalPrice={totalPrice} />
            <CartProductsList products={products} />
          </Box>
          {totalQuantityProducts > 0 && (
            <OrderSummary totalPrice={totalPrice} totalQuantityProducts={totalQuantityProducts} />
          )}
        </Flex>
        {totalQuantityProducts > 0 && (
          <Box className={css.desktopCheckout}>
            <CheckoutButton />
          </Box>
        )}
      </Container>
    </Section>
  );
}
