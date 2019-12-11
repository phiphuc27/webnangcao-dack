import React, { useState } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from '@material-ui/core';
import { Form, Spinner, Button } from 'react-bootstrap';
import useForm from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import { ExpandMore } from '@material-ui/icons';
import { FaEdit } from 'react-icons/fa';
import EditProfileModal from '../Profile/EditProfileModal';
import EditSkillModal from '../Profile/EditSkillModal';

const Profile = ({
  user,
  skill,
  isLoading,
  match,
  handleProfileChange,
  handlePhotoChange,
  profile,
  getUserSkill,
  updateSkill,
  deleteSkill,
  handleAddNewSkill
}) => {
  const [expanded, setExpanded] = useState(match.params.tab);
  const [modalProfile, setModalProfile] = useState(false);
  const [modalSkill, setModalSkill] = useState(false);

  const [updateSkillModalShow, setUpdateSkillModalShow] = React.useState(false);
  const [updateSkillText, setUpdateSkillText] = React.useState('');
  const [skillIndex, setSkillIndex] = React.useState(null);

  const { register, handleSubmit } = useForm();

  const { fetching } = profile;

  if (!profile.fetching) {
    if (user) {
      if (skill === null) {
        getUserSkill(user.ID);
      }
    }
  }

  let skillList = null;
  if (skill) {
    skillList = skill.map((value, index) => {
      return (
        <li key={value.ID}>
          {value.KYNANG}
          &nbsp;&nbsp;
          <i
            className="fas fa-edit skill-edit-btn"
            onClick={e => {
              setSkillIndex(value.ID);
              setUpdateSkillModalShow(true);
            }}
          />
          &nbsp;
          <i
            className="far fa-trash-alt skill-delete-btn"
            onClick={e => {
              deleteSkill(value.ID);
            }}
          />
        </li>
      );
    });
  }

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onSubmitUpdate = e => {
    // console.log(e);
    if (updateSkillText === '') return;
    updateSkill(updateSkillText, skillIndex);
    setUpdateSkillModalShow(false);
  };

  return (
    <div className="container">
      {fetching || isLoading ? (
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
                <img src={user.AVATARURL} alt="hình đại diện" />
                <div className="image-overlay">
                  <label htmlFor="edit_picture">
                    <FaEdit />
                    <input
                      type="file"
                      id="edit_picture"
                      name="edit_picture"
                      onChange={e => {
                        handlePhotoChange(e.target.files[0]);
                        if (fetching) window.location = match.path;
                      }}
                    />
                  </label>
                </div>
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
                    <Typography className={`tab-header ${expanded === 'tai-khoan' && 'active'}`}>
                      Thông tin cá nhân
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ul>
                      <li className="active">Thông tin cá nhân</li>
                    </ul>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                {user.LOAI === 2 ? (
                  <ExpansionPanel
                    expanded={expanded === 'yeu-cau'}
                    onChange={handleChange('yeu-cau')}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography className={`tab-header ${expanded === 'yeu-cau' && 'active'}`}>
                        Lịch sử yêu cầu học
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <ul>
                        <li>Đã đăng</li>
                        <li>Đang chờ duyệt</li>
                        <li>Đã duyệt</li>
                        <li>Đã lưu</li>
                      </ul>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ) : (
                  <ExpansionPanel
                    expanded={expanded === 'hop-dong'}
                    onChange={handleChange('hop-dong')}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography className={`tab-header ${expanded === 'hop-dong' && 'active'}`}>
                        Lịch sử hợp đồng học
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <ul>
                        <li>Đã đăng kí</li>
                        <li>Đang chờ nhận</li>
                        <li>Đang học</li>
                        <li>Đã thanh toán</li>
                      </ul>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )}
                {user.LOAI === 2 && (
                  <ExpansionPanel
                    expanded={expanded === 'doanh-thu'}
                    onChange={handleChange('doanh-thu')}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel3bh-content"
                      id="panel3bh-header"
                    >
                      <Typography className={`tab-header ${expanded === 'doanh-thu' && 'active'}`}>
                        Doanh thu
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <ul>
                        <li>Theo tháng</li>
                        <li>Theo năm</li>
                      </ul>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )}
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
                  <div className="col-2" style={{ textAlign: 'end' }}>
                    <button type="button" className="btn" onClick={() => setModalProfile(true)}>
                      Chỉnh sửa
                    </button>
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
                      {user.HO} {user.TEN}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <h5>Giới tính</h5>
                  </div>
                  <div className="col-lg-9 col-sm-6">
                    <p>{user.GIOITINH}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-3 col-sm-6">
                    <h5>Địa chỉ</h5>
                  </div>
                  <div className="col-lg-9 col-sm-6">
                    <p>{user.DIACHI}</p>
                  </div>
                </div>
                <hr />
              </div>
            </div>
            {user.LOAI === 2 && (
              <>
                <div className="info-container">
                  <div className="profile-header">
                    <div className="row">
                      <div className="col-10">
                        <h3>Giới thiệu bản thân</h3>
                      </div>
                      <div className="col-2" style={{ textAlign: 'end' }}>
                        <button type="button" className="btn" onClick={() => setModalProfile(true)}>
                          Chỉnh sửa
                        </button>
                      </div>
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
                        <button type="button" className="btn" onClick={() => setModalSkill(true)}>
                          Chỉnh sửa
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="profile-body">
                    <div className="row">
                      <div className="col-12">
                        <ul className="profile-skill">{skillList}</ul>
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
                            <Form onSubmit={handleSubmit(onSubmitUpdate)} id="update-form">
                              <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Kỹ năng</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Kỹ năng"
                                  name="skill-input"
                                  onChange={e => setUpdateSkillText(e.target.value)}
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
                            <Button variant="primary" type="submit" form="update-form">
                              Xác nhận
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <EditProfileModal
        user={user}
        show={modalProfile}
        onHide={() => setModalProfile(false)}
        onProfileChange={data => handleProfileChange(data)}
      />
      <EditSkillModal
        user={user}
        show={modalSkill}
        onHide={() => setModalSkill(false)}
        onSubmitNewSkill={skill => handleAddNewSkill(skill)}
      />
    </div>
  );
};

export default Profile;
