import React from 'react';
// import { Link } from 'react-router-dom';
import { Form, Spinner, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import useForm from 'react-hook-form';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

const Profile = ({
  isFetching,
  user,
  match,
  getProfile,
  skill,
  addNewSkill,
  updateSkill,
  deleteSkill
}) => {
  const [newSkillModalShow, setNewSkillModalShow] = React.useState(false);
  const [updateSkillModalShow, setUpdateSkillModalShow] = React.useState(false);
  const [expanded, setExpanded] = React.useState(match.params.tabindex);
  const [newSkillText, setNewSkillText] = React.useState('');
  const [updateSkillText, setUpdateSkillText] = React.useState('');
  const [skillIndex, setSkillIndex] = React.useState(null);

  const { register, handleSubmit } = useForm();

  if (!isFetching) {
    if (user !== null) {
      if (user.ID) {
        if (user.ID.toString() !== match.params.id) {
          getProfile(match.params.id);
        }
      }
    } else {
      getProfile(match.params.id);
    }
  }
  var SkillList = null;
  if (skill !== null && skill !== undefined) {
    SkillList = skill.map((value, index) => {
      return (
        <li key={value.ID}>
          {value.KYNANG}
          {'  '}
          <i
            className="fas fa-edit skill-edit-btn"
            onClick={e => {
              setSkillIndex(value.ID);
              setUpdateSkillModalShow(true);
            }}
          ></i>
          {'  '}
          <i
            className="far fa-trash-alt skill-delete-btn"
            onClick={e => {
              deleteSkill(value.ID);
            }}
          ></i>
        </li>
      );
    });
  }

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onSubmit = e => {
    //console.log(e);
    if (newSkillText === '') return;
    addNewSkill(user.ID, newSkillText);
    setNewSkillModalShow(false);
  };

  const onSubmitUpdate = e => {
    //console.log(e);
    if (updateSkillText === '') return;
    updateSkill(updateSkillText, skillIndex);
    setUpdateSkillModalShow(false);
  };

  return (
    <div className="container">
      <div className="profile">
        <div className="profile-sidebar">
          <div className="sidebar-container">
            <div className="profile-image">
              <img src={user ? user.AVATARURL : ''} alt="hình đại diện" />
            </div>

            <div className="profile-tab">
              <ExpansionPanel
                expanded={expanded === 'tai-khoan'}
                onChange={handleChange('tai-khoan')}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    className={`tab-header ${expanded === 'tai-khoan' &&
                      'active'}`}
                  >
                    Thông tin cá nhân
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <ul>
                    <li>Thông tin cá nhân</li>
                  </ul>
                </ExpansionPanelDetails>
              </ExpansionPanel>
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
                <div className="col-2" style={{ textAlign: 'end' }}></div>
              </div>
            </div>
            <div className="profile-body">
              <div className="row">
                <div className="col-lg-3 col-sm-6">
                  <h5>Email</h5>
                </div>
                <div className="col-lg-9 col-sm-6">
                  <p>{user ? user.EMAIL : null}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-lg-3 col-sm-6">
                  <h5>Họ và tên</h5>
                </div>
                <div className="col-lg-9 col-sm-6">
                  <p>
                    {user ? user.HO : null} {user ? user.TEN : null}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-lg-3 col-sm-6">
                  <h5>Giới tính</h5>
                </div>
                <div className="col-lg-9 col-sm-6">
                  <p>{user ? user.GIOITINH : null}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-lg-3 col-sm-6">
                  <h5>Địa chỉ</h5>
                </div>
                <div className="col-lg-9 col-sm-6">
                  <p>{user ? user.DIACHI : null}</p>
                </div>
              </div>
              <hr />
            </div>
          </div>
          {user
            ? user.LOAI === 2 && (
                <>
                  <div className="info-container">
                    <div className="profile-header">
                      <div className="row">
                        <div className="col-10">
                          <h3>Giới thiệu bản thân</h3>
                        </div>
                        <div
                          className="col-2"
                          style={{ textAlign: 'end' }}
                        ></div>
                      </div>
                    </div>
                    <div className="profile-body">
                      <div className="row">
                        <div className="col-12">
                          <p>{user.GIOITHIEU}</p>
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
                        <div className="col-2" style={{ textAlign: 'end' }}>
                          <Button
                            variant="link"
                            onClick={() => setNewSkillModalShow(true)}
                          >
                            Thêm mới
                          </Button>
                          <Modal
                            show={newSkillModalShow}
                            onHide={() => setNewSkillModalShow(false)}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title id="contained-modal-title-vcenter">
                                Thêm kỹ năng mới
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form
                                onSubmit={handleSubmit(onSubmit)}
                                id="new-skill-form"
                              >
                                <Form.Group controlId="exampleForm.ControlInput1">
                                  <Form.Label>Kỹ năng</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Kỹ năng"
                                    name="skill-input"
                                    onChange={e =>
                                      setNewSkillText(e.target.value)
                                    }
                                    ref={register({
                                      required: 'Vui lòng nhập kỹ năng !'
                                    })}
                                  />
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={() => setNewSkillModalShow(false)}
                              >
                                Close
                              </Button>
                              <Button
                                variant="primary"
                                type="submit"
                                form="new-skill-form"
                              >
                                Xác nhận
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </div>
                    </div>
                    <div className="profile-body">
                      <div className="row">
                        <div className="col-12">
                          <ul className="profile-skill">
                            {skill ? (
                              SkillList ? (
                                SkillList
                              ) : (
                                'Chưa có kỹ năng'
                              )
                            ) : (
                              <Spinner
                                animation="border"
                                variant="light"
                                size="sm"
                                style={{ marginRight: '10px' }}
                              />
                            )}
                            <Modal
                              show={updateSkillModalShow}
                              onHide={() => setUpdateSkillModalShow(false)}
                              size="lg"
                              aria-labelledby="contained-modal-title-vcenter"
                              centered
                            >
                              <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                  Chỉnh sửa kỹ năng
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form
                                  onSubmit={handleSubmit(onSubmitUpdate)}
                                  id="update-form"
                                >
                                  <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Kỹ năng</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Kỹ năng"
                                      name="skill-input"
                                      onChange={e =>
                                        setUpdateSkillText(e.target.value)
                                      }
                                      ref={register({
                                        required: 'Vui lòng nhập kỹ năng !'
                                      })}
                                    />
                                  </Form.Group>
                                </Form>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={() => setUpdateSkillModalShow(false)}
                                >
                                  Close
                                </Button>
                                <Button
                                  variant="primary"
                                  type="submit"
                                  form="update-form"
                                >
                                  Xác nhận
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            : null}
        </div>
      </div>
    </div>
  );
};

export default Profile;