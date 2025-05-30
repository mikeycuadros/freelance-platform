import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center space-x-4 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-4 py-2 bg-purple-800 text-white rounded disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span className="flex items-center justify-center">{`Página ${currentPage} de ${totalPages}`}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-4 py-2 bg-purple-800 text-white rounded disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
