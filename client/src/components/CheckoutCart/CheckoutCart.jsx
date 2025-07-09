import { Box, Separator } from '@radix-ui/themes';

import CartProductsList from '../CartProductsList/CartProductsList.jsx';

import css from './CheckoutCart.module.css';

export default function CheckoutCart({ products }) {
  return (
    <Box>
      <Separator my="6" size="4" />
      <CartProductsList products={products} isCart={false} />
      <Separator my="6" size="4" />
    </Box>
  );
}
