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

const EditProfile = ({ show, onHide, onSubmitNewSkill, user }) => {
  const { errors, handleSubmit, setError } = useForm();
  const [skills, setSkills] = useState([]);

  const [skill, setSkill] = useState('');

  useEffect(() => {
    setSkill('');
  }, [skills]);

  const classes = useStyles();

  const onSubmit = () => {
    // console.log(skills);
    const data = skills.map(value => {
      return { IDND: user.ID, KYNANG: value };
    });
    onSubmitNewSkill(data);
    onHide();
  };

  const onAddSkill = () => {
    if (skill === '') {
      setError('skills', 'required', 'Bắt buộc !');
      return;
    }
    for (let i = 0; i < skills.length; i += 1) {
      if (skills[i] === skill) {
        setSkill('');
        return;
      }
    }
    setSkills([...skills, skill]);
  };

  const onDeleteSkill = target => {
    const tmpSkills = skills.filter(item => item !== target);
    setSkills(tmpSkills);
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
                  {skills.map((item, index) => (
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
