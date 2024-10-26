import { Box, Button, Flex, Heading, Section, Text } from "@radix-ui/themes";
import Slider from "../../components/Slider/Slider.jsx";

import css from "./ProductPage.module.css";

export default function ProductPage() {
  return (
    <Section className={css.pageContainer}>
      <Flex>
        <Slider />
        <Box className={css.descContainer}>
          <Heading size="8" align="start" mb="4">
            SL 72 RS Shoes
          </Heading>
          <Text size="3" align="center" mt="5" mb="4">
            Rediscover a legend from the archives. The adidas SL 72 shoes were originally released in 1972 to give
            runners an edge on the track. Decades later, their design still turns heads. This version features a nylon
            upper with suede overlays that provides retro style. Your feet stay cushioned thanks to an EVA midsole while
            a grippy outsole keeps you grounded.
          </Text>
          <Flex justify="center">
            <Button className={css.buyBtn} size="3" mt="5" mb="4" color="black">
              ADD TO CART
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Section>
  );
}
