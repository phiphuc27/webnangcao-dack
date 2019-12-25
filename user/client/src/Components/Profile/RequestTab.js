import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/en-gb';
import { useSelector } from 'react-redux';
import RequestModal from './RequestModal';

const RequestTab = ({ tab }) => {
  const request = useSelector(state => state.contract.request);
  const { sent } = request;

  const contract = useSelector(state => state.contract.contract);
  const { onGoing, paid } = contract;

  const [modalEdit, setModalEdit] = useState({
    request: null,
    show: false
  });
  return (
    <div className="profile-info">
      <div className="info-container">
        <div className="profile-header">
          <div className="row">
            {!tab && (
              <div className="col-12">
                <h3>Yêu cầu được nhận</h3>
              </div>
            )}
            {tab === 'accepted' && (
              <div className="col-12">
                <h3>Yêu cầu đã đồng ý</h3>
              </div>
            )}
            {tab === 'finished' && (
              <div className="col-12">
                <h3>Yêu cầu đã thanh toán</h3>
              </div>
            )}
          </div>
        </div>
        <div className="profile-body">
          {!tab && (
            <>
              <div className="row">
                <div className="col-lg-5 col-sm-4">
                  <h5>Tiêu đề</h5>
                </div>
                <div className="col-lg-4 col-sm-4">
                  <h5>Học viên</h5>
                </div>
                <div className="col-lg-3 col-sm-4">
                  <h5>Trạng thái</h5>
                </div>
              </div>
              <hr />
              {sent &&
                sent.length > 0 &&
                sent.map(item => (
                  <>
                    <div key={item.ID} className="row">
                      <div className="col-lg-5 col-sm-4">
                        <button
                          type="button"
                          className="btn request-title"
                          onClick={() => setModalEdit({ request: item, show: true })}
                        >
                          {item.TIEUDE}
                        </button>
                      </div>
                      <div className="col-lg-4 col-sm-4">
                        <p>
                          {item.HO} {item.TEN}
                        </p>
                      </div>
                      <div className="col-lg-3 col-sm-4">
                        <p style={{ color: 'orange' }}>Đang chờ duyệt...</p>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
            </>
          )}
          {tab === 'accepted' && (
            <>
              <div className="row">
                <div className="col-lg-3 col-sm-4">
                  <h5>Tiêu đề</h5>
                </div>
                <div className="col-lg-3 col-sm-4">
                  <h5>Học viên</h5>
                </div>
                <div className="col-lg-2 col-sm-4">
                  <h5>Ngày bắt đầu</h5>
                </div>
                <div className="col-lg-2 col-sm-4">
                  <h5>Ngày kết thúc</h5>
                </div>
                <div className="col-lg-2 col-sm-4">
                  <h5>Trạng thái</h5>
                </div>
              </div>
              <hr />
              {onGoing &&
                onGoing.length > 0 &&
                onGoing.map(item => (
                  <>
                    <div key={item.ID} className="row">
                      <div className="col-lg-3 col-sm-4">
                        <button
                          type="button"
                          className="btn request-title"
                          onClick={() =>
                            setModalEdit({
                              request: {
                                ...item.CHITIET,
                                ID: item.ID,
                                HO: item.HO,
                                TEN: item.TEN,
                                TRANGTHAIHD: item.TRANGTHAI
                              },
                              show: true
                            })
                          }
                        >
                          {item.CHITIET.TIEUDE}
                        </button>
                      </div>
                      <div className="col-lg-3 col-sm-4">
                        <p>
                          {item.HO} {item.TEN}
                        </p>
                      </div>
                      <div className="col-lg-2 col-sm-4">
                        <p>{moment(item.CHITIET.NGAYBD).format('DD/MM/YYYY')}</p>
                      </div>
                      <div className="col-lg-2 col-sm-4">
                        <p>{moment(item.CHITIET.NGAYKT).format('DD/MM/YYYY')}</p>
                      </div>
                      <div className="col-lg-2 col-sm-4">
                        <p style={{ color: 'green' }}>Đã nhận</p>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
            </>
          )}

          {tab === 'finished' && (
            <>
              <div className="row">
                <div className="col-lg-3 col-sm-4">
                  <h5>Tiêu đề</h5>
                </div>
                <div className="col-lg-3 col-sm-4">
                  <h5>Học viên</h5>
                </div>
                <div className="col-lg-3 col-sm-4">
                  <h5>Tổng tiền</h5>
                </div>
                <div className="col-lg-3 col-sm-4">
                  <h5>Trạng thái</h5>
                </div>
              </div>
              <hr />
              {paid &&
                paid.length > 0 &&
                paid.map(item => (
                  <>
                    <div key={item.ID} className="row">
                      <div className="col-lg-3 col-sm-4">
                        <button
                          type="button"
                          className="btn request-title"
                          onClick={() =>
                            setModalEdit({
                              request: {
                                ...item.CHITIET,
                                ID: item.ID,
                                HO: item.HO,
                                TEN: item.TEN,
                                TRANGTHAIHD: item.TRANGTHAI
                              },
                              show: true
                            })
                          }
                        >
                          {item.CHITIET.TIEUDE}
                        </button>
                      </div>
                      <div className="col-lg-3 col-sm-4">
                        <p>
                          {item.HO} {item.TEN}
                        </p>
                      </div>
                      <div className="col-lg-3 col-sm-4">
                        <p>{item.CHITIET.TONGTIEN}</p>
                      </div>
                      <div className="col-lg-3 col-sm-4">
                        <p style={{ color: 'blue' }}>Đã thanh toán</p>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
            </>
          )}
        </div>
      </div>
      {modalEdit.request && (
        <RequestModal
          request={modalEdit.request}
          show={modalEdit.show}
          onHide={() => setModalEdit({ ...modalEdit, show: false })}
        />
      )}
    </div>
  );
};

export default RequestTab;
