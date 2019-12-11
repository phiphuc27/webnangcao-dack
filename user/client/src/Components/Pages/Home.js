import React from 'react';
import Banner from '../Other/Banner';
import Tutor from '../TutorList/Tutor';
import TutorList from '../TutorList/TutorList';

const Home = ({ tutors }) => {
  const tutorList = tutors.map(tutor => {
    return <Tutor key={tutor.id} tutor={tutor} />;
  });
  return (
    <div>
      <Banner />
      <div className="container">
        <TutorList title="Gia sư nổi bật" tutors={tutorList} />
      </div>
    </div>
  );
};

export default Home;
