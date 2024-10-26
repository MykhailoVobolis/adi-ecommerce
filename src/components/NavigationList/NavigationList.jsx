import { Link, TabNav } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useLocation } from "react-router-dom";

import css from "./NavigationList.module.css";

export default function NavigationList() {
  const { pathname } = useLocation();

  return (
    <TabNav.Root className={css.navMenu}>
      <TabNav.Link asChild active={pathname === "/"}>
        <Link href="/" size={"1"}>
          PRODUCT
        </Link>
      </TabNav.Link>
      <TabNav.Link asChild active={pathname === "/cart"}>
        <Link href="/cart" size={"1"}>
          CART
        </Link>
      </TabNav.Link>
    </TabNav.Root>
  );
}
