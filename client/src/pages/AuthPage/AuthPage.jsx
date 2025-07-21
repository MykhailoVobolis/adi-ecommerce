import { Box, Container, Flex, Heading, Section, Text } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { selectEmailAvailable } from '../../redux/auth/selectors.js';

import AuthForm from '../../components/AuthForm/AuthForm.jsx';

import css from './AuthPage.module.css';

export default function AuthPage() {
  const emailAvailable = useSelector(selectEmailAvailable);

  return (
    <Section size="4">
      <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
        <Flex justify="between" mb="7">
          <Box className={css.authFormWrapper}>
            {emailAvailable === null && (
              <>
                <Heading as="h2" size="8" mb="4" weight="bold">
                  LOG IN OR SIGN UP
                </Heading>
                <Text as="p" mb="8">
                  Enjoy members-only access to exclusive products, experiences, offers and more.
                </Text>
              </>
            )}
            {emailAvailable === true && (
              <>
                <Heading as="h2" size="8" mb="4" weight="bold">
                  WELCOME TO ADICLUB!
                </Heading>
                <Text as="p" mb="8">
                  Create a password to have full access to adiClub benefits and be able to redeem points, save your
                  shipping details and more.
                </Text>
              </>
            )}
            {emailAvailable === false && (
              <>
                <Heading as="h2" size="8" mb="4" weight="bold">
                  LOGIN TO ADICLUB
                </Heading>
                <Text as="p" mb="8">
                  Get free shipping, discount vouchers and members only products when you’re in adiClub.
                </Text>
              </>
            )}
            <AuthForm emailAvailable={emailAvailable} />
          </Box>
        </Flex>
      </Container>
    </Section>
  );
}
