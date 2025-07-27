import { Box, Heading, Text } from '@radix-ui/themes';

import css from './AccountCartSummary.module.css';
import AccountCartSummaryProductsList from '../AccountCartSummaryProductsLiist/AccountCartSummaryProductsList.jsx';
import LinkButton from '../LinkButton/LinkButton.jsx';

export default function AccountCartSummary({ products, totalQuantityProducts }) {
  return (
    <Box className={css.wrapper} mb="8">
      <Heading className={css.title} as="h3" size="4" weight="bold">
        In your bag
      </Heading>
      <Text as="p" size="3" mb="4">
        TOTAL: ({totalQuantityProducts} items)
      </Text>
      <AccountCartSummaryProductsList products={products} />
      <LinkButton to="/cart" text="go to bag" variant="secondary" />
    </Box>
  );
}
