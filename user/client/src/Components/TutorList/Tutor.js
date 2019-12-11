import React, { useState } from 'react';
import NumberFormat from 'react-number-format';

const Product = ({ tutor }) => {
  const { ID, HO, TEN, DIACHI, AVATARURL } = tutor;
  const link = `/products/${ID}`;
  return (
    <div>
      <div className="card">
        <div className="card-image">
          <a href={link}>
            <img src={AVATARURL} alt="anh dai dien" />
          </a>
        </div>
        <div className="card-info">
          <h6>
            <a href={link}>
              {HO} {TEN}
            </a>
          </h6>
          <p>
            <NumberFormat value={10000} displayType="text" thousandSeparator suffix="₫" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
