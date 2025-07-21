import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthProcess, selectIsLoggedIn } from '../redux/auth/selectors.js';

import Loader from './Loader/Loader.jsx';

export default function PrivateRoute({ component, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const authProcess = useSelector(selectAuthProcess);

  if (authProcess) {
    return <Loader heightValue={'calc(100vh - 64px)'} />;
  }

  return isLoggedIn ? component : <Navigate to={redirectTo} replace />;
}
