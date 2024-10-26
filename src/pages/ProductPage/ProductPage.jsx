import { Box, Button, Flex, Heading, Section, Text } from "@radix-ui/themes";
import Slider from "../../components/Slider/Slider.jsx";
import ProductAccordion from "../../components/ProductAccordion/ProductAccordion.jsx";

import css from "./ProductPage.module.css";
import AboutProduct from "../../components/AboutProduct/AboutProduct.jsx";

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
