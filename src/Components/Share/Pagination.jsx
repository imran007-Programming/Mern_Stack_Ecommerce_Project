import React from "react";

const Pagination = ({ pageCount, currentPage, setCurrentPage }) => {
  if (pageCount <= 1) return null; // no pagination needed

  return (
    <div className="join flex flex-row items-center justify-center gap-x-5">
      {/* Prev Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={`bg-black p-2 rounded text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="join flex gap-x-1">
        {Array(pageCount)
          .fill(null)
          .map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page} 
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            );
          })}
      </div>

      {/* Next Button */}
      <button
        disabled={currentPage === pageCount}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={`bg-black p-2 rounded text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
