import { Box, Flex, Heading, Section, Separator, Text } from '@radix-ui/themes';
import { useMedia } from 'react-use';

import Slider from '../../components/Slider/Slider.jsx';
import ProductAccordion from '../../components/ProductAccordion/ProductAccordion.jsx';
import ColorPicker from '../../components/ColorPicker/ColorPicker.jsx';
import SizePicker from '../../components/SizePicker/SizePicker.jsx';
import AddToCartButton from '../../components/AddToCartButton/AddToCartButton.jsx';
import AddToFavoriteButton from '../../components/AddToFavoriteButton/AddToFavoriteButton.jsx';

import css from './ProductMainSection.module.css';

export default function ProductMainSection({
  curentProduct,
  selectedColor,
  changeColor,
  selectedSize,
  changeSize,
  handleAddToCart,
  handleToggleFavorite,
  isFavoriteProduct,
}) {
  const isTablet = useMedia('(min-width: 768px)');

  const { productName, price, sizes, images } = curentProduct;

  return (
    <Section className={css.container}>
      <Flex>
        <Flex minWidth="0" direction={isTablet ? 'row' : 'column-reverse'}>
          {isTablet && <Slider product={curentProduct} selectedColor={selectedColor} />}
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
              {!isTablet && <Slider product={curentProduct} selectedColor={selectedColor} />}
              <ProductAccordion product={curentProduct} />
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
  );
}
