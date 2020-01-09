import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import banner1 from '../../images/banner1.jpg';
import banner2 from '../../images/banner2.jpg';
import banner3 from '../../images/banner3.jpg';

function Banner() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return (
    <Carousel activeIndex={index} direction={direction} onSelect={handleSelect} wrap="true">
      <Carousel.Item>
        <Link to="/tutors">
          <img className="d-block w-100 " src={banner1} alt="First slide" />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/tutors">
          <img className="d-block w-100 " src={banner2} alt="Second slide" />
        </Link>
      </Carousel.Item>
      <Carousel.Item>
        <Link to="/tutors">
          <img className="d-block w-100 " src={banner3} alt="Third slide" />
        </Link>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
