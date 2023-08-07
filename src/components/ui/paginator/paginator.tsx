import type { Pagination } from '@/types';
import { type FC } from 'react';
import { Button } from '..';

type PaginatorProps = {
  pagination: Pagination;
  onPageChange?: (pageNumber: number) => void;
};

const getPageOptions = (
  currentPage: number,
  totalPages: number,
  pagesToDisplay: number
): number[] => {
  const currentIndex = currentPage - 1;

  if (totalPages <= pagesToDisplay) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentIndex <= pagesToDisplay / 2) {
    return Array.from({ length: pagesToDisplay }, (_, i) => i + 1);
  }

  if (currentIndex >= totalPages - pagesToDisplay / 2) {
    return Array.from(
      { length: pagesToDisplay },
      (_, i) => totalPages - pagesToDisplay + i + 1
    );
  }

  return Array.from({ length: pagesToDisplay }, (_, i) =>
    Math.ceil(currentIndex - pagesToDisplay / 2 + i + 1)
  );
};

export const Paginator: FC<PaginatorProps> = (props) => {
  const { pagination, onPageChange } = props;
  const pageOptions = getPageOptions(
    pagination.pageNumber,
    pagination.pageCount,
    5
  );

  return (
    <div className="join justify-center w-full">
      {pageOptions.map((page) => {
        const isSelected = page === pagination.pageNumber;
        const selectedClass = isSelected ? 'btn-neutral' : '';

        return (
          <Button
            key={page}
            text={page}
            className={`join-item btn btn-md w-12 ${selectedClass}`}
            onClick={() => !isSelected && onPageChange && onPageChange(page)}
          />
        );
      })}
    </div>
  );
};
