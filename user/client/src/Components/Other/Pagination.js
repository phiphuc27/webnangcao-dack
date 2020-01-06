import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationDefault = ({ itemPerPage, totalItems, currentPage, paginate, size }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i += 1) {
    pageNumber.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
        {i}
      </Pagination.Item>
    );
  }
  return (
    <div style={{ marginBlockStart: '1rem', display: 'flex', justifyContent: 'center' }}>
      <Pagination size={size && size}>
        {currentPage > 1 && <Pagination.Prev onClick={() => paginate(currentPage - 1)} />}
        {pageNumber}
        {currentPage < Math.ceil(totalItems / itemPerPage) && (
          <Pagination.Next onClick={() => paginate(currentPage + 1)} />
        )}
      </Pagination>
    </div>
  );
};

export default PaginationDefault;
