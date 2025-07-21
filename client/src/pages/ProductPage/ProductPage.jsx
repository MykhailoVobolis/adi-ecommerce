import { Box } from '@radix-ui/themes';
// import { products } from '../../assets/db/products_list.js';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductOptions } from '../../redux/products/slice.js';
import { selectCurentProduct, selectLoading, selectSelectedOptionsById } from '../../redux/products/selectors.js';
import { addProductsToCart } from '../../redux/cart/slice.js';
import { fetchProductById } from '../../redux/products/operations.js';
import { useIsFavoriteProduct } from '../../hooks/useIsFavoriteProduct.js';
import { useToggleFavoriteProduct } from '../../hooks/useToggleFavoriteProduct.js';

import toast from 'react-hot-toast';
import AboutProduct from '../../components/AboutProduct/AboutProduct.jsx';
import ProductMainSection from '../../components/ProductMainSection/ProductMainSection.jsx';
import Loader from '../../components/Loader/Loader.jsx';

import css from './ProductPage.module.css';

export default function ProductPage() {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const isLoading = useSelector(selectLoading);
  const curentProduct = useSelector(selectCurentProduct);

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

    dispatch(addProductsToCart(productToAdd));
  };

  const handleToggleFavorite = useToggleFavoriteProduct(isFavoriteProduct, curentProduct, selectedColor);

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
    </>
  );
}
