import { useDispatch } from 'react-redux';
import { Button } from '@radix-ui/themes';
import { FcGoogle } from 'react-icons/fc';
import { getGoogleAuthUrl } from '../../redux/auth/operations.js';

import css from './GoogleLoginButton.module.css';

export default function GoogleLoginButton() {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(getGoogleAuthUrl());
  };

  return (
    <Button className={css.googleButton} as="button" onClick={handleLogin} mt="8">
      Google
      <FcGoogle size={24} />
    </Button>
  );
}
