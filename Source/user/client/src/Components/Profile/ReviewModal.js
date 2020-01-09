import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Ratings from 'react-ratings-declarative';
import { Form, Button, ModalFooter, Spinner } from 'react-bootstrap';
import { sendReview } from '../../Actions/contract';

const ReviewModal = ({ IDND, IDNH, onHide, onBack }) => {
  const { fetching, fetched, successContract } = useSelector(state => state.contract);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const changeRating = value => {
    setRating(value);
  };

  const sentReview = () => {
    const data = {
      IDND,
      IDNH,
      DANHGIA: rating,
      NOIDUNG: review
    };
    console.log(data);
    dispatch(sendReview(data));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {fetching ? (
        <Spinner style={{ width: '100px', height: '100px' }} variant="dark" animation="border" />
      ) : (
        <>
          {fetched ? (
            <h4>Cảm ơn bạn đã đánh giá.</h4>
          ) : (
            <>
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
                placeholder={
                  rating <= 2 && rating > 0
                    ? 'Bạn không hài lòng về vấn đề gì?'
                    : 'Bạn có góp ý gì cho gia sư không?'
                }
                style={{ marginBlockStart: '10px', width: '70%' }}
                value={review}
                onChange={e => setReview(e.target.value)}
              />
              <ModalFooter style={{ marginBlockStart: '1em' }}>
                {successContract ? (
                  <Button onClick={onHide} variant="secondary">
                    Bỏ qua
                  </Button>
                ) : (
                  <Button onClick={onBack} variant="secondary">
                    Trở về
                  </Button>
                )}
                <Button disabled={rating === 0} onClick={sentReview}>
                  Gửi đánh giá
                </Button>
              </ModalFooter>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewModal;
