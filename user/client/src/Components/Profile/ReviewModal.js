import React, { useState } from 'react';
import Ratings from 'react-ratings-declarative';
import { Form, Button } from 'react-bootstrap';

const ReviewModal = () => {
  const [rating, setRating] = useState(0);
  const [review,setReview] = useState('');
  const changeRating = value => {
    setRating(value);
  };

  const sentReview = () => {
    console.log(rating,review);
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h6>Bạn hãy đánh giá mức độ giảng dạy của gia sư</h6>
      <Ratings
        rating={rating}
        widgetDimensions="30px"
        widgetRatedColors="#FFD700"
        widgetHoverColors="#D4AF37"
        changeRating={changeRating}
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
      <Form.Control
        as="textarea"
        rows="6"
        placeholder={rating<=2 && rating>0 ?'Bạn không hài lòng về vấn đề gì?':"Bạn có góp ý gì cho gia sư không?"}
        style={{ marginBlockStart: '10px', width: '70%' }}
        value={review}
        onChange={(e)=>setReview(e.target.value)}
      />
      <div style={{ marginBlockStart: '1em' }}>
        <Button disabled={rating === 0} onClick={sentReview}>Gửi đánh giá</Button>
      </div>
    </div>
  );
};

export default ReviewModal;
