/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
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

const EditProfile = ({ show, onHide, loai }) => {
  const { register, errors, handleSubmit, setError } = useForm();
  const [input, setInput] = useState({
    name: '',
    address: '',
    gender: 'male',
    description: '',
    skills: []
  });

  const [skill, setSkill] = useState('');

  useEffect(() => {
    setSkill('');
  }, [input.skills]);

  const classes = useStyles();

  const onSubmit = () => {
    console.log(input);
  };

  const onAddSkill = () => {
    if (skill === '') {
      setError('skills', 'required', 'Bắt buộc !');
      return;
    }
    for (let i = 0; i < input.skills.length; i += 1) {
      if (input.skills[i] === skill) {
        setSkill('');
        return;
      }
    }
    setInput({ ...input, skills: [...input.skills, skill] });
  };

  const onDeleteSkill = target => {
    const tmpSkills = input.skills.filter(item => item !== target);
    setInput({ ...input, skills: tmpSkills });
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
              Họ và tên <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                className={errors.name && classes.errorInput}
                type="text"
                name="name"
                placeholder="Họ và tên"
                onChange={e => setInput({ ...input, [e.target.name]: e.target.value })}
                ref={register({ required: 'Bắt buộc!' })}
              />
              {errors.name && <p className={classes.errorText}>{errors.name.message}</p>}
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
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </Form.Control>
            </Col>
          </Form.Group>
          {loai === 2 && (
            <>
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
              <Form.Group as={Row} controlId="formBasicEmail">
                <Form.Label column sm={3}>
                  Kĩ năng <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Col sm={9}>
                  <InputGroup>
                    <Form.Control
                      className={errors.skills && classes.errorInput}
                      type="text"
                      name="skills"
                      placeholder="Kĩ năng"
                      value={skill}
                      onChange={e => setSkill(e.target.value)}
                    />
                    <InputGroup.Append>
                      <Button variant="outline-secondary" onClick={onAddSkill}>
                        Thêm
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  {errors.skills && <p className={classes.errorText}>{errors.skills.message}</p>}
                  <div style={{ marginBlockStart: '.8em' }}>
                    <ul className="profile-skill">
                      {input.skills.map((item, index) => (
                        <li key={index} className="skill-group">
                          <p>{item}</p>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => onDeleteSkill(item)}
                          >
                            X
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Form.Group>
            </>
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
