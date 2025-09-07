import React from "react";

const Pagination = ({ pageCount, page, setPage, nextPage, prevPage }) => {
  return (
    <div className="join flex flex-row items-center justify-center gap-x-5">
      {pageCount > 0 ? (
        <>
          <button
            onClick={() => prevPage()}
            className="bg-black p-2 rounded text-white cursor-pointer"
          >
            Previous
          </button>
          <div className="join">
            {Array(pageCount)
              .fill(null)
              .map((el, index) => {
                return (
                  <button
                    onClick={() => setPage(index + 1)}
                    className={`${
                      page === index + 1 ? "btn-primary" : "bg-black text-white"
                    }  `}
                  >
                    {index + 1}
                  </button>
                );
              })}
          </div>

          <button
            onClick={() => nextPage()}
            className="bg-black p-2 rounded text-white cursor-pointer"
          >
            Next
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pagination;
