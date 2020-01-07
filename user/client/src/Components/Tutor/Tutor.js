/* eslint-disable react/no-array-index-key */
import React from 'react';
import NumberFormat from 'react-number-format';
import Ratings from 'react-ratings-declarative';

const Product = ({ tutor }) => {
  const { ID, HO, TEN, THANHPHO, AVATARURL, GIA, KYNANG, DANHGIA } = tutor;
  const link = `/tutors/${ID}`;
  let sum = 0;
  if (tutor) {
    if (DANHGIA && DANHGIA.length > 0) {
      DANHGIA.map(item => {
        sum += parseInt(item.DANHGIA, 10);
        return item;
      });
    }
  }

  const rating = tutor && DANHGIA.length > 0 ? sum / DANHGIA.length : 0;
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
          <div className="card-star">
            {DANHGIA && DANHGIA.length > 0 ? (
              <>
                {' '}
                <Ratings
                  rating={rating}
                  widgetDimensions="25px"
                  widgetRatedColors="#FFD700"
                  widgetSpacings="2px"
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>
                <p>{rating.toFixed(2)} sao</p>
              </>
            ) : (
              <p>Chưa có đánh giá</p>
            )}
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
