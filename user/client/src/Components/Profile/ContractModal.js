import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { finishContract } from '../../Actions/contract';
import ReviewModal from './ReviewModal';
import RefundModal from './RefundModal';

const ContractModal = ({ contract, show, onHide }) => {
  const { fetched } = useSelector(state => state.contract);
  const dispatch = useDispatch();
  const {
    ID,
    IDND,
    IDNH,
    TIEUDE,
    HO,
    TEN,
    NOIDUNG,
    DIADIEM,
    DTLIENHE,
    NGAYBD,
    NGAYKT,
    SOBUOIDAY,
    SOGIODAY,
    TRANGTHAI,
    TRANGTHAIHD,
    TONGTIEN
  } = contract;

  const [reviewModal, setReviewModal] = useState(false);
  const [refundModal, setRefundModal] = useState(false);

  const onFinish = () => {
    const data = {
      id: ID,
      value: {
        TRANGTHAI: 2
      }
    };
    dispatch(finishContract(data));
    setReviewModal(true);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {reviewModal && 'Đánh giá'}
          {refundModal && 'Khiếu nại'}
          {!refundModal && !reviewModal && 'Chi tiết yêu cầu'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {reviewModal ? (
          <>
            <ReviewModal
              IDND={IDND}
              IDNH={IDNH}
              onHide={() => {
                onHide();
                setReviewModal(false);
                window.location = `${window.location}`;
              }}
              onBack={() => setReviewModal(false)}
            />
          </>
        ) : (
          <>
            {refundModal ? (
              <>
                <RefundModal
                  IDND={IDND}
                  IDNH={IDNH}
                  onHide={() => {
                    setRefundModal(false);
                  }}
                />
              </>
            ) : (
              <>
                <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <h5>Tiêu đề</h5>
                  </div>
                  <div className="col-lg-8 col-sm-6">
                    <p>
                      <b>{TIEUDE}</b>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <h5>Họ tên gia sư</h5>
                  </div>
                  <div className="col-lg-5 col-sm-6">
                    <p>
                      {HO} {TEN}
                    </p>
                  </div>
                  {TRANGTHAIHD === 2 && (
                    <div className="col-lg-3 col-sm-6">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setReviewModal(true)}
                      >
                        Đánh giá
                      </button>
                    </div>
                  )}
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <h5>Nội dung</h5>
                  </div>
                  <div className="col-lg-8 col-sm-6">
                    <p style={{ overflowWrap: 'break-word' }}>{NOIDUNG}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <h5>Địa điểm dạy</h5>
                  </div>
                  <div className="col-lg-8 col-sm-6">
                    <p>{DIADIEM}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <h5>Điện thoại liên hệ</h5>
                  </div>
                  <div className="col-lg-8 col-sm-6">
                    <p>{DTLIENHE}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <h5>Ngày bắt đầu</h5>
                  </div>
                  <div className="col-lg-8 col-sm-6">
                    <p>{moment(NGAYBD).format('DD/MM/YYYY')}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <h5>Ngày kết thúc</h5>
                  </div>
                  <div className="col-lg-8 col-sm-6">
                    <p>{moment(NGAYKT).format('DD/MM/YYYY')}</p>
                  </div>
                </div>
                <hr />
                {moment(NGAYKT).diff(moment(NGAYBD), 'weeks') > 0 && (
                  <>
                    <div className="row">
                      <div className="col-lg-4 col-sm-6">
                        <h5>Số buổi dạy</h5>
                      </div>
                      <div className="col-lg-8 col-sm-6">
                        <p>{SOBUOIDAY} buổi</p>
                      </div>
                    </div>
                    <hr />
                  </>
                )}
                <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <h5>Số giờ dạy 1 buổi</h5>
                  </div>
                  <div className="col-lg-8 col-sm-6">
                    <p>{SOGIODAY} giờ</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <h5>Tổng tiền</h5>
                  </div>
                  <div className="col-lg-8 col-sm-6">
                    <h4>
                      <NumberFormat
                        value={TONGTIEN}
                        displayType="text"
                        thousandSeparator
                        suffix="₫"
                      />
                    </h4>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </Modal.Body>
      {TRANGTHAIHD !== 2 && TRANGTHAI === 1 && !reviewModal && !refundModal && (
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Hủy
          </Button>
          <Button onClick={() => setRefundModal(true)} variant="danger">
            Khiếu nại
          </Button>
          <Button onClick={onFinish}>Hoàn tất</Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ContractModal;
