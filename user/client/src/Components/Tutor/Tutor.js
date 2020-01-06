/* eslint-disable react/no-array-index-key */
import React from 'react';
import NumberFormat from 'react-number-format';

const Product = ({ tutor }) => {
  const { ID, HO, TEN, THANHPHO, AVATARURL, GIA, KYNANG } = tutor;
  const link = `/tutors/${ID}`;
  return (
    <div>
      <div className="card">
        <div className="card-info">
          <div className="card-image">
            <a href={link}>
              <img src={AVATARURL} alt="anh dai dien" />
            </a>
          </div>
          <div className="card-name">
            <h6>
              <a href={link}>
                {HO} {TEN}
              </a>
            </h6>
          </div>
          <div className="card-price">
            <NumberFormat value={GIA} displayType="text" thousandSeparator suffix="₫" />
            <span>/h</span>
          </div>
          <div className="card-address">
            <p>{THANHPHO}</p>
          </div>
        </div>
        <div className="card-skill">
          <hr />
          <ul className="profile-skill">
            {KYNANG.map((item, index) => (
              <li key={index}>
                <span>{item.KYNANG}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <a href={link} className="btn btn-primary">
            Xem chi tiết
          </a>
        </div>
      </div>
    </div>
  );
};

export default Product;
