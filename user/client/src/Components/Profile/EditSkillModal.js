/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import useForm from 'react-hook-form';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import { getAllSkills, searchSkill } from '../../Actions/tutor';

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
  let allSkills = useSelector(state => state.tutor.skills);
  const dispatch = useDispatch();

  if (allSkills.length === 0) {
    dispatch(getAllSkills());
  }
  allSkills = allSkills.map(skill => {
    return {
      value: skill.ID,
      label: skill.KYNANG
    };
  });
  const { errors, handleSubmit, setError } = useForm();
  const [skills, setSkills] = useState(user.KYNANG.map(item => item.KYNANG) || []);

  const [skill, setSkill] = useState('');

  useEffect(() => {
    setSkill('');
  }, [skills]);

  useEffect(() => {
    dispatch(searchSkill(skill));
  }, [skill, dispatch]);

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
    console.log(skill.label);
    if (skill.label === undefined) {
      setError('skills', 'required', 'Bắt buộc !');
      return;
    }
    for (let i = 0; i < skills.length; i += 1) {
      if (skills[i] === skill.label) {
        setSkill('');
        return;
      }
    }
    setSkills([...skills, skill.label]);
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
      className="skill-edit"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Chỉnh sửa kỹ năng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} controlId="formBasicEmail">
            <Form.Label column sm={3}>
              Kĩ năng <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <Col sm={9}>
              <InputGroup>
                <Select
                  placeholder="Kĩ năng"
                  options={allSkills}
                  isSearchable
                  value={skill}
                  onChange={value => setSkill(value)}
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
                  {skills.map((value, index) => (
                    <li key={index}>
                      {value}
                      &nbsp;&nbsp;
                      <i
                        role="presentation"
                        className="far fa-trash-alt skill-delete-btn"
                        onClick={() => {
                          onDeleteSkill(value);
                        }}
                      />
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
