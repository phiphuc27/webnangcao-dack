import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';

// import useForm from 'react-hook-form';

const UserList = ({ isFetching, isFetched, userList, getList }) => {
  var list = null;
  if (userList !== null && userList !== undefined) {
    // console.log(userList);
    list = userList.map((user, index) => {
      return (
        <Link to={'/user/' + user.ID} className="list-group-item" key={index}>
          <h4 className="list-group-item-heading">{user.EMAIL}</h4>
          <p className="list-group-item-text">
            Type: {user.LOAI === 2 ? 'Tutor' : 'Student'}
          </p>
        </Link>
      );
    });
  } else {
    getList();
  }
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
        <div className="col-md-7 col-lg-7">
          {isFetching ? (
            <Spinner
              animation="border"
              variant="light"
              size="sm"
              style={{ marginRight: '10px' }}
            />
          ) : (
            <div className="list-group">{list}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
