import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from '../../redux/auth/selectors.js';
import { refreshUser } from '../../redux/auth/operations.js';
import { finishAuthProcess } from '../../redux/auth/slice.js';

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

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser())
      .unwrap()
      .then(() => {
        // dispatch(getUserCart());
      })
      .finally(() => {});
    dispatch(finishAuthProcess());
  }, [dispatch]);

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
          <Route path="auth" element={<RestrictedRoute component={<AuthPage />} redirectTo="/account" />} />
          <Route path="account" element={<PrivateRoute component={<AccountPage />} redirectTo="/auth" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </Suspense>
  );
}
