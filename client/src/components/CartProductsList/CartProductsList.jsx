import { nanoid } from 'nanoid';

import CartProductCard from '../CartProductCard/CartProductCard.jsx';

import css from './CartProductsList.module.css';

export default function CartProductsList({ products }) {
  return (
    <ul className={css.cartProductsList}>
      {products.map((product) => (
        <CartProductCard key={nanoid()} product={product} />
      ))}
    </ul>
  );
}
