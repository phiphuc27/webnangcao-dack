import React from 'react';
import Title from '../Other/Title';

const TutorList = ({ tutors, title }) => {
  return (
    <section className="featured-tutors">
      <Title title={title} />
      <div className="featured-tutors-container">{tutors}</div>
    </section>
  );
};

export default TutorList;
