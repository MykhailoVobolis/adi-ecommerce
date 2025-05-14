import { Container, Heading, Section, Text } from "@radix-ui/themes";

import css from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  return (
    <Section size="4">
      <Container size={{ initial: "1", sm: "2", md: "3", lg: "4", xl: "5" }}>
        <Heading as="h1" size="8" mt="9" mb="6" weight="bold">
          MY WISHLIST
        </Heading>
        <Text as="p" size="3" mb="1">
          0 ITEMS
        </Text>
        <Text as="p" size="3">
          You haven't saved any items to your wishlist yet. Start shopping and add your favorite items to your wishlist.
        </Text>
      </Container>
    </Section>
  );
}
