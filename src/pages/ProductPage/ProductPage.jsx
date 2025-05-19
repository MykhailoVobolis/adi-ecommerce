import { Box, Button, Flex, Heading, Section, Separator, Text } from "@radix-ui/themes";
import toast from "react-hot-toast";
import Slider from "../../components/Slider/Slider.jsx";
import ProductAccordion from "../../components/ProductAccordion/ProductAccordion.jsx";
import AboutProduct from "../../components/AboutProduct/AboutProduct.jsx";
import ColorPicker from "../../components/ColorPicker/ColorPicker.jsx";
import SizePicker from "../../components/SizePicker/SizePicker.jsx";
import { products } from "../../assets/db/products_list.js";
import { useState } from "react";
import { useMedia } from "react-use";

import css from "./ProductPage.module.css";

const product = products[0];

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("");

  const isTablet = useMedia("(min-width: 768px)");

  const { _id, productName, price, sizes, images } = product;

  const changeColor = (color) => {
    setSelectedColor(color);
  };

  const changeSize = (size) => {
    setSelectedSize(size);
  };

  const handleClick = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart.");
      return;
    }

    const cartItem = {
      _id: _id,
      productName: productName,
      price: price,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      image: product.images.variants[selectedColor].images[0],
    };
    console.log("Product added to cart:", cartItem);
    toast.success("Product added to cart!");
  };

  return (
    <>
      <Section className={css.container}>
        <Flex>
          <Flex minWidth="0" direction={isTablet ? "row" : "column-reverse"}>
            {isTablet && <Slider product={product} selectedColor={selectedColor} />}
            <Box className={css.aboutContainer}>
              <Box className={css.descContainer}>
                <Heading as="h1" size="8" mb="4">
                  {productName.toUpperCase()}
                </Heading>
                <Text as="p" size="6" mb="6" weight="bold">
                  ${price}
                </Text>
              </Box>
              {!isTablet && <Slider product={product} selectedColor={selectedColor} />}
              <Box className={css.secondAboutContainer}>
                {!isTablet && <ColorPicker changeColor={changeColor} productImagesVariants={images} />}
                <ProductAccordion product={product} />
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
                    style={{ height: "100%", margin: "20px 20px 0 20px" }}
                  />
                  <SizePicker sizes={sizes} selectedSize={selectedSize} onChange={changeSize} />
                </Flex>
                <Flex justify="center">
                  <Button className={css.buyBtn} size="3" mt="4" mb="4" onClick={handleClick}>
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
