import { Box, Heading } from '@radix-ui/themes';

import css from './AccountFavoritesPage.module.css';

export default function AccountFavoritesPage() {
  return (
    <Box className={css.wrapper}>
      <Heading className="responsivePageHeading responsivePageHeading--7" as="h2" size="7" mb="6" weight="bold">
        MY WISHLIST
      </Heading>
    </Box>
  );
}
