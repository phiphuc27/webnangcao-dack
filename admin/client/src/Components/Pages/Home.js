import React from 'react';
import { Link } from 'react-router-dom';
// import UserList from './UserList';

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-lg-3">
          <div className="list-group">
            <Link to="/userlist" className="list-group-item">
              Danh sách tài khoản
            </Link>
            <Link to="/skill" className="list-group-item">
              Quản lý tag kỹ năng
            </Link>
            <Link to="/contract" className="list-group-item">
              Quản lý hợp đồng
            </Link>
            <Link to="/complain" className="list-group-item">
              Quản lý khiếu nại
            </Link>
            <Link to="/top-revenue" className="list-group-item">
              Top doanh thu
            </Link>
          </div>
        </div>
        <div className="col-md-9 col-lg-9"></div>
      </div>
    </div>
  );
};

export default Home;
