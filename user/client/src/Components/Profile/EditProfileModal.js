/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import useForm from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';
import { allOptions } from '../../data';

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center'
};

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

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const EditProfile = ({ show, onHide, user, onProfileChange }) => {
  const { register, errors, handleSubmit } = useForm();
  const [input, setInput] = useState({
    lastName: user.HO || '',
    firstName: user.TEN || '',
    phone: user.DIENTHOAI || '',
    address: user.DIACHI || '',
    city:
      {
        value: user.THANHPHO,
        label: user.THANHPHO
      } || '',
    gender: user.GIOITINH || 'Nam',
    description: user.GIOITHIEU || ''
  });

  const classes = useStyles();

  const onSubmit = () => {
    const data = {
      HO: input.lastName,
      TEN: input.firstName,
      DIENTHOAI: input.phone,
      DIACHI: input.address,
      THANHPHO: input.city.value,
      GIOITINH: input.gender,
      GIOITHIEU: input.description
    };
    onProfileChange(data);
    onHide();
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Chỉnh sửa hồ sơ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} controlId="formBasicEmail">
            <Form.Label column sm={3}>
              Họ <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                className={errors.lastName && classes.errorInput}
                type="text"
                name="lastName"
                placeholder="Họ"
                defaultValue={input.lastName}
                onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                ref={register({ required: 'Bắt buộc!' })}
              />
              {errors.lastName && <p className={classes.errorText}>{errors.lastName.message}</p>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formBasicEmail">
            <Form.Label column sm={3}>
              Tên <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                className={errors.firstName && classes.errorInput}
                type="text"
                name="firstName"
                placeholder="Tên"
                defaultValue={input.firstName}
                onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                ref={register({ required: 'Bắt buộc!' })}
              />
              {errors.firstName && <p className={classes.errorText}>{errors.firstName.message}</p>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formBasicEmail">
            <Form.Label column sm={3}>
              Điện thoại <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                className={errors.phone && classes.errorInput}
                type="text"
                name="phone"
                placeholder="Điện thoại"
                defaultValue={input.phone}
                onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                ref={register({ required: 'Bắt buộc!' })}
              />
              {errors.phone && <p className={classes.errorText}>{errors.phone.message}</p>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formBasicEmail">
            <Form.Label column sm={3}>
              Địa chỉ cụ thể <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                className={errors.address && classes.errorInput}
                type="text"
                name="address"
                defaultValue={input.address}
                placeholder="Địa chỉ cụ thể"
                onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                ref={register({ required: 'Bắt buộc!' })}
              />
              {errors.address && <p className={classes.errorText}>{errors.address.message}</p>}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formBasicEmail">
            <Form.Label column sm={3}>
              Thành phố <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Col sm={9}>
              <Select
                options={allOptions}
                formatGroupLabel={formatGroupLabel}
                isSearchable
                placeholder="-Chọn thành phố-"
                defaultValue={input.city}
                onChange={value => setInput({ ...input, city: value })}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formBasicEmail">
            <Form.Label column sm={3}>
              Giới tính
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                name="gender"
                defaultValue={input.gender}
                onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </Form.Control>
            </Col>
          </Form.Group>
          {user.LOAI === 2 && (
            <Form.Group as={Row} controlId="formBasicEmail">
              <Form.Label column sm={3}>
                Giới thiệu bản thân <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  className={errors.description && classes.errorInput}
                  as="textarea"
                  row="4"
                  name="description"
                  defaultValue={input.description}
                  placeholder="Mô tả bản thân, bằng cấp, kinh nghiệm,..."
                  onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                  ref={register({ required: 'Bắt buộc!' })}
                />
                {errors.description && (
                  <p className={classes.errorText}>{errors.description.message}</p>
                )}
              </Col>
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Thoát
          </Button>
          <Button type="submit">Cập nhật</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditProfile;
