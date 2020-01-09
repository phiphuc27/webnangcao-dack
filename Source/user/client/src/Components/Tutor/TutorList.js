import React, { useState } from 'react';
import Pagination from '../Other/Pagination';

const TutorList = ({ tutors }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(12);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = tutors.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <section className="featured-tutors">
      <div className="featured-tutors-container">{currentItems}</div>
      <Pagination
        itemPerPage={itemPerPage}
        totalItems={tutors.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </section>
  );
};

export default TutorList;
