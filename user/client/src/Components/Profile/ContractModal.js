import React from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import { payContract } from '../../Actions/contract';

const ContractModal = ({ contract, show, onHide }) => {
  const dispatch = useDispatch();
  const {
    ID,
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
    TONGTIEN
  } = contract;

  const onPay = () => {
    const data = {
      id: ID,
      value: {
        TRANGTHAI: 2
      }
    };
    dispatch(payContract(data));
    alert('Đã thanh toán.');
    window.location = `${window.location}`;
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
        <Modal.Title id="contained-modal-title-vcenter">Chi tiết yêu cầu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
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
              <h5>Họ tên người học</h5>
            </div>
            <div className="col-lg-8 col-sm-6">
              <p>
                {HO} {TEN}
              </p>
            </div>
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
                <NumberFormat value={TONGTIEN} displayType="text" thousandSeparator suffix="₫" />
              </h4>
            </div>
          </div>
        </div>
      </Modal.Body>
      {TRANGTHAI !== 2 && (
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Hủy
          </Button>
          <Button onClick={onPay}>Thanh toán</Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ContractModal;
