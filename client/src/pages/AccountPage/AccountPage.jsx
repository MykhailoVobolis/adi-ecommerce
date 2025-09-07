import toast from 'react-hot-toast';
import { Box, Container, Flex, Heading, Text } from '@radix-ui/themes';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations.js';
import { resetAppState } from '../../redux/actions/globalActions.js';
import { selectUser } from '../../redux/auth/selectors.js';
import { selectCartData } from '../../redux/cart/selectors.js';

import LogoutButton from '../../components/LogoutButton/LogoutButton.jsx';
import AccountCartSummary from '../../components/AccountCartSummary/AccountCartSummary.jsx';

import css from './AccountPage.module.css';

export default function AccountPage() {
  const dispatch = useDispatch();
  const { firstName } = useSelector(selectUser);
  const { products, totalQuantityProducts } = useSelector(selectCartData);

  const greetingName = firstName ? firstName : 'Guest';

  const handleClick = () => {
    dispatch(logOut())
      .unwrap()
      .then(() => {
        dispatch(resetAppState());
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
      <Flex justify="between" mb="7">
        <Box className={css.wrapper}>
          <Heading as="h2" size="8" mb="4" weight="bold" style={{ textTransform: 'uppercase' }}>
            HI, {greetingName}
          </Heading>
          <Text as="p" mb="4">
            This is your personal space. Get the low down on your membership status and all the points and rewards
            you've earned.
          </Text>
          <AccountCartSummary products={products} totalQuantityProducts={totalQuantityProducts} />
          <Box>
            <Heading as="h3" size="4" mb="3" weight="bold">
              LOG OUT FROM ALL WEB BROWSERS
            </Heading>
            <Text as="p" mb="6">
              This will log you out from all web browsers you have used to access the adidas website. To log in again,
              you'll have to enter your credentials.
            </Text>
            <LogoutButton handleClick={handleClick} />
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
