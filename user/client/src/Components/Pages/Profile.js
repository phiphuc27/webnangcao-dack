import React from 'react';
import { Link } from 'react-router-dom';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

const Profile = ({ user, match }) => {
  const [expanded, setExpanded] = React.useState(match.params.tab);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="container">
      <div className="profile">
        <div className="profile-sidebar">
          <div className="sidebar-container">
            <div className="profile-image">
              <img src={user.AVATARURL} alt="hình đại diện" />
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
                    <li>Thông tin cá nhân</li>
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
                  <Link to="/profile/edit">Chỉnh sửa</Link>
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
                      <Link to="/profile/edit">Chỉnh sửa</Link>
                    </div>
                  </div>
                </div>
                <div className="profile-body">
                  <div className="row">
                    <div className="col-12">
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, illo.
                        Aspernatur consequuntur consectetur totam. Quibusdam eius consequatur
                        reprehenderit. Deleniti velit at doloremque quo veniam eveniet fugiat nulla
                        quaerat! Et laboriosam, laudantium excepturi error, nesciunt ad veniam fuga
                        tempora corrupti atque distinctio, itaque libero ut qui. Nesciunt autem
                        dolores iure inventore!
                      </p>
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
                      <Link to="/profile/edit">Chỉnh sửa</Link>
                    </div>
                  </div>
                </div>
                <div className="profile-body">
                  <div className="row">
                    <div className="col-12">
                      <ul className="profile-skill">
                        <li>Kỹ năng 1</li>
                        <li>Kỹ năng 2</li>
                        <li>Kỹ năng 3</li>
                        <li>Kỹ năng 4</li>
                        <li>Kỹ năng 5</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
