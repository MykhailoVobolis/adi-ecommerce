import { Heading, Text } from '@radix-ui/themes';

import LinkButton from '../LinkButton/LinkButton.jsx';

import css from './CartHeaderInfo.module.css';

export default function CartHeaderInfo({ totalQuantityProducts, totalPrice }) {
  return (
    <>
      {totalQuantityProducts > 0 ? (
        <div className={css.cartHeader}>
          <div className={css.titleRow}>
            <Heading as="h1" size="8" weight="bold" className={`${css.title} responsivePageHeading responsivePageHeading--8`}>
              YOUR BAG
            </Heading>
          </div>
          <Text as="p" size="3" className={css.desktopTotal}>
            TOTAL: ({totalQuantityProducts} items){' '}
            <span className={css.totalPrice}>${totalPrice.toFixed(2)}</span>
          </Text>
          <Text as="p" size="3" className={css.description}>
            Items in your bag are not reserved — check out now to make them yours.
          </Text>
        </div>
      ) : (
        <>
          <Heading as="h1" size="8" mb="4" weight="bold" className={`${css.emptyTitle} responsivePageHeading responsivePageHeading--8`}>
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
