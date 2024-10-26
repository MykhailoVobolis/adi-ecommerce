import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import css from "./AboutItem.module.css";

export default function About({ title, description, image, reverse }) {
  return (
    <Flex direction={reverse && "row-reverse"}>
      <Flex className={css.content} direction="column" align="center" justify="center">
        <Box maxWidth="392px">
          <Heading as="h2" size="6" mb="4" weight="regular" style={{ textTransform: "uppercase" }}>
            {title}
          </Heading>
          <Text as="p" size="3" weight="regular">
            {description}
          </Text>
        </Box>
      </Flex>
      <img className={css.mainImage} src={image.src} alt={image.alt} />
    </Flex>
  );
}
