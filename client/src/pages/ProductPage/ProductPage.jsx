import { Box } from '@radix-ui/themes';
// import { products } from '../../assets/db/products_list.js';
import { useLocation, useParams } from 'react-router-dom';
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
  const { isOpen, openModal, closeModal } = useModal();

  const isLoading = useSelector(selectLoading);
  const curentProduct = useSelector(selectCurentProduct);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const location = useLocation();
  const { color: initialColor } = location.state || {};
  const { size: initialSize } = location.state || {};

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  // const [curentProduct, setCurentProduct] = useState(products[0]);

  const { _id, productName, price, category } = curentProduct;

  const currentProductOptions = useSelector(selectSelectedOptionsById(_id));

  const [selectedColor, setSelectedColor] = useState(initialColor || currentProductOptions?.color || 'main');
  const [selectedSize, setSelectedSize] = useState(initialSize || currentProductOptions?.size || '');
  const [addedProduct, setAddedProduct] = useState(null);

  // Сбрасываем локальные состояния при смене продукта
  useEffect(() => {
    if (curentProduct?._id) {
      const options = currentProductOptions ?? {};
      setSelectedColor(initialColor || options.color || 'main');
      setSelectedSize(initialSize || options.size || '');
    }
  }, [curentProduct?._id]);

  const isFavoriteProduct = useIsFavoriteProduct(_id, selectedColor);

  const changeColor = (color) => {
    setSelectedColor(color);
  };

  const changeSize = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size before adding to cart.');
      return;
    }

    const productToAdd = {
      _id: _id,
      productName: productName,
      category: category,
      price: price,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      colorName: curentProduct.images.variants[selectedColor].color,
      image: curentProduct.images.variants[selectedColor].images[0],
    };

    if (isLoggedIn) {
      dispatch(addProductsToCart([productToAdd]))
        .unwrap()
        .then(() => {
          setAddedProduct(productToAdd);
          openModal('add-to-cart');
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      dispatch(addProductsToLocalCart(productToAdd));
      setAddedProduct(productToAdd);
      openModal('add-to-cart');
    }
  };

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
    dispatch(setProductOptions({ productId: _id, color: selectedColor, size: selectedSize }));
  }, [selectedColor, selectedSize, _id, dispatch]);

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
