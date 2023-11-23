import React from 'react';
import { MAX_PAGES_DISPLAYED } from '../utils/consts';
const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const halfMaxPages = Math.floor(MAX_PAGES_DISPLAYED / 3);

    let startPage = currentPage - halfMaxPages;
    let endPage = currentPage + halfMaxPages;

    if (startPage <= 0) {
      startPage = 1;
      endPage = MAX_PAGES_DISPLAYED;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - MAX_PAGES_DISPLAYED + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <nav>
      <ul className="pagination">
        {generatePageNumbers().map((pageNumber) => (
          <li key={pageNumber} className={pageNumber === currentPage ? 'active' : ''}>
            <button onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
          </li>
        ))}
        {totalPages > MAX_PAGES_DISPLAYED && currentPage < totalPages - MAX_PAGES_DISPLAYED + 1 && (
          <li className="ellipsis">...</li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;