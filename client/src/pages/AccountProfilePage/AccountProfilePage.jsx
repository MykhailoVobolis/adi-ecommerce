import { Box, Container, Heading, Text } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { selectIsOAuth, selectUser } from '../../redux/auth/selectors.js';

import useModal from '../../hooks/useModal.js';
import ModalWindow from '../../components/ModalWindow/ModalWindow.jsx';
import EditButton from '../../components/EditButton/EditButton.jsx';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm.jsx';
import EditEmailForm from '../../components/EditEmailForm/EditEmailForm.jsx';
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm.jsx';

import css from './AccountProfilePage.module.css';

export default function AccountProfilePage() {
  const { email, firstName = '', lastName = '', phone } = useSelector(selectUser);
  const { modalType, isOpen, openModal, closeModal } = useModal();
  const isOAuth = useSelector(selectIsOAuth);

  return (
    <Container size={{ initial: '1', sm: '2', md: '3', lg: '4', xl: '5' }}>
      <Heading as="h2" size="7" mb="3" weight="bold">
        MY DETAILS
      </Heading>
      <Text as="p" mb="9">
        Feel free to edit any of your details below so your account is up to date.
      </Text>
      <Box mb="8">
        <Heading as="h2" size="7" mb="3" weight="bold">
          DETAILS
        </Heading>
        <Text className={css.userDetails} as="p" mb="3">
          {firstName ? `${firstName} ${lastName}` : 'name'}
        </Text>
        <Text className={css.userDetails} as="p" mb="3">
          {phone ? `${phone}` : 'phone'}
        </Text>
        <EditButton openModal={openModal} type="edit-profile" />
      </Box>
      <Box mb="6">
        <Heading as="h2" size="7" mb="3" weight="bold">
          LOGIN DETAILS
        </Heading>
        <Text className={css.userDetails} as="p" mb="3" size="5" weight="bold">
          EMAIL
        </Text>
        <Text className={css.userDetails} as="p" mb="4">
          {email}
        </Text>
        {!isOAuth && <EditButton openModal={openModal} type="edit-email" />}
      </Box>
      {!isOAuth && (
        <Box>
          <Text className={css.userDetails} as="p" mb="3" size="5" weight="bold">
            PASSWORD
          </Text>
          <Text className={css.userDetails} as="p" mb="4">
            ************
          </Text>
          <EditButton openModal={openModal} type="change-password" />
        </Box>
      )}
      <ModalWindow isOpen={isOpen} closeModal={closeModal} label="User data change form">
        {modalType === 'edit-profile' && (
          <>
            <Heading as="h2" size="7" mb="5" weight="bold">
              EDIT YOUR DETAILS
            </Heading>
            <EditProfileForm closeModal={closeModal} />
          </>
        )}
        {modalType === 'edit-email' && (
          <>
            <Heading as="h2" size="7" mb="5" weight="bold">
              EDIT YOUR EMAIL
            </Heading>
            <EditEmailForm closeModal={closeModal} />
          </>
        )}
        {modalType === 'change-password' && (
          <>
            <Heading as="h2" size="7" mb="5" weight="bold">
              EDIT YOUR PASSWORD
            </Heading>
            <ChangePasswordForm closeModal={closeModal} />
          </>
        )}
      </ModalWindow>
    </Container>
  );
}
