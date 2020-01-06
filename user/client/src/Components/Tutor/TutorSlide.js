import React from 'react';
import Title from '../Other/Title';

const TutorSlide = ({ tutors, title }) => {
  const currentItems = tutors.slice(0, 4);

  return (
    <section className="featured-tutors">
      {title && <Title title={title} />}
      <div className="featured-tutors-slide">{currentItems}</div>
    </section>
  );
};

export default TutorSlide;
