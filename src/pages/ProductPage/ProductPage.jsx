import { Box, Button, Flex, Heading, Section, Text } from "@radix-ui/themes";
import Slider from "../../components/Slider/Slider.jsx";
import ProductAccordion from "../../components/ProductAccordion/ProductAccordion.jsx";
import AboutProduct from "../../components/AboutProduct/AboutProduct.jsx";
import SelectColor from "../../components/SelectColor/SelectColor.jsx";

import css from "./ProductPage.module.css";

export default function ProductPage() {
  return (
    <>
      <Section className={css.pageContainer}>
        <Flex>
          <Slider />
          <Box className={css.descContainer}>
            <Heading as="h1" size="8" mb="4" style={{ textTransform: "uppercase" }}>
              SL 72 RS Shoes
            </Heading>
            <Text as="p" size="6" mb="6" weight="bold">
              $100
            </Text>
            <ProductAccordion />
            <SelectColor />
            <Flex justify="center">
              <Button className={css.buyBtn} size="3" mt="5" mb="4" color="black">
                ADD TO CART
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Section>
      <AboutProduct />
    </>
  );
}
