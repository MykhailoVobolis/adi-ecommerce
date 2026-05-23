import { Box, Text } from '@radix-ui/themes';

import css from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box as="footer" className={css.footer}>
      <Box className={css.footerContainer}>
        <Text as="p" size="2" className={css.metaText}>
          © 2025-{currentYear} | Demo E-commerce Project
        </Text>
        <Text as="p" size="2" className={css.disclaimerText}>
          This is a non-commercial educational project created for portfolio and learning purposes only. Product names,
          trademarks, logos, and images belong to their respective owners.
          <br />
          No affiliation with or endorsement by adidas is implied.
        </Text>
      </Box>
    </Box>
  );
}
