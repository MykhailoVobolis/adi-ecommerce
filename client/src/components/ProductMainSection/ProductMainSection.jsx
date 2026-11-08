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
  const isDesktop = useMedia('(min-width: 1200px)');

  const { productName, price, sizes, images } = curentProduct;

  return (
    <Section className={css.container}>
      <Flex className={css.mainLayout} minWidth="0" direction={isDesktop ? 'row' : 'column'}>
        {isDesktop && <Slider product={curentProduct} selectedColor={selectedColor} />}
        <Box className={css.aboutContainer}>
          <Box>
            <Box className={css.descContainer}>
              <Heading as="h1" size="8" className={css.productTitle}>
                {productName.toUpperCase()}
              </Heading>
              <Text as="p" size="6" weight="bold" className={css.productPrice}>
                ${price}
              </Text>
            </Box>
            {!isDesktop && <Slider product={curentProduct} selectedColor={selectedColor} />}
            <Box className={css.accordionContainer}>
              <ProductAccordion product={curentProduct} />
            </Box>
          </Box>
          <Box className={css.secondAboutContainer}>
            <Box>
              <Flex className={css.selectContainer}>
                <ColorPicker
                  changeColor={changeColor}
                  productImagesVariants={images}
                  selectedColor={selectedColor}
                />
                <Separator className={css.selectorDivider} size="2" decorative orientation="vertical" />
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
    </Section>
  );
}
