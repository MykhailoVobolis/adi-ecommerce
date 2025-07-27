import { Heading, Text } from '@radix-ui/themes';

import LinkButton from '../LinkButton/LinkButton.jsx';

import css from './CartHeaderInfo.module.css';

export default function CartHeaderInfo({ totalQuantityProducts, totalPrice }) {
  return (
    <>
      {totalQuantityProducts > 0 ? (
        <>
          <Heading as="h1" size="8" mb="4" weight="bold">
            YOUR BAG
          </Heading>
          <Text as="p" size="3" mb="2">
            TOTAL: ({totalQuantityProducts} items) <span className={css.totalPrise}>${totalPrice.toFixed(2)}</span>
          </Text>
          <Text as="p" size="3" mb="7">
            Items in your bag are not reserved — check out now to make them yours.
          </Text>
        </>
      ) : (
        <>
          <Heading as="h1" size="8" mt="9" mb="4" weight="bold">
            YOUR BAG IS EMPTY
          </Heading>
          <Text as="p" size="3" mb="5">
            Once you add something to your bag, it will appear here. Ready to get started?
          </Text>
          <LinkButton to="/" text="get started" />
        </>
      )}
    </>
  );
}
