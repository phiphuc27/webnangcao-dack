/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { getTutorById } from '../../Actions/tutor';

const SingleTutor = ({ match }) => {
  const tutors = useSelector(state => state.tutor.tutors);
  const fetching = useSelector(state => state.tutor.fetching);
  const dispatch = useDispatch();
  const { id } = match.params;
  if (tutors.length === 0) {
    dispatch(getTutorById(parseInt(id, 10)));
  }
  const { HO, TEN, DIACHI, GIA, KYNANG, GIOITINH, GIOITHIEU, AVATARURL } = tutors;
  return (
    <div className="container">
      {fetching ? (
        <div
          style={{
            height: '86vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spinner style={{ width: '100px', height: '100px' }} variant="dark" animation="border" />
        </div>
      ) : (
        <div className="profile">
          <div className="profile-sidebar">
            <div className="sidebar-container">
              <div className="profile-image">
                <img src={AVATARURL} alt="hình đại diện" />
              </div>
            </div>
          </div>
          <div className="profile-info">
            <div className="info-container">
              <div className="profile-header">
                <div className="row">
                  <div className="col-10">
                    <h3>Thông tin cá nhân</h3>
                  </div>
                </div>
              </div>
              <div className="profile-body">
                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <h5>Họ và tên</h5>
                  </div>
                  <div className="col-lg-9 col-sm-6">
                    <p>
                      {HO} {TEN}
                    </p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <h5>Giới tính</h5>
                  </div>
                  <div className="col-lg-9 col-sm-6">
                    <p>{GIOITINH}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <h5>Địa chỉ</h5>
                  </div>
                  <div className="col-lg-9 col-sm-6">
                    <p>{DIACHI}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <h5>Giá theo giờ</h5>
                  </div>
                  <div className="col-lg-9 col-sm-6">
                    <p>
                      <NumberFormat value={GIA} displayType="text" thousandSeparator suffix="₫" />
                    </p>
                  </div>
                </div>
                <hr />
              </div>
            </div>

            <div className="info-container">
              <div className="profile-header">
                <div className="row">
                  <div className="col-10">
                    <h3>Giới thiệu bản thân</h3>
                  </div>
                  <div className="col-2" style={{ textAlign: 'end' }} />
                </div>
              </div>
              <div className="profile-body">
                <div className="row">
                  <div className="col-12">
                    <p>{GIOITHIEU}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="info-container">
              <div className="profile-header">
                <div className="row">
                  <div className="col-10">
                    <h3>Kỹ năng</h3>
                  </div>
                  <div className="col-2" style={{ textAlign: 'end' }} />
                </div>
              </div>
              <div className="profile-body">
                <div className="row">
                  <div className="col-12">
                    <ul className="profile-skill">
                      {tutors.length !== 0 &&
                        KYNANG.map((item, index) => (
                          <li key={index}>
                            <span>{item.KYNANG}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginBlockStart: '1em' }}>
              <button type="button" className="btn btn-primary">
                Liên hệ gia sư
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleTutor;
