import { Box } from '@radix-ui/themes';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductOptions } from '../../redux/products/slice.js';
import { selectCurentProduct, selectLoading, selectSelectedOptionsById } from '../../redux/products/selectors.js';
import { addProductsToLocalCart } from '../../redux/cart/slice.js';
import { fetchProductById } from '../../redux/products/operations.js';
import { useIsFavoriteProduct } from '../../hooks/useIsFavoriteProduct.js';
import { useToggleFavoriteProduct } from '../../hooks/useToggleFavoriteProduct.js';
import { addProductsToCart } from '../../redux/cart/operations.js';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';

import toast from 'react-hot-toast';
import useModal from '../../hooks/useModal.js';
import AboutProduct from '../../components/AboutProduct/AboutProduct.jsx';
import ProductMainSection from '../../components/ProductMainSection/ProductMainSection.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import ModalWindow from '../../components/ModalWindow/ModalWindow.jsx';
import AddToCartModalContent from '../../components/AddToCartModalContent/AddToCartModalContent.jsx';

import css from './ProductPage.module.css';

export default function ProductPage() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, openModal, closeModal } = useModal();

  const isLoading = useSelector(selectLoading);
  const curentProduct = useSelector(selectCurentProduct);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentProductOptions = useSelector(selectSelectedOptionsById(curentProduct._id));

  const queryParams = new URLSearchParams(location.search);
  const colorParam = queryParams.get('color');
  const sizeParam = queryParams.get('size');

  const [selectedColor, setSelectedColor] = useState(colorParam);
  const [selectedSize, setSelectedSize] = useState(sizeParam);
  const [addedProduct, setAddedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    if (curentProduct?._id) {
      const options = currentProductOptions ?? {};
      setSelectedColor(colorParam || options.color || 'main');
      setSelectedSize(sizeParam || options.size || '');
    }
  }, [curentProduct?._id]);

  // Update query string
  const updateQueryParam = (key, value) => {
    const params = new URLSearchParams(location.search);
    params.set(key, value); // оновлюємо key значенням value
    navigate(`${location.pathname}?${params.toString()}`, { replace: true }); // замінює URL без перезавантаження
  };

  const changeColor = (colorKey) => {
    setSelectedColor(colorKey);
    updateQueryParam('color', colorKey);
  };

  const changeSize = (size) => {
    setSelectedSize(size);
    updateQueryParam('size', size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size before adding to cart.');
      return;
    }

    const variant = curentProduct.images.variants[selectedColor];
    const productToAdd = {
      _id: curentProduct._id,
      productName: curentProduct.productName,
      category: curentProduct.category,
      type: curentProduct.type,
      price: curentProduct.price,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      colorName: variant?.color,
      image: variant?.images?.[0],
    };

    if (isLoggedIn) {
      dispatch(addProductsToCart([productToAdd]))
        .unwrap()
        .then(() => {
          setAddedProduct(productToAdd);
          openModal('add-to-cart');
        })
        .catch((error) => {
          if (error.message !== 'Access token expired') {
            toast.error(error.message);
          }
        });
    } else {
      dispatch(addProductsToLocalCart(productToAdd));
      setAddedProduct(productToAdd);
      openModal('add-to-cart');
    }
  };

  const isFavoriteProduct = useIsFavoriteProduct(curentProduct._id, selectedColor);
  const variant = curentProduct?.images?.variants?.[selectedColor];

  const selectedProduct = {
    _id: curentProduct._id,
    productName: curentProduct.productName,
    category: curentProduct.category,
    color: selectedColor,
    colorName: curentProduct?.images?.variants[selectedColor]?.color,
    image: variant?.images?.[0] ?? '',
    price: curentProduct.price,
  };

  const handleToggleFavorite = useToggleFavoriteProduct(isLoggedIn, isFavoriteProduct, selectedProduct, selectedColor);

  useEffect(() => {
    dispatch(setProductOptions({ productId: curentProduct._id, color: selectedColor, size: selectedSize }));
  }, [selectedColor, selectedSize, curentProduct?._id, dispatch]);

  return (
    <>
      {isLoading && <Loader heightValue={'calc(100vh - 64px)'} />}
      {Object.keys(curentProduct).length > 0 && (
        <Box as="div">
          <ProductMainSection
            isFavoriteProduct={isFavoriteProduct}
            curentProduct={curentProduct}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            changeColor={changeColor}
            changeSize={changeSize}
            handleAddToCart={handleAddToCart}
            handleToggleFavorite={handleToggleFavorite}
          />
          <AboutProduct product={curentProduct} />
        </Box>
      )}
      <ModalWindow isOpen={isOpen} closeModal={closeModal} label="Successfully added to bag">
        <AddToCartModalContent product={addedProduct} closeModal={closeModal} />
      </ModalWindow>
    </>
  );
}
