import { Outlet } from 'react-router-dom';
import { Container, Flex, Section } from '@radix-ui/themes';

import AccountSidebar from '../AccountSidebar/AccountSidebar.jsx';

import css from './AccountLayout.module.css';

export default function AccountLayout() {
  return (
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
