import { Flex } from '@radix-ui/themes';

import css from './PaginationProgressBar.module.css';

export default function PaginationProgressBar({ page, totalPages }) {
  const percentage = totalPages > 0 ? (page / totalPages) * 100 : 0;

  return (
    <Flex className={css.container}>
      <div className={css.track}>
        <div className={css.fill} style={{ width: `${percentage}%` }} />
      </div>
    </Flex>
  );
}
