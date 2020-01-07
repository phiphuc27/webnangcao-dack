import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HomeRounded } from '@material-ui/icons';
import { GoSearch, GoBell } from 'react-icons/go';
import { Spinner, Dropdown } from 'react-bootstrap';
import {
  getTutorRequest,
  getTutorContract,
  getStudentRequest,
  getStudentContract
} from '../../Actions/contract';
import { getChatNotification } from '../../Actions/user';
import {  openChat, getChatHistory } from '../../Actions/tutor';

const Navbar = ({ user, logout, history }) => {
  const dispatch = useDispatch();
  const { all, sent } = useSelector(state => state.contract.request);
  const { onGoing } = useSelector(state => state.contract.contract);
  const { notification } = useSelector(state => state.chat);
  let listChatNoti = [];

  if (!all && user && user.LOAI === 2) {
    dispatch(getTutorRequest(user.ID));
    dispatch(getTutorContract(user.ID));
  }

  if (!all && user && user.LOAI === 3) {
    dispatch(getStudentRequest(user.ID));
    dispatch(getStudentContract(user.ID));
  }

  if (notification.fetched) {
    listChatNoti = notification.list.map((item, index) => {
      return (
        <Dropdown.Item key={item.ID} onClick={e => {
          if (user) {
            dispatch(openChat());
          dispatch(getChatHistory(user.ID, item.ID));
            
          } else {
            history.push('/login');
          }
        }}>
          <div className="noti-item">
            <img src={item.AVATARURL} alt="" />
            <span>{`${item.HO} ${item.TEN}`}</span>
          </div>
        </Dropdown.Item>
      );
    });
  }

  const handleLogout = e => {
    e.preventDefault();
    logout();
    history.push('/');
  };
  return (
    <nav className="nav">
      <div className="container navbar">
        <div className="nav-logo">
          <Link to="/">
            <HomeRounded />
            <span>Logo</span>
          </Link>
        </div>
        <div className="nav-menu">
          <ul>
            <li>
              <a href="/tutors">Danh sách gia sư</a>
            </li>
          </ul>
        </div>
        <div className="nav-search">
          <input type="text" placeholder="Tìm kiếm..." />
          <button type="button">
            <span>
              <GoSearch />
            </span>
          </button>
        </div>

        {user ? (
          <>
            <div className="nav-chat-noti">
              <Dropdown>
                <div
                  onClick={e => {
                    if (!notification.fetching) {
                      dispatch(getChatNotification());
                    }
                  }}
                >
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-chat-noti"
                    className="btn-chat-noti"
                  >
                    <i className="fas fa-comment" />
                  </Dropdown.Toggle>
                </div>
                <Dropdown.Menu className="noti-list">
                  {notification.fetching ? (
                    <Spinner variant="dark" animation="border" />
                  ) : listChatNoti.length > 0 ? (
                    listChatNoti
                  ) : (
                    <Dropdown.Item href="#/action-1">Không có tin nhắn</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="nav-note">
              {user.LOAI === 2 ? (
                <>
                  <a href="/profile/class">
                    <GoBell />
                    {sent && sent.length > 0 && <span>{sent.length}</span>}
                  </a>
                  <div className="dropdown-menu, note-menu">
                    <p>{sent && <span>{sent.length}</span>} yêu cầu chưa duyệt</p>
                  </div>
                </>
              ) : (
                <>
                  <a href="/profile/contract?tab=accepted">
                    <GoBell />
                    {onGoing && onGoing.length > 0 && <span>{onGoing.length}</span>}
                  </a>
                  <div className="dropdown-menu note-menu">
                    <p>{onGoing && <span>{onGoing.length}</span>} hợp đồng chưa hoàn tất</p>
                  </div>
                </>
              )}
            </div>
            <div className="nav-user">
              <div className="user-info">
                <img src={user.AVATARURL} alt="hình đại diện" />
                <p>
                  <b>
                    {user.HO} {user.TEN}
                  </b>
                </p>
              </div>

              <div className="dropdown-menu user-menu">
                <ul>
                  <li>
                    <Link to="/profile/account">Hồ sơ</Link>
                  </li>
                  {user.LOAI === 3 ? (
                    <>
                      <li>
                        <Link to="/profile/contract">Quản lí hợp đồng học</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/profile/class">Quản lí yêu cầu học</Link>
                      </li>
                      <li>
                        <Link to="/profile/revenue">Doanh thu</Link>
                      </li>
                    </>
                  )}
                  <hr />
                  <li>
                    <button type="button" onClick={e => handleLogout(e)}>
                      Thoát tài khoản
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="nav-user">
            <Link to="/register" className="btn btn-secondary">
              Đăng kí
            </Link>
            <Link to="/login" className="btn btn-primary">
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
