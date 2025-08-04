import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProductsByCategory } from '../../redux/products/operations.js';
import { selectLoading, selectProductsByCategory } from '../../redux/products/selectors.js';
import { Container, Heading, Section } from '@radix-ui/themes';
import { setNewPage } from '../../redux/products/slice.js';

import ProductsList from '../../components/ProductsList/ProductsList.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import ProductsPaginationBar from '../../components/ProductsPaginationBar/ProductsPaginationBar.jsx';

import css from './ProductCategoryPage.module.css';

export default function ProductCategoryPage() {
  const dispatch = useDispatch();
  const { category } = useParams();

  const isLoading = useSelector(selectLoading);

  const byCategory = useSelector(selectProductsByCategory);

  const { hasNextPage, hasPreviousPage, page, perPage, totalPages } = byCategory[category];

  useEffect(() => {
    if (category) {
      const data = {
        page,
        perPage,
        category,
      };

      dispatch(fetchProductsByCategory(data));
    }
  }, [category, page, dispatch]);

  const products = byCategory?.[category]?.data || [];

  const handlePrevClick = () => {
    const newPage = page - 1;
    dispatch(setNewPage({ newPage, category }));
  };

  const handleNextClick = () => {
    const newPage = page + 1;
    dispatch(setNewPage({ newPage, category }));
  };

  return isLoading ? (
    <Loader heightValue={'calc(100vh - 64px)'} />
  ) : (
    <Section size="4">
      <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
        <Heading as="h1" size="8" mb="6" weight="bold">
          {category.toUpperCase() === 'KIDS' ? `KIDS' PRODUCTS` : `${category.toUpperCase()}'S PRODUCTS`}
        </Heading>
        {products.length > 0 && <ProductsList products={products} category={category} />}
        {products.length > 0 && (hasNextPage || hasPreviousPage) && (
          <ProductsPaginationBar
            page={page}
            totalPages={totalPages}
            handlePrevClick={handlePrevClick}
            handleNextClick={handleNextClick}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
          />
        )}
      </Container>
    </Section>
  );
}
