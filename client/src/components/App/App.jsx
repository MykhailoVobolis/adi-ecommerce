import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from '../Layout/Layout.jsx';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const ProductPage = lazy(() => import('../../pages/ProductPage/ProductPage.jsx'));
const CartPage = lazy(() => import('../../pages/CartPage/CartPage.jsx'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage.jsx'));
const FavoritesPage = lazy(() => import('../../pages/FavoritesPage/FavoritesPage.jsx'));
const ProductCategoryPage = lazy(() => import('../../pages/ProductCategoryPage/ProductCategoryPage.jsx'));

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="product" element={<ProductPage />} /> */}
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="/products/:category" element={<ProductCategoryPage />} />
          <Route path="/products/:category/:productId" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </>
  );
}
