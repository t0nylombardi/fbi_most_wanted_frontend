import React from "react";

type PaginationControllsProps = {
  handlePrevPage: () => void;
  currentPage: number;
  handleNextPage: () => void;
  startIndex: number;
  itemsPerPage: number;
  personsLength: number;
};

const PaginationControlls = ({
  handlePrevPage,
  currentPage,
  handleNextPage,
  startIndex,
  itemsPerPage,
  personsLength,
}: PaginationControllsProps) => {
  return (
    <div className="flex flex-row justify-end">
      <div className="pagination-controls">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="mx-2 p-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={startIndex + itemsPerPage >= personsLength}
          className="mx-2 p-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationControlls;
