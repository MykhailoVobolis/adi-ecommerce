import { Container, Heading, Section, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import css from "./CartPage.module.css";

export default function CartPage() {
  return (
    <Section size="4">
      <Container size={{ initial: "1", sm: "2", md: "3", lg: "4", xl: "5" }}>
        <Heading as="h1" size="8" mt="9" mb="6" weight="bold">
          YOUR BAG IS EMPTY
        </Heading>
        <Text as="p" size="3" mb="5">
          Once you add something to your bag, it will appear here. Ready to get started?
        </Text>
        <Link to={"/"} className={css.getStartedLink}>
          <span>GET STARTED</span>
          <HiOutlineArrowNarrowRight size={24} />
        </Link>
      </Container>
    </Section>
  );
}
