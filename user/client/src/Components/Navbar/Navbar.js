import React from 'react';
import { Link } from 'react-router-dom';
import { HomeRounded } from '@material-ui/icons';
import { GoSearch } from 'react-icons/go';

const index = ({ user, logout, history }) => {
  const handleLogout = e => {
    e.preventDefault();
    logout();
    history.push('/');
  };
  return (
    <nav>
      <div className="container navbar">
        <div className="nav-logo">
          <Link to="/">
            <HomeRounded />
            <span>Logo</span>
          </Link>
        </div>
        <div className="nav-menu">
          <ul>
            <li>Menu 1</li>
            <li>Menu 2</li>
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
                  <Link to="/profile/tai-khoan">Hồ sơ</Link>
                </li>
                {user.LOAI === 3 ? (
                  <>
                    <li>
                      <Link to="/profile/hop-dong">Lịch sử hợp đồng học</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/profile/yeu-cau">Lịch sử yêu cầu học</Link>
                    </li>
                    <li>
                      <Link to="/profile/doanh-thu">Doanh thu</Link>
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

export default index;
