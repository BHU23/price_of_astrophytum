import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  classCount: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  itemsPerPage,
    totalPages,
  classCount,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between bg-background px-4 py-5 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {/* <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-tan "
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button> */}
      </div>
      <div className="flex flex-1 items-center justify-between flex-wrap sm:flex-nowrap gap-5">
        <div className="flex items-center justify-end w-full sm:justify-start">
          <p className="text-sm ">
            <span className="text-cta-gray">Showing </span>
            <span className="font-medium text-cta-text">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            <span className="text-cta-gray">to </span>
            <span className="font-medium text-cta-text">
              {Math.min(currentPage * itemsPerPage, classCount)}
            </span>{" "}
            <span className="text-cta-gray">of </span>
            <span className="font-medium text-cta-text">{classCount}</span>{" "}
            <span className="text-cta-gray">results </span>
          </p>
        </div>
        <div className="flex items-center justify-end w-full">
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-cta-gray border-y border-l border-gray-300 dark:hover:bg-gray-700 dark:hover:border-gray-600 hover:bg-white focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <FiChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              const isNearFirstPage = page === 1;
              const isNearLastPage = page === totalPages;
              const isCurrentOrAdjacentPage = Math.abs(currentPage - page) <= 1;

              // Ellipses conditions
              const showEllipsisBefore = currentPage > 3 && page === 2;
              const showEllipsisAfter =
                currentPage < totalPages - 2 && page === totalPages - 1;

              if (
                isNearFirstPage ||
                isNearLastPage ||
                isCurrentOrAdjacentPage
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 dark:hover:bg-gray-700 dark:hover:border-gray-600 hover:bg-white ${
                      currentPage === page
                        ? "bg-white dark:bg-gray-800 dark:border-gray-300 text-cta-text border hover:bg-gray-50"
                        : "text-cta-gray hover:text-cta-text"
                    } focus:z-20`}
                  >
                    {page}
                  </button>
                );
              } else if (showEllipsisBefore || showEllipsisAfter) {
                return (
                  <span
                    key={`ellipsis-${page}`}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300"
                  >
                    ...
                  </span>
                );
              }

              return null;
            })}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-cta-gray border-y border-r border-gray-300 dark:hover:bg-gray-700 dark:hover:border-gray-600 hover:bg-white focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <FiChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
