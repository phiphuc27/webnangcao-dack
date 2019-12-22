/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Spinner, Button, Col, Row } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import 'moment/locale/vi';
import useForm from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { getTutorById } from '../../Actions/tutor';
import { sendRequest } from '../../Actions/contract';

const useStyles = makeStyles({
  errorInput: {
    border: '1px solid #cc0000',
    '&:focus': {
      borderColor: '#cc0000',
      boxShadow: '0 0 0 0.2rem rgba(204,0,0,.25)'
    }
  },

  errorText: {
    color: '#cc0000',
    marginBlockEnd: '10px'
  }
});

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const StudyRequest = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();

  const tutor = useSelector(state => state.tutor.tutor);
  if (tutor.length === 0) {
    dispatch(getTutorById(parseInt(query.get('id'), 10)));
  }

  const { ID, AVATARURL, HO, TEN, DIACHI, THANHPHO, GIA, KYNANG } = tutor;

  const format = 'YYYY-MM-DD';

  const [input, setInput] = useState({
    title: '',
    detail: '',
    phone: '',
    address: '',
    startDate: moment()
      .add(1, 'days')
      .format(format),
    endDate: moment()
      .add(1, 'days')
      .format(format),
    daysOfWeek: '1',
    hoursOfDay: '1'
  });
  const { startDate, endDate, daysOfWeek, hoursOfDay } = input;
  const [price, setPrice] = useState(GIA || '');
  useEffect(() => {
    const days = moment(endDate).diff(moment(startDate), 'days') + 1;
    let tmpPrice = GIA * parseFloat(hoursOfDay) * days;
    if (days > 7) {
      const weeks = moment(endDate).diff(moment(startDate), 'weeks');
      tmpPrice = GIA * parseFloat(hoursOfDay) * parseFloat(daysOfWeek) * weeks;
    }

    setPrice(tmpPrice);
  }, [startDate, endDate, daysOfWeek, hoursOfDay, GIA]);

  const { fetching, fetched } = useSelector(state => state.contract);

  const onSubmit = () => {
    const data = {
      IDND: ID,
      TIEUDE: input.title,
      NOIDUNG: input.detail,
      DIADIEM: input.address,
      DTLIENHE: input.phone,
      NGAYBD: input.startDate,
      NGAYKT: input.endDate,
      SOBUOIDAY: input.daysOfWeek,
      SOGIODAY: input.hoursOfDay,
      TONGTIEN: price,
      TRANGTHAI: 0
    };
    dispatch(sendRequest(data));
  };

  return (
    <div className="container" style={{ marginTop: '3em' }}>
      <div className="info-container">
        <div className="profile-header">
          <div className="row">
            <div className="col-12">
              <h3>Tạo yêu cầu học</h3>
            </div>
          </div>
        </div>
        {fetched ? (
          <div className="profile-body"> 
            <h2 style={{ margin: '1em auto', textAlign:'center' }}>Gửi yêu cầu thành công</h2>
          </div>
        ) : (
          <div className="profile-body">
            <div>
              <h3>Thông tin người dạy</h3>
              <div className="tutor-info">
                <div className="info-image">
                  <img src={AVATARURL} alt="hình đại diện" />
                </div>
                <div className="info-detail">
                  <div className="row">
                    <div className="col-9">
                      <h5>
                        {HO} {TEN}
                      </h5>
                    </div>
                    <div className="col-3">
                      <p>
                        <NumberFormat value={GIA} displayType="text" thousandSeparator suffix="₫" />
                        /h
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-9">
                      <p>{DIACHI}</p>
                    </div>
                    <div className="col-3">
                      <p>{THANHPHO}</p>
                    </div>
                  </div>
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
            </div>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group as={Row} controlId="formBasicEmail">
                <Form.Label column sm={3}>
                  Tóm tắt yêu cầu <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Col sm={9}>
                  {errors.title && <p className={classes.errorText}>{errors.title.message}</p>}
                  <Form.Control
                    className={errors.title && classes.errorInput}
                    type="text"
                    placeholder="Tóm tắt yêu cầu của bạn bằng 1 câu ( tối đa 100 ký tự )"
                    name="title"
                    value={input.title}
                    onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                    ref={register({
                      required: 'Bắt buộc!',
                      maxLength: {
                        value: 100,
                        message: 'Mô tả không được vượt quá 100 ký tự!'
                      }
                    })}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formBasicEmail">
                <Form.Label column sm={3}>
                  Mô tả chi tiết yêu cầu <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Col sm={9}>
                  {errors.detail && <p className={classes.errorText}>{errors.detail.message}</p>}
                  <Form.Control
                    as="textarea"
                    row="5"
                    value={input.detail}
                    onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                    className={errors.detail && classes.errorInput}
                    type="text"
                    placeholder="Mô tả yêu cầu học của bạn "
                    name="detail"
                    ref={register({ required: 'Bắt buộc!' })}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formBasicEmail">
                <Form.Label column sm={3}>
                  Điện thoại liên hệ <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Col sm={9}>
                  {errors.phone && <p className={classes.errorText}>{errors.phone.message}</p>}
                  <Form.Control
                    className={errors.phone && classes.errorInput}
                    type="text"
                    placeholder="Số điện thoại"
                    value={input.phone}
                    onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                    name="phone"
                    ref={register({ required: 'Bắt buộc!' })}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formBasicEmail">
                <Form.Label column sm={3}>
                  Đia điểm dạy <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Col sm={9}>
                  {errors.address && <p className={classes.errorText}>{errors.address.message}</p>}
                  <Form.Control
                    className={errors.address && classes.errorInput}
                    type="text"
                    placeholder="Địa chỉ cụ thể nơi dạy"
                    name="address"
                    value={input.address}
                    onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                    ref={register({ required: 'Bắt buộc!' })}
                  />
                </Col>
              </Form.Group>
              <hr />

              <Form.Group as={Row} controlId="formBasicEmail">
                <Form.Label column sm={3} style={{ lineHeight: '40px' }}>
                  Ngày bắt đầu <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Col sm={3}>
                  <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    format="DD/MM/YYYY"
                    margin="dense"
                    minDate={moment().add(1, 'days')}
                    value={input.startDate}
                    onChange={value => setInput({ ...input, startDate: value.format(format) })}
                  />
                </Col>
                <Form.Label column sm={3} style={{ lineHeight: '40px', textAlign: 'right' }}>
                  Ngày kết thúc <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Col sm={3}>
                  <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    format="DD/MM/YYYY"
                    margin="dense"
                    minDate={moment().add(1, 'days')}
                    value={input.endDate}
                    onChange={value => setInput({ ...input, endDate: value.format(format) })}
                  />
                </Col>
              </Form.Group>
              {moment(endDate).diff(moment(startDate), 'weeks') > 0 && (
                <Form.Group as={Row} controlId="formBasicEmail">
                  <Form.Label column sm={3}>
                    Số buổi học trong tuần <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Check
                      inline
                      type="radio"
                      value={1}
                      label="1 buổi"
                      name="daysOfWeek"
                      onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                      defaultChecked
                    />
                    <Form.Check
                      inline
                      type="radio"
                      value={2}
                      label="2 buổi"
                      name="daysOfWeek"
                      onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      value={3}
                      label="3 buổi"
                      name="daysOfWeek"
                      onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      value={4}
                      label="4 buổi"
                      name="daysOfWeek"
                      onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      value={5}
                      label="5 buổi"
                      name="daysOfWeek"
                      onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      value={6}
                      label="6 buổi"
                      name="daysOfWeek"
                      onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      value={7}
                      label="7 buổi"
                      name="daysOfWeek"
                      onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                    />
                  </Col>
                </Form.Group>
              )}

              <Form.Group as={Row} controlId="formBasicEmail">
                <Form.Label column sm={3}>
                  Số giờ học 1 buổi <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Col sm={9}>
                  <Form.Check
                    inline
                    type="radio"
                    value={1}
                    label="1 h"
                    name="hoursOfDay"
                    defaultChecked
                    onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    value={1.5}
                    label="1.5 h"
                    name="hoursOfDay"
                    onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    value={2}
                    label="2 h"
                    name="hoursOfDay"
                    onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    value={2.5}
                    label="2.5 h"
                    name="hoursOfDay"
                    onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                  />
                </Col>
              </Form.Group>
              <hr />

              <Form.Group as={Row} controlId="formBasicEmail">
                <Form.Label column sm={3}>
                  Học phí dự tính
                </Form.Label>
                <Col sm={9} className="form-radio">
                  <h3 style={{ color: '#0a579d' }}>
                    <b>
                      <NumberFormat value={price} displayType="text" thousandSeparator suffix="₫" />
                    </b>
                  </h3>
                </Col>
              </Form.Group>
              <hr />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {fetching ? (
                  <Button
                    className="disabled"
                    variant="primary"
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Spinner
                      animation="border"
                      variant="light"
                      size="sm"
                      style={{ marginRight: '10px' }}
                    />
                    Loading...
                  </Button>
                ) : (
                  <Button variant="primary" type="submit" size="lg">
                    Gửi yêu cầu
                  </Button>
                )}
              </div>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyRequest;
