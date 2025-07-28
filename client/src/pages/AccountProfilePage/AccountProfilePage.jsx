import { Container, Heading, Text } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors.js';

import css from './AccountProfilePage.module.css';

export default function AccountProfilePage() {
  const { email, firstName = '', lastName = '', phone } = useSelector(selectUser);

  return (
    <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
      <Heading as="h2" size="7" mb="4" weight="bold">
        MY DETAILS
      </Heading>
      <Text as="p" mb="9">
        Feel free to edit any of your details below so your account is up to date.
      </Text>
      <Heading as="h2" size="7" mb="4" weight="bold">
        DETAILS
      </Heading>
      <Text className={css.userDetails} as="p" mb="4">
        {firstName ? `${firstName} ${lastName}` : 'name'}
      </Text>
      <Text className={css.userDetails} as="p" mb="4">
        {phone ? { phone } : 'phone'}
      </Text>
      <Text className={css.userDetails} as="p" mb="4">
        {email}
      </Text>
    </Container>
  );
}
