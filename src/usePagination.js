import { MAX_PAGES_TO_SHOW, PAGE_SIZE } from "./App";

export function usePagination({ pageNum, setPageNum, count }) {
  const pagesCount = Math.ceil(count / PAGE_SIZE);

  const canIncrement = pageNum < pagesCount;
  const canDecrement = pageNum > 1;
  const decPage = () => {
    if (canDecrement) setPageNum((p) => p - 1);
  };
  const incPage = () => {
    if (canIncrement) setPageNum((p) => p + 1);
  };

  // todo: don't show pages above pageCount
  const pages = Array.from(
    { length: MAX_PAGES_TO_SHOW },
    (_, i) => pageNum + i
  );

  return {
    canDecrement,
    canIncrement,
    incPage,
    decPage,
    pages,
    pagesCount,
  };
}
