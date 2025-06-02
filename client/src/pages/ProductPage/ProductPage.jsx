import { Box } from '@radix-ui/themes';
// import { products } from '../../assets/db/products_list.js';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductOptions } from '../../redux/products/slice.js';
import { selectCurentProduct, selectLoading, selectSelectedOptionsById } from '../../redux/products/selectors.js';
import { addFavorite, removeFavorite } from '../../redux/favorites/slice.js';
import { selectFavoriteProducts } from '../../redux/favorites/selectors.js';
import { addProductsToCart } from '../../redux/cart/slice.js';
import { fetchProductById } from '../../redux/products/operations.js';

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

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  // const [curentProduct, setCurentProduct] = useState(products[0]);

  const { _id, productName, price } = curentProduct;

  const currentProductOptions = useSelector(selectSelectedOptionsById(_id));
  const favoriteProducts = useSelector(selectFavoriteProducts);

  const [selectedColor, setSelectedColor] = useState(currentProductOptions?.color || 'main');
  const [selectedSize, setSelectedSize] = useState(currentProductOptions?.size || '');

  const isFavoriteProduct = favoriteProducts.some(
    (favItem) => favItem._id === _id && favItem.selectedColor === selectedColor,
  );

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
      price: price,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      image: curentProduct.images.variants[selectedColor].images[0],
    };

    dispatch(addProductsToCart(productToAdd));
    console.log('Product added to cart:', productToAdd);
    toast.success('Product added to cart!');
  };

  const handleToggleFavorite = () => {
    const productWithColor = { ...curentProduct, selectedColor };

    if (isFavoriteProduct) {
      dispatch(removeFavorite(productWithColor));
    } else {
      dispatch(addFavorite(productWithColor));
    }
  };

  useEffect(() => {
    dispatch(setProductOptions({ productId: _id, color: selectedColor, size: selectedSize }));
  }, [selectedColor, selectedSize, _id, dispatch]);

  return (
    <>
      {isLoading && <Loader />}
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
