import { useContext } from "react";
import { PokemonContext } from "../contexts/PokemonContext";

const Pagination = () => {
  const { currentPage, totalPages, itemsPerPage, dispatch } =
    useContext(PokemonContext);

  const handlePageChange = (page) => {
    dispatch({ type: "SET_PAGE", payload: page });
  };

  const handleItemsPerPageChange = (e) => {
    dispatch({ type: "SET_ITEMS_PER_PAGE", payload: Number(e.target.value) });
  };

  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        <label>Items per page:</label>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      <div className="pagination-buttons">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={pageNum === currentPage ? "active-page" : ""}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
