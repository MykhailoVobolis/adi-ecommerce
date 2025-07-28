import { Outlet } from 'react-router-dom';
import { Container, Flex, Section } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/cart/selectors.js';

import AccountSidebar from '../AccountSidebar/AccountSidebar.jsx';
import Loader from '../Loader/Loader.jsx';

import css from './AccountLayout.module.css';

export default function AccountLayout() {
  const isLoading = useSelector(selectIsLoading);

  return isLoading ? (
    <Loader heightValue={'calc(100vh - 64px)'} />
  ) : (
    <Section size="4">
      <Container size="4">
        <Flex justify="between">
          <main className={css.content}>
            <Outlet />
          </main>
          <AccountSidebar />
        </Flex>
      </Container>
    </Section>
  );
}
