import { Container, Heading, Section, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { selectCartData } from "../../redux/cart/selectors.js";

import css from "./CartPage.module.css";

export default function CartPage() {
  const cartData = useSelector(selectCartData);
  const { products, totalPrice, totalQuantityProducts } = cartData;

  return (
    <Section size="4">
      <Container size={{ initial: "1", sm: "2", md: "3", lg: "4", xl: "5" }}>
        {totalQuantityProducts > 0 ? (
          <>
            <Heading as="h1" size="8" mb="4" weight="bold">
              YOUR BAG
            </Heading>
            <Text as="p" size="3" mb="2">
              TOTAL: ({totalQuantityProducts} items) <span className={css.totalPrise}>${totalPrice.toFixed(2)}</span>
            </Text>
            <Text as="p" size="3" mb="5">
              Items in your bag are not reserved — check out now to make them yours.
            </Text>
          </>
        ) : (
          <>
            <Heading as="h1" size="8" mt="9" mb="4" weight="bold">
              YOUR BAG IS EMPTY
            </Heading>
            <Text as="p" size="3" mb="5">
              Once you add something to your bag, it will appear here. Ready to get started?
            </Text>
            <Link to={"/"} className={css.getStartedLink}>
              <span>GET STARTED</span>
              <HiOutlineArrowNarrowRight size={24} />
            </Link>
          </>
        )}
      </Container>
    </Section>
  );
}
