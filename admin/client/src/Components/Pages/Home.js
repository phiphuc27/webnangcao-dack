import React from 'react';
import { Link } from 'react-router-dom';
// import UserList from './UserList';

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-lg-4">
          <div className="list-group">
            <Link to="/userlist" className="list-group-item active">
              Danh sách tài khoản người dùng
            </Link>
          </div>
        </div>
        <div className="col-md-7 col-lg-7"></div>
      </div>
    </div>
  );
};

export default Home;
