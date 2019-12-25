import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, ModalFooter, Spinner, Row, Col } from 'react-bootstrap';
import { sendRefund } from '../../Actions/contract';

const RefundModal = ({ IDND, IDNH, onHide }) => {
  const { fetching, fetched } = useSelector(state => state.contract);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  const sentReview = () => {
    const data = {
      IDND,
      IDNH,
      TIEUDE: title,
      NOIDUNG: review
    };
    console.log(data);
    dispatch(sendRefund(data));
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
            <h4>
              Cảm ơn bạn đã gửi khiếu nại cho quản trị viên. Chúng tôi sẽ giả quyết cho bạn nhanh
              nhất có thể.
            </h4>
          ) : (
            <>
              <h6>Bạn muốn khiếu nại về điều gì? </h6>
              <Form.Group as={Row} controlId="formBasicEmail" style={{ width: '80%' }}>
                <Form.Label column sm={3}>
                  Tiêu đề
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formBasicEmail" style={{ width: '80%' }}>
                <Form.Label column sm={3}>
                  Nội dung
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as="textarea"
                    rows="6"
                    value={review}
                    onChange={e => setReview(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <ModalFooter style={{ marginBlockStart: '1em' }}>
                <Button onClick={onHide} variant="secondary">
                  Trở về
                </Button>
                <Button disabled={review === ''} onClick={sentReview}>
                  Gửi khiếu nại
                </Button>
              </ModalFooter>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default RefundModal;
