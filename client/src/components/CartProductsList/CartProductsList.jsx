import { nanoid } from 'nanoid';
import clsx from 'clsx';

import CartProductCard from '../CartProductCard/CartProductCard.jsx';
import OrderProductCard from '../OrderProductCard/OrderProductCard.jsx';

import css from './CartProductsList.module.css';

export default function CartProductsList({ products, isCart = true }) {
  return (
    <ul className={clsx(css.productsList, isCart && css.cartProductsList)}>
      {products.map((product) =>
        isCart ? (
          <CartProductCard key={nanoid()} product={product} />
        ) : (
          <OrderProductCard key={nanoid()} product={product} />
        ),
      )}
    </ul>
  );
}
