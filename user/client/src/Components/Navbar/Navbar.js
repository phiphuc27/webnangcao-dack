import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HomeRounded } from '@material-ui/icons';
import { GoSearch, GoBell } from 'react-icons/go';
import {
  getTutorRequest,
  getTutorContract,
  getStudentRequest,
  getStudentContract
} from '../../Actions/contract';

const Navbar = ({ user, logout, history }) => {
  const dispatch = useDispatch();
  const { all, sent } = useSelector(state => state.contract.request);
  const { onGoing } = useSelector(state => state.contract.contract);

  if (!all && user && user.LOAI === 2) {
    dispatch(getTutorRequest(user.ID));
    dispatch(getTutorContract(user.ID));
  }

  if (!all && user && user.LOAI === 3) {
    dispatch(getStudentRequest(user.ID));
    dispatch(getStudentContract(user.ID));
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
            <div className="nav-note">
              {user.LOAI === 2 ? (
                <a href="/profile/class">
                  <GoBell />
                  {sent && sent.length > 0 && <span>{sent.length}</span>}
                </a>
              ) : (
                <a href="/profile/contract?tab=accepted">
                  <GoBell />
                  {onGoing && onGoing.length > 0 && <span>{onGoing.length}</span>}
                </a>
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
