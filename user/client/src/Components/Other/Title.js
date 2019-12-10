import React from 'react';
import { Link } from 'react-router-dom';

const Title = ({ title }) => {
  return (
    <div className="section-title">
      <h4>
        <Link to="/products">{title}</Link>
      </h4>
    </div>
  );
};

export default Title;
