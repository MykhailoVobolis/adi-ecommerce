import { Container, Heading } from '@radix-ui/themes';

import css from './AccountProfilePage.module.css';

export default function AccountProfilePage() {
  return (
    <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
      <Heading as="h2" size="8" mb="4" weight="bold">
        Account Profile
      </Heading>
    </Container>
  );
}
