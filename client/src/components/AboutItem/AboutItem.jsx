import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { useMedia } from "react-use";
import css from "./AboutItem.module.css";

export default function About({ title, description, image, reverse }) {
  const isTablet = useMedia("(min-width: 768px)");

  return (
    <Flex direction={isTablet ? (reverse ? "row-reverse" : "row") : "column-reverse"}>
      <Flex className={css.content} direction="column" align="center" justify="center">
        <Box maxWidth="392px" p="20px">
          <Heading as="h2" size="6" mb="4" weight="bold">
            {title.toUpperCase()}
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
