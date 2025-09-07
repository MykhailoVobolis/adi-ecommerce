import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Heading, Text } from '@radix-ui/themes';
import { fetchOdersByUserId } from '../../redux/orders/operations.js';
import { selectIsLoading, selectPaginationOrders, selectUserOrders } from '../../redux/orders/selectors.js';
import { setNewPage } from '../../redux/orders/slice.js';

import Loader from '../../components/Loader/Loader.jsx';
import OrdersAccordion from '../../components/OrdersAccordion/OrdersAccordion.jsx';
import LinkButton from '../../components/LinkButton/LinkButton.jsx';
import ProductsPaginationBar from '../../components/ProductsPaginationBar/ProductsPaginationBar.jsx';

import css from './AccountOrdersHistoryPage.module.css';

export default function AccountOrdersHistoryPage() {
  const dispatch = useDispatch();
  const userOrders = useSelector(selectUserOrders);
  const isLoading = useSelector(selectIsLoading);
  const { hasNextPage, hasPreviousPage, page, perPage, totalPages } = useSelector(selectPaginationOrders);

  useEffect(() => {
    const data = {
      page,
      perPage,
    };

    dispatch(fetchOdersByUserId(data))
      .unwrap()
      .catch((error) => {
        if (error.name === 'ConditionError') return;
        toast.error(error.message);
      });
  }, [dispatch, page, perPage]);

  const handlePrevClick = () => {
    const newPage = page - 1;
    dispatch(setNewPage(newPage));
  };

  const handleNextClick = () => {
    const newPage = page + 1;
    dispatch(setNewPage(newPage));
  };

  return isLoading ? (
    <Loader heightValue={'calc(100vh - 224px)'} />
  ) : (
    <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
      <Box className={css.wrapper}>
        {userOrders.length > 0 ? (
          <>
            <Heading as="h2" size="7" mb="6" weight="bold">
              ORDERS HISTORY
            </Heading>
            <OrdersAccordion orders={userOrders} />
            {(hasNextPage || hasPreviousPage) && (
              <ProductsPaginationBar
                page={page}
                totalPages={totalPages}
                handlePrevClick={handlePrevClick}
                handleNextClick={handleNextClick}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
              />
            )}
          </>
        ) : (
          <>
            <Heading as="h2" size="7" mb="3" weight="bold">
              NO ORDERS YET
            </Heading>
            <Text as="p" mb="5">
              Ready to get started?
            </Text>
            <LinkButton to="/" text="Start Shopping" variant="shopping" />
          </>
        )}
      </Box>
    </Container>
  );
}
