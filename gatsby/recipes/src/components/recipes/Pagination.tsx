import React from 'react';
import ReactPaginate from 'react-paginate';

interface Props {
    atPage: number;
    pageCount: number;
    pageRange?: number;
    onPageChange: (value: number) => void;
    className?: string;
}

export const RecipesPagination: React.FC<Props> = ({
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
            activeClassName={'!bg-appAccent !text-white !border-appAccent'}
            pageClassName={
                'flex cursor-pointer items-center justify-center w-8 h-8 border border-[#F0F0F0] rounded-lg text-xs leading-none font-medium text-appAccent lg:w-12 lg:h-12 lg:text-xl lg:leading-none'
            }
            breakClassName={
                'flex cursor-pointer items-center justify-center w-8 h-8 border border-[#F0F0F0] rounded-lg text-xs leading-none font-medium text-appAccent lg:w-12 lg:h-12 lg:text-xl lg:leading-none'
            }
            previousClassName={'hidden'}
            nextClassName={'hidden'}
        />
    );
};
