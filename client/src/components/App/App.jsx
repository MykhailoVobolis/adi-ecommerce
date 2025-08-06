import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing, selectUser, selectWasRefreshed } from '../../redux/auth/selectors.js';
import { selectFavoriteProducts } from '../../redux/favorites/selectors.js';
import { refreshUser } from '../../redux/auth/operations.js';
import { finishAuthProcess } from '../../redux/auth/slice.js';
import { setCustomerData } from '../../redux/checkout/slice.js';
import { selectCartData } from '../../redux/cart/selectors.js';
import { addProductsToCart, getUserCart } from '../../redux/cart/operations.js';
import { addFavorite, getUserFavorites } from '../../redux/favorites/operations.js';

import Layout from '../Layout/Layout.jsx';
import Loader from '../Loader/Loader.jsx';
import RestrictedRoute from '../RestrictedRoute.jsx';
import PrivateRoute from '../PrivateRoute.jsx';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const ProductPage = lazy(() => import('../../pages/ProductPage/ProductPage.jsx'));
const CartPage = lazy(() => import('../../pages/CartPage/CartPage.jsx'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));
const FavoritesPage = lazy(() => import('../../pages/FavoritesPage/FavoritesPage.jsx'));
const ProductCategoryPage = lazy(() => import('../../pages/ProductCategoryPage/ProductCategoryPage.jsx'));
const DeliveryPage = lazy(() => import('../../pages/DeliveryPage/DeliveryPage.jsx'));
const PaymentPage = lazy(() => import('../../pages/PaymentPage/PaymentPage.jsx'));
const AuthPage = lazy(() => import('../../pages/AuthPage/AuthPage.jsx'));
const AccountPage = lazy(() => import('../../pages/AccountPage/AccountPage.jsx'));
const ConfirmGoogleAuth = lazy(() => import('../../pages/ConfirmGoogleAuth/ConfirmGoogleAuth.jsx'));

const AccountLayout = lazy(() => import('../../components/AccountLayout/AccountLayout.jsx'));
const AccountProfilePage = lazy(() => import('../../pages/AccountProfilePage/AccountProfilePage.jsx'));
const AccountHistoryPage = lazy(() => import('../../pages/AccountHistoryPage/AccountHistoryPage.jsx'));
const AccountFavoritesPage = lazy(() => import('../../pages/AccountFavoritesPage/AccountFavoritesPage.jsx'));
const OrderConfirmationPage = lazy(() => import('../../pages/OrderConfirmationPage/OrderConfirmationPage.jsx'));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const authUserData = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const localCart = useSelector(selectCartData);
  const localFavoriteProducts = useSelector(selectFavoriteProducts);
  const wasRefreshed = useSelector(selectWasRefreshed);

  useEffect(() => {
    dispatch(refreshUser())
      .unwrap()
      .catch((error) => {
        if (error.name === 'ConditionError') return;
        toast.error(error.message);
      })
      .finally(() => {
        dispatch(finishAuthProcess());
      });
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setCustomerData(authUserData));
    }
  }, [dispatch, authUserData, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn || wasRefreshed) return;

    if (localCart.products?.length > 0) {
      dispatch(addProductsToCart(localCart.products));
    } else {
      dispatch(getUserCart());
    }

    if (localFavoriteProducts?.length > 0) {
      dispatch(addFavorite(localFavoriteProducts));
    } else {
      dispatch(getUserFavorites());
    }
  }, [dispatch, isLoggedIn, wasRefreshed]);

  return isRefreshing ? (
    <Loader heightValue={'calc(100vh - 64px)'} />
  ) : (
    <Suspense fallback={null}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="products/:category" element={<ProductCategoryPage />} />
          <Route path="products/:category/:productId" element={<ProductPage />} />
          <Route path="delivery" element={<DeliveryPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          <Route path="auth" element={<RestrictedRoute component={<AuthPage />} redirectTo="/account" />} />

          <Route path="account" element={<PrivateRoute component={<AccountLayout />} redirectTo="/auth" />}>
            <Route index element={<AccountPage />} />
            <Route path="profile" element={<AccountProfilePage />} />
            <Route path="history" element={<AccountHistoryPage />} />
            <Route path="favorites" element={<AccountFavoritesPage />} />
          </Route>

          <Route path="confirm-google-auth" element={<ConfirmGoogleAuth />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </Suspense>
  );
}
