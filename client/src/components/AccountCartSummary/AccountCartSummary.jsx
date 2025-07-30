import { Box, Heading, Text } from '@radix-ui/themes';

import css from './AccountCartSummary.module.css';
import AccountCartSummaryProductsList from '../AccountCartSummaryProductsLiist/AccountCartSummaryProductsList.jsx';
import LinkButton from '../LinkButton/LinkButton.jsx';

export default function AccountCartSummary({ products, totalQuantityProducts }) {
  return (
    <Box className={css.wrapper} mb="8">
      <Heading className={css.title} as="h3" size="4" mb="4" weight="bold">
        {totalQuantityProducts > 0 ? 'In your bag' : 'your bag is empty'}
      </Heading>
      <Text as="p" size="3" mb="4">
        TOTAL: ({totalQuantityProducts} items)
      </Text>
      {totalQuantityProducts <= 0 && (
        <Text as="p" size="3" mb="8">
          Once you add something to your bag, it will appear here. Ready to get started?
        </Text>
      )}
      {totalQuantityProducts > 0 && <AccountCartSummaryProductsList products={products} />}
      {totalQuantityProducts > 0 ? (
        <LinkButton to="/cart" text="go to bag" variant="secondary" />
      ) : (
        <LinkButton to="/" text="get started" variant="secondary" />
      )}
    </Box>
  );
}
