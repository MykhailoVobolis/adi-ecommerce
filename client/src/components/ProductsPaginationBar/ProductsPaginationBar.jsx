import clsx from 'clsx';
import { Button, Flex, Text } from '@radix-ui/themes';

import PaginationProgressBar from '../PaginationProgressBar/PaginationProgressBar.jsx';

import css from './ProductsPaginationBar.module.css';

export default function ProductsPaginationBar({
  page,
  totalPages,
  handlePrevClick,
  handleNextClick,
  hasPreviousPage,
  hasNextPage,
}) {
  return (
    <Flex direction="column" align="center" gap="4">
      <Text as="p" size="2">{`Page: ${page} of ${totalPages} `}</Text>
      <PaginationProgressBar page={page} totalPages={totalPages} />
      <Flex justify="between" width="100%">
        <Button
          className={clsx(css.btn, {
            [css.hidden]: !hasPreviousPage,
          })}
          type="button"
          onClick={handlePrevClick}
        >
          previous
        </Button>
        <Button
          className={clsx(css.btn, {
            [css.hidden]: !hasNextPage,
          })}
          type="button"
          onClick={handleNextClick}
        >
          next
        </Button>
      </Flex>
    </Flex>
  );
}
