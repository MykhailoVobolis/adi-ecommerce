import toast from 'react-hot-toast';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { confirmGoogleAuth } from '../../redux/auth/operations.js';

import Loader from '../../components/Loader/Loader.jsx';

export default function ConfirmGoogleAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const code = urlParams.get('code');

  // Запобігання подвійному запиту через React Strict Mode
  const hasFetched = useRef(false);

  useEffect(() => {
    if (code && !hasFetched.current) {
      hasFetched.current = true; // Маркуємо, що вже був запит

      dispatch(confirmGoogleAuth(code))
        .unwrap()
        .then(() => navigate('/account'))
        .catch((error) => {
          toast.error(error.message || 'Authentication failed');
          navigate('/');
        });
    }
  }, [dispatch, navigate, code]);

  return <Loader heightValue={'calc(100vh - 64px)'} />;
}
