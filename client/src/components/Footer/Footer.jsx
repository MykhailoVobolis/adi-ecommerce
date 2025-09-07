import { Box, Text } from "@radix-ui/themes";

import css from "./Footer.module.css";

export default function Footer() {
  return (
    <Box as="footer" className={css.footer}>
      <Box className={css.footerContainer}>
        <Text as="p" size="2" style={{ color: "var(--accent-10)" }}>
          © 2025 | All images and materials are the property of adidas America, Inc. and are used for informational
          purposes only. We do not claim any ownership.
        </Text>
      </Box>
    </Box>
  );
}
