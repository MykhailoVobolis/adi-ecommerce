import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProductsByCategory } from '../../redux/products/operations.js';
import { selectLoading, selectProductsByCategory } from '../../redux/products/selectors.js';
import { Container, Heading, Section } from '@radix-ui/themes';

import ProductsList from '../../components/ProductsList/ProductsList.jsx';
import Loader from '../../components/Loader/Loader.jsx';

import css from './ProductCategoryPage.module.css';

export default function ProductCategoryPage() {
  const dispatch = useDispatch();
  const { category } = useParams();

  const isLoading = useSelector(selectLoading);

  const byCategory = useSelector(selectProductsByCategory);

  useEffect(() => {
    if (category) {
      dispatch(fetchProductsByCategory(category));
    }
  }, [category, dispatch]);

  const products = byCategory?.[category]?.data || [];

  return isLoading ? (
    <Loader heightValue={'calc(100vh - 64px)'} />
  ) : (
    <Section size="4">
      <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
        <Heading as="h1" size="7" mb="4" weight="bold">
          {category.toUpperCase()} Products
        </Heading>
        <ProductsList products={products} category={category} />
      </Container>
    </Section>
  );
}
