import React from 'react';
import { Link } from 'react-router-dom';
import { HomeRounded } from '@material-ui/icons';
import { Dropdown } from 'react-bootstrap';
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
            <Dropdown alignRight>
              <Dropdown.Toggle className="nav-dropdown" id="dropdown-basic">
                <img src={user.AVATARURL} alt="avatar" />
                {user.EMAIL}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item as="button" onClick={e => handleLogout(e)}>
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <div className="nav-user">
            <Link to="/register" className="btn btn-secondary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-primary">
              Log In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default index;
