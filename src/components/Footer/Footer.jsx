import { Box, Text } from "@radix-ui/themes";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <Box className={css.footerContainer}>
        <Text as="p" size="2" style={{ color: "var(--accent-10)" }}>
          2024 | All images are the property of adidas.
        </Text>
      </Box>
    </footer>
  );
}
