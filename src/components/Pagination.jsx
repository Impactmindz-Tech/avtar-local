import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    onItemsPerPageChange(newItemsPerPage);
    onPageChange(1); // Reset to the first page when items per page changes
  };

  return (
    <div className="pagination-container relative w-full py-3 px-2 lg:px-4 lg:py-4 inline-block" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
      <div className="flex  xl:text-center justify-between lg:flex-row items-center w-full text-sm lg:text-base">
        <div className="flex items-center mb-2 lg:mb-0">
          <button className={`btn btn-outline-primary ${currentPage === 1 ? "disabled opacity-50 cursor-not-allowed" : ""}`} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <IoIosArrowBack className="text-lg lg:text-sm" />
          </button>
          <span className="px-4 py-2 mx-1 lg:text-sm">
            Page: {currentPage} / {totalPages}
          </span>
          <button className={`btn btn-outline-primary ${currentPage === totalPages ? "disabled opacity-50 cursor-not-allowed" : ""}`} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            <IoIosArrowForward className="text-lg lg:text-sm" />
          </button>
        </div>

        {/* Items per page selector - Align Right */}
        <div className="flex items-center">
          <span className="mr-2 text-sm lg:text-sm">Items per page:</span>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="form-select form-select-sm lg:text-sm lg:form-select">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
