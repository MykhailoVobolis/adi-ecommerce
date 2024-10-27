import { Box, Button, Flex, Heading, Section, Text } from "@radix-ui/themes";
import Slider from "../../components/Slider/Slider.jsx";
import ProductAccordion from "../../components/ProductAccordion/ProductAccordion.jsx";
import AboutProduct from "../../components/AboutProduct/AboutProduct.jsx";
import SelectColor from "../../components/SelectColor/SelectColor.jsx";
import { products } from "../../assets/db/products_list.js";
import { useState } from "react";

import css from "./ProductPage.module.css";

const product = products[0];

export default function ProductPage() {
  const [curentColor, setCurentColor] = useState("white");

  const { productName, price } = product;

  const changeColor = (color) => {
    setCurentColor(color);
  };

  return (
    <>
      <Section className={css.pageContainer}>
        <Flex>
          <Slider product={product} curentColor={curentColor} />
          <Box className={css.descContainer}>
            <Heading as="h1" size="8" mb="4" style={{ textTransform: "uppercase" }}>
              {productName}
            </Heading>
            <Text as="p" size="6" mb="6" weight="bold">
              ${price}
            </Text>
            <ProductAccordion product={product} />
            <SelectColor changeColor={changeColor} />
            <Flex justify="center">
              <Button className={css.buyBtn} size="3" mt="5" mb="4" color="black">
                ADD TO CART
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Section>
      <AboutProduct product={product} />
    </>
  );
}
