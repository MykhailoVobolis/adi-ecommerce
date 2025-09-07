import ProductCard from '../ProductCard/ProductCard.jsx';

import css from './ProductsList.module.css';

export default function ProductsList({ products, category }) {
  return (
    <ul className={css.productsList}>
      {products.map((product) => (
        <ProductCard key={`${product._id}-${product.variantKey}`} product={product} category={category} />
      ))}
    </ul>
  );
}
