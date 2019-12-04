import React from 'react';
import { connect } from 'react-redux';
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
            {user && user.LOAI === 0 ? (
              <li>
                <Link to="/register">Tạo mới admin</Link>
              </li>
            ) : (
              <li>Menu 1</li>
            )}
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
            <p>{user.EMAIL}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={e => handleLogout(e)}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="nav-user">
            <Link to="/login" className="btn btn-primary">
              Log In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  user: state.user.user
});

export default connect(mapStateToProps)(index);
