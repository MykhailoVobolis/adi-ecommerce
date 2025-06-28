import { useCallback, useEffect, useState } from 'react';

export function usePaginated({ dataLength, totalCount }) {
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const hasMore = dataLength < totalCount;

  const handleLoadMore = useCallback(() => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);
    setPage((prev) => prev + 1);
  }, [isFetching, hasMore]);

  useEffect(() => {
    setIsFetching(false);
  }, [dataLength]);

  return {
    page,
    setPage,
    hasMore,
    handleLoadMore,
  };
}
