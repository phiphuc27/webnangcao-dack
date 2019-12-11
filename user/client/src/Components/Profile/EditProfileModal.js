/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import useForm from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';

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

const EditProfile = ({ show, onHide, user, onProfileChange }) => {
  const { register, errors, handleSubmit } = useForm();
  const [input, setInput] = useState({
    lastName: user.HO || '',
    firstName: user.TEN || '',
    address: user.DIACHI || '',
    gender: user.GIOITINH || 'Nam',
    description: user.GIOITHIEU || ''
  });

  const classes = useStyles();

  const onSubmit = e => {
    e.preventDefault();
    const data = {
      HO: input.lastName,
      TEN: input.firstName,
      DIACHI: input.address,
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
      <Form onSubmit={e => handleSubmit(onSubmit(e))}>
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
                onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                ref={register({ required: 'Bắt buộc!' })}
              />
              {errors.firstName && <p className={classes.errorText}>{errors.firstName.message}</p>}
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
                placeholder="Địa chỉ cụ thể"
                onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                ref={register({ required: 'Bắt buộc!' })}
              />
              {errors.address && <p className={classes.errorText}>{errors.address.message}</p>}
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
                value={input.gender}
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
