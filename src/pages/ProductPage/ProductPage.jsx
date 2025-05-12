import { Box, Button, Flex, Heading, Section, Text } from "@radix-ui/themes";
import Slider from "../../components/Slider/Slider.jsx";
import ProductAccordion from "../../components/ProductAccordion/ProductAccordion.jsx";
import AboutProduct from "../../components/AboutProduct/AboutProduct.jsx";
import SelectColor from "../../components/SelectColor/SelectColor.jsx";
import { products } from "../../assets/db/products_list.js";
import { useState } from "react";
import { useMedia } from "react-use";

import css from "./ProductPage.module.css";

const product = products[0];

export default function ProductPage() {
  const [curentColor, setCurentColor] = useState("white");

  const isTablet = useMedia("(min-width: 768px)");

  const { productName, price, images } = product;

  const changeColor = (color) => {
    setCurentColor(color);
  };

  return (
    <>
      <Section className={css.container}>
        <Flex>
          <Flex minWidth="0" direction={isTablet ? "row" : "column-reverse"}>
            {isTablet && <Slider product={product} curentColor={curentColor} />}
            <Box className={css.aboutContainer}>
              <Box className={css.descContainer}>
                <Heading as="h1" size="8" mb="4">
                  {productName.toUpperCase()}
                </Heading>
                <Text as="p" size="6" mb="6" weight="bold">
                  ${price}
                </Text>
              </Box>
              {!isTablet && <Slider product={product} curentColor={curentColor} />}
              <Box className={css.secondAboutContainer}>
                {!isTablet && <SelectColor changeColor={changeColor} productImagesVariants={images} />}
                <ProductAccordion product={product} />
                {isTablet && <SelectColor changeColor={changeColor} productImagesVariants={images} />}
                <Flex justify="center">
                  <Button className={css.buyBtn} size="3" mt="5" mb="4">
                    ADD TO CART
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Section>
      <AboutProduct product={product} />
    </>
  );
}
