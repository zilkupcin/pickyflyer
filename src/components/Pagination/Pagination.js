import React from "react";
import { ReactComponent as PrevPageImg } from "../../images/previous-page.svg";
import { ReactComponent as NextPageImg } from "../../images/next-page.svg";

const Pagination = ({ currentPage, pageCount, onPageChange }) => {
  const handleNextClick = () => {
    currentPage < pageCount && onPageChange("next");
  };

  const handlePrevClick = () => {
    currentPage > 1 && onPageChange("prev");
  };

  if (pageCount === 1) {
    return null;
  }

  return (
    <div className="pagination">
      <div
        className={
          currentPage === 1
            ? "pagination__btn pagination__btn--disabled"
            : "pagination__btn"
        }
        onClick={handlePrevClick}
        data-type="prev"
      >
        <PrevPageImg className="pagination__image" width="16" height="16" />
      </div>
      <span className="pagination_page-indicator">
        Page {currentPage} of {pageCount}
      </span>
      <div
        className={
          currentPage === pageCount
            ? "pagination__btn pagination__btn--disabled"
            : "pagination__btn"
        }
        onClick={handleNextClick}
        data-type="next"
      >
        <NextPageImg className="pagination__image" width="16" height="16" />
      </div>
    </div>
  );
};

export default Pagination;
