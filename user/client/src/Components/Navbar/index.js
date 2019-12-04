import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeRounded } from '@material-ui/icons';
import { GoSearch } from 'react-icons/go';

const index = () => {
  return (
    <nav>
      <div className="container navbar">
        <div className="nav-logo">
          <NavLink to="/">
            <HomeRounded />
            <span>Logo</span>
          </NavLink>
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

        <div className="nav-user">
          <NavLink to="/register" className="btn btn-secondary">
            Sign Up
          </NavLink>
          <NavLink to="/login" className="btn btn-primary">
            Log In
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default index;
