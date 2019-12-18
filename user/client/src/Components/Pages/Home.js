import React from 'react';
import {
  FaThumbsUp,
  FaClock,
  FaMoneyBillWave,
  FaRegHandshake,
  FaMapMarkedAlt,
  FaLaptop
} from 'react-icons/fa';
import Banner from '../Other/Banner';
import Tutor from '../Tutor/Tutor';
import TutorList from '../Tutor/TutorList';
import Title from '../Other/Title';

const Home = ({ tutors, getAllTutors }) => {
  const tutorList = tutors.map(tutor => {
    return <Tutor key={tutor.ID} tutor={tutor} />;
  });

  if (tutors.length === 0) {
    getAllTutors();
  }

  return (
    <div>
      <Banner />
      <div className="container">
        <section className="service">
          <Title title="tìm kiếm gia sư online" />
          <div className="service-list">
            <div className="service-item">
              <h3 className="service-title">
                <span>
                  <FaThumbsUp />
                </span>
                Chất lượng tốt
              </h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, consequatur?</p>
            </div>
            <div className="service-item">
              <h3 className="service-title">
                <span>
                  <FaClock />
                </span>
                Nhanh chóng
              </h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, consequatur?</p>
            </div>
            <div className="service-item">
              <h3 className="service-title">
                <span>
                  <FaLaptop />
                </span>
                Dễ thao tác
              </h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, consequatur?</p>
            </div>
            <div className="service-item">
              <h3 className="service-title">
                <span>
                  <FaRegHandshake />
                </span>
                kết nối trực tiếp
              </h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, consequatur?</p>
            </div>
            <div className="service-item">
              <h3 className="service-title">
                <span>
                  <FaMapMarkedAlt />
                </span>
                lựa chọn đa dạng
              </h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, consequatur?</p>
            </div>
            <div className="service-item">
              <h3 className="service-title">
                <span>
                  <FaMoneyBillWave />
                </span>
                tùy chọn học phí
              </h3>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora, consequatur?</p>
            </div>
          </div>
        </section>
        <TutorList title="Gia sư nổi bật" tutors={tutorList} />
      </div>
    </div>
  );
};

export default Home;
