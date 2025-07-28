import { Container, Heading } from '@radix-ui/themes';

import css from './AccountFavoritesPage.module.css';

export default function AccountFavoritesPage() {
  return (
    <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
      <Heading as="h2" size="8" mb="4" weight="bold">
        Account Favorites
      </Heading>
    </Container>
  );
}
