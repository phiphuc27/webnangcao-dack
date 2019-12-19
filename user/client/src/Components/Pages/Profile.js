import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import { ExpandMore } from '@material-ui/icons';
import { FaEdit } from 'react-icons/fa';

import AccountTab from '../Profile/AccountTab';
import PasswordTab from '../Profile/PasswordTab';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Profile = ({
  user,
  isLoading,
  match,
  handleProfileChange,
  handlePhotoChange,
  profile,
  handleAddNewSkill
}) => {
  const query = useQuery();

  const { tab } = match.params;

  const [expanded, setExpanded] = useState(tab);
  const [subExpanded, setSubExpanded] = useState(query.get('tab'));

  const { fetching } = profile;

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
                  expanded={expanded === 'account'}
                  onChange={handleChange('account')}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={`tab-header ${expanded === 'account' && 'active'}`}>
                      Thông tin cá nhân
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ul>
                      <li>
                        <a
                          href="/profile/account"
                          className={!subExpanded && tab === 'account' ? 'active-link' : undefined}
                        >
                          Thông tin cá nhân
                        </a>
                      </li>
                      <li>
                        <a
                          href="/profile/account?tab=password"
                          className={subExpanded === 'password' ? 'active-link' : undefined}
                        >
                          Thay đổi mật khẩu
                        </a>
                      </li>
                    </ul>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                {user.LOAI === 2 ? (
                  <ExpansionPanel expanded={expanded === 'class'} onChange={handleChange('class')}>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography className={`tab-header ${expanded === 'class' && 'active'}`}>
                        Quản lí yêu cầu học
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <ul>
                        <li>
                          <a
                            href="/profile/class"
                            className={!subExpanded && tab === 'class' ? 'active-link' : undefined}
                          >
                            Đã nhận
                          </a>
                        </li>
                        <li>
                          <a
                            href="/profile/class?tab=accepted"
                            className={
                              subExpanded === 'accepted' && tab === 'class'
                                ? 'active-link'
                                : undefined
                            }
                          >
                            Đã đồng ý
                          </a>
                        </li>
                        <li>
                          <a
                            href="/profile/class?tab=finished"
                            className={
                              subExpanded === 'finished' && tab === 'class'
                                ? 'active-link'
                                : undefined
                            }
                          >
                            Đã hoàn tất
                          </a>
                        </li>
                      </ul>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ) : (
                  <ExpansionPanel
                    expanded={expanded === 'contract'}
                    onChange={handleChange('contract')}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography className={`tab-header ${expanded === 'contract' && 'active'}`}>
                        Quản lí hợp đồng học
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <ul>
                        <li>
                          <a
                            href="/profile/contract"
                            className={
                              !subExpanded && tab === 'contract' ? 'active-link' : undefined
                            }
                          >
                            Đã đăng kí
                          </a>
                        </li>
                        <li>
                          <a
                            href="/profile/contract?tab=accepted"
                            className={
                              subExpanded === 'accepted' && tab === 'contract'
                                ? 'active-link'
                                : undefined
                            }
                          >
                            Đã chấp nhận
                          </a>
                        </li>
                        <li>
                          <a
                            href="/profile/contract?tab=paid"
                            className={
                              subExpanded === 'paid' && tab === 'contract'
                                ? 'active-link'
                                : undefined
                            }
                          >
                            Đã thanh toán
                          </a>
                        </li>
                      </ul>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )}
                {user.LOAI === 2 && (
                  <ExpansionPanel
                    expanded={expanded === 'revenue'}
                    onChange={handleChange('revenue')}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel3bh-content"
                      id="panel3bh-header"
                    >
                      <Typography className={`tab-header ${expanded === 'revenue' && 'active'}`}>
                        Doanh thu
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <ul>
                        <li>
                          <a
                            href="/profile/revenue?tab=month"
                            className={
                              subExpanded === 'month' && tab === 'revenue'
                                ? 'active-link'
                                : undefined
                            }
                          >
                            Theo tháng
                          </a>
                        </li>
                        <li>
                          <a
                            href="/profile/revenue?tab=year"
                            className={
                              subExpanded === 'year' && tab === 'revenue'
                                ? 'active-link'
                                : undefined
                            }
                          >
                            Theo năm
                          </a>
                        </li>
                      </ul>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )}
              </div>
            </div>
          </div>
          {tab === 'account' && !subExpanded && (
            <AccountTab
              user={user}
              handleAddNewSkill={handleAddNewSkill}
              handleProfileChange={handleProfileChange}
            />
          )}
          {tab === 'account' && subExpanded === 'password' && <PasswordTab user={user} />}
        </div>
      )}
    </div>
  );
};

export default Profile;
