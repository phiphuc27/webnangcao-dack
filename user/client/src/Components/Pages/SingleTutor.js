/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner, Button } from 'react-bootstrap';
import { Breadcrumbs, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Ratings from 'react-ratings-declarative';
import { getTutorById } from '../../Actions/tutor';
import Pagination from '../Other/Pagination';

const SingleTutor = ({ match }) => {
  const user = useSelector(state => state.user.user);
  const tutor = useSelector(state => state.tutor.tutor);
  const fetching = useSelector(state => state.tutor.fetching);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = match.params;
  if (tutor === '') {
    dispatch(getTutorById(parseInt(id, 10)));
  }
  const {
    HO,
    TEN,
    DIACHI,
    THANHPHO,
    DIENTHOAI,
    GIA,
    KYNANG,
    GIOITINH,
    GIOITHIEU,
    AVATARURL,
    ID,
    DANHGIA
  } = tutor;

  let sum = 0;
  let currentItems;
  let totalItems;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  if (tutor) {
    if (DANHGIA && DANHGIA.length > 0) {
      DANHGIA.map(item => {
        sum += parseInt(item.DANHGIA, 10);
        return item;
      });
      totalItems = DANHGIA;
      currentItems = DANHGIA.slice(indexOfFirstItem, indexOfLastItem);
    }
  }

  const rating = tutor && DANHGIA.length > 0 ? sum / DANHGIA.length : 0;

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };
  console.log(currentItems);

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
        <>
          <br />
          <Breadcrumbs aria-label="breadcrumb">
            <a href="/">Trang chủ</a>
            <a href="/tutors">Danh sách gia sư</a>
            <Typography color="textPrimary">
              {HO} {TEN}
            </Typography>
          </Breadcrumbs>
          <div className="profile">
            <div className="profile-sidebar">
              <div className="sidebar-container">
                <div className="profile-image">
                  <img src={AVATARURL} alt="hình đại diện" />
                </div>
              </div>
              <div style={{ marginBlockStart: '1em' }}>
                {((user && user.LOAI !== 2) || !user) && (
                  <Button
                    block
                    size="lg"
                    type="button"
                    className="btn btn-primary"
                    onClick={() => history.push(`/request?id=${ID}`)}
                  >
                    Mời dạy
                  </Button>
                )}
              </div>
            </div>
            <div className="profile-info">
              <div className="info-container">
                <div className="profile-header">
                  <div className="row">
                    <div className="col-10">
                      <h3>Thông tin gia sư</h3>
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
                      <h5>Thành phố</h5>
                    </div>
                    <div className="col-lg-9 col-sm-6">
                      <p>{THANHPHO}</p>
                    </div>
                  </div>
                    <hr />
                    <div className="row">
                    <div className="col-lg-3 col-sm-6">
                      <h5>Liên hệ</h5>
                    </div>
                    <div className="col-lg-9 col-sm-6">
                      <p>{DIENTHOAI}</p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-lg-3 col-sm-6">
                      <h5>Giá theo giờ</h5>
                    </div>
                    <div className="col-lg-9 col-sm-6">
                      <p style={{ color: 'red', fontWeight: '600' }}>
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
                        {tutor &&
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
              <div className="info-container">
                <div className="profile-header">
                  <div className="row">
                    <div className="col-10">
                      <h3>Đánh giá</h3>
                    </div>
                  </div>
                </div>
                <div className="profile-body">
                  {DANHGIA && DANHGIA.length > 0 ? (
                    <>
                      <div className="row">
                        <div className="col-12" style={{ display: 'flex' }}>
                          <Ratings
                            rating={rating}
                            widgetDimensions="30px"
                            widgetRatedColors="#FFD700"
                          >
                            <Ratings.Widget />
                            <Ratings.Widget />
                            <Ratings.Widget />
                            <Ratings.Widget />
                            <Ratings.Widget />
                          </Ratings>
                          <p style={{ lineHeight: '30px', paddingInlineStart: '5px' }}>
                            {rating.toFixed(2)} sao ( {DANHGIA && DANHGIA.length} đánh giá )
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <ul className="review-list">
                          {DANHGIA &&
                            currentItems.map(item => (
                              <li key={item.ID} className="review-item">
                                <div className="review-info">
                                  <img src={item.AVATARURL} alt="anh dai dien" />
                                  <p>
                                    {item.HO} {item.TEN}
                                  </p>
                                </div>
                                <div className="review-star">
                                  <Ratings
                                    rating={item.DANHGIA}
                                    widgetDimensions="20px"
                                    widgetRatedColors="#FFD700"
                                    widgetSpacings="2px"
                                  >
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                    <Ratings.Widget />
                                  </Ratings>
                                </div>
                                <div className="review-detail">
                                  <p>{item.NOIDUNG}</p>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <Pagination
                        size="sm"
                        itemPerPage={itemPerPage}
                        totalItems={totalItems && totalItems.length}
                        currentPage={currentPage}
                        paginate={paginate}
                      />
                    </>
                  ) : (
                    <h4>Chưa có đánh giá </h4>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleTutor;
