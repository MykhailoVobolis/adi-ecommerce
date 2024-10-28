import { Box, Heading, Text } from "@radix-ui/themes";
import css from "./CartPage.module.css";

export default function CartPage() {
  return (
    <Box className={css.cartPageContainer}>
      <Heading as="h2" size="6" mb="2" weight="medium">
        Your cart
      </Heading>
      <Text as="p" size="3">
        ....is empty. Let's change that.
      </Text>
    </Box>
  );
}
