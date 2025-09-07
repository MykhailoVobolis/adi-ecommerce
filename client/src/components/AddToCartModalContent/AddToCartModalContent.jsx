import { Flex, Heading } from '@radix-ui/themes';
import { useSelector } from 'react-redux';

import ProductAddedInfo from '../ProductAddedInfo/ProductAddedInfo.jsx';
import CartSummaryModal from '../CartSummaryModal/CartSummaryModal.jsx';
import { selectCartData } from '../../redux/cart/selectors.js';

import css from './AddToCartModalContent.module.css';

export default function AddToCartModalContent({ product, closeModal }) {
  const cartData = useSelector(selectCartData);

  return (
    <>
      <Heading as="h2" size="7" mb="6" weight="bold">
        SUCCESSFULLY ADDED TO BAG!
      </Heading>
      <Flex>
        <ProductAddedInfo product={product} />
        <CartSummaryModal cartData={cartData} closeModal={closeModal} />
      </Flex>
    </>
  );
}
