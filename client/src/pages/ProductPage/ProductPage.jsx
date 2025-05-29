import { Box, Flex, Heading, Section, Separator, Text } from '@radix-ui/themes';
import { products } from '../../assets/db/products_list.js';
import { useEffect, useState } from 'react';
import { useMedia } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { setProductOptions } from '../../redux/products/slice.js';
import { selectSelectedOptionsById } from '../../redux/products/selectors.js';
import { addFavorite, removeFavorite } from '../../redux/favorites/slice.js';
import { selectFavoriteProducts } from '../../redux/favorites/selectors.js';
import { addProductsToCart } from '../../redux/cart/slice.js';

import toast from 'react-hot-toast';
import Slider from '../../components/Slider/Slider.jsx';
import ProductAccordion from '../../components/ProductAccordion/ProductAccordion.jsx';
import AboutProduct from '../../components/AboutProduct/AboutProduct.jsx';
import ColorPicker from '../../components/ColorPicker/ColorPicker.jsx';
import SizePicker from '../../components/SizePicker/SizePicker.jsx';
import AddToCartButton from '../../components/AddToCartButton/AddToCartButton.jsx';
import AddToFavoriteButton from '../../components/AddToFavoriteButton/AddToFavoriteButton.jsx';

import css from './ProductPage.module.css';

export default function ProductPage() {
  const dispatch = useDispatch();
  const isTablet = useMedia('(min-width: 768px)');

  const [product, setProduct] = useState(products[0]);

  const { _id, productName, price, sizes, images } = product;

  const currentProductOptions = useSelector(selectSelectedOptionsById(_id));
  const favoriteProducts = useSelector(selectFavoriteProducts);

  const [selectedColor, setSelectedColor] = useState(currentProductOptions?.color || 'white');
  const [selectedSize, setSelectedSize] = useState(currentProductOptions?.size || '');

  const isFavoriteProduct = favoriteProducts.some((favItem) => favItem._id === product._id);

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
      image: product.images.variants[selectedColor].images[0],
    };

    dispatch(addProductsToCart(productToAdd));
    console.log('Product added to cart:', productToAdd);
    toast.success('Product added to cart!');
  };

  const handleToggleFavorite = () => {
    if (isFavoriteProduct) {
      dispatch(removeFavorite(product));
    } else {
      dispatch(addFavorite(product));
    }
  };

  useEffect(() => {
    dispatch(setProductOptions({ productId: _id, color: selectedColor, size: selectedSize }));
  }, [selectedColor, selectedSize, _id, dispatch]);

  return (
    <>
      <Section className={css.container}>
        <Flex>
          <Flex minWidth="0" direction={isTablet ? 'row' : 'column-reverse'}>
            {isTablet && <Slider product={product} selectedColor={selectedColor} />}
            <Box className={css.aboutContainer}>
              <Box>
                <Box className={css.descContainer}>
                  <Heading as="h1" size="8" mb="4">
                    {productName.toUpperCase()}
                  </Heading>
                  <Text as="p" size="6" mb="5" weight="bold">
                    ${price}
                  </Text>
                </Box>
                {!isTablet && <Slider product={product} selectedColor={selectedColor} />}
                <ProductAccordion product={product} />
              </Box>
              <Box className={css.secondAboutContainer}>
                {!isTablet && <ColorPicker changeColor={changeColor} productImagesVariants={images} />}
                <Box>
                  <Flex className={css.selectContainer}>
                    {isTablet && (
                      <ColorPicker
                        changeColor={changeColor}
                        productImagesVariants={images}
                        selectedColor={selectedColor}
                      />
                    )}
                    <Separator
                      className="SeparatorRoot"
                      size="2"
                      decorative
                      orientation="vertical"
                      style={{ height: '100%', margin: '20px 20px 0 20px' }}
                    />
                    <SizePicker sizes={sizes} selectedSize={selectedSize} onChange={changeSize} />
                  </Flex>
                  <Flex className={css.btnsContainer}>
                    <AddToCartButton onAddToCartClick={handleAddToCart} />
                    <AddToFavoriteButton onAddToFavoriteClick={handleToggleFavorite} isFavorite={isFavoriteProduct} />
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Section>
      <AboutProduct product={product} />
    </>
  );
}
