import { Container, Heading } from '@radix-ui/themes';

import css from './AccountFavoritesPage.module.css';

export default function AccountFavoritesPage() {
  return (
    <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
      <Heading as="h2" size="7" mb="6" weight="bold">
        MY WISHLIST
      </Heading>
    </Container>
  );
}
