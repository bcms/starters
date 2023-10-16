import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  atPage: number;
  pageCount: number;
  pageRange?: number;
  onPageChange: (value: number) => void;
  className?: string;
}
export const RecipesPagination: React.FC<PaginationProps> = ({
  atPage,
  pageCount,
  pageRange = 4,
  onPageChange,
  className = '',
}) => {
  return (
    <ReactPaginate
      className={className}
      forcePage={atPage - 1}
      pageCount={pageCount}
      pageRangeDisplayed={pageRange}
      marginPagesDisplayed={2}
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={<span>...</span>}
      onPageChange={({ selected }) => onPageChange(selected)}
      containerClassName={'pagination'}
      activeClassName={'pagination--item-active'}
      pageClassName={'pagination--item'}
      breakClassName={'pagination--item'}
      previousClassName={'hidden'}
      nextClassName={'hidden'}
    />
  );
};
