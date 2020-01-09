import React from 'react';
import { Spinner, Pagination, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';

// import useForm from 'react-hook-form';

const UserList = ({
  isFetching,
  isFetched,
  userList,
  getList,
  pagination,
  lock,
  unlock
}) => {
  var list = null;
  if (userList !== null && userList !== undefined) {
    // console.log(userList);
    list = userList.map((user, index) => {
      let status = (
        <>
          <span>Bình thường </span>
          <i
            className="fas fa-lock status-edit-icon"
            onClick={e => {
              lock(user.ID);
            }}
          ></i>
        </>
      );
      switch (user.TRANGTHAI) {
        case 0:
          status = (
            <>
              <span>Bình thường </span>
              <i
                className="fas fa-lock status-edit-icon"
                onClick={e => {
                  lock(user.ID);
                }}
              ></i>
            </>
          );
          break;
        case 1:
          status = (
            <>
              <span>Khóa</span>
              <i
                className="fas fa-lock-open status-edit-icon"
                onClick={e => {
                  unlock(user.ID);
                }}
              ></i>
            </>
          );
          break;
        case 2:
          status = 'Email chưa xác nhận';
          break;

        default:
          status = (
            <>
              <span>Bình thường </span>
              <i
                className="fas fa-lock status-edit-icon"
                onClick={e => {
                  lock(user.ID);
                }}
              ></i>
            </>
          );
          break;
      }
      return (
        <tr key={index}>
          <td>
            <Link to={'/user/' + user.ID} className="userlist-item">
              {user.EMAIL}
            </Link>
          </td>
          <td>{user.LOAI === 2 ? 'Người dạy' : 'Người học'}</td>
          <td>{status}</td>
        </tr>
      );
    });
  } else {
    if (!isFetching && !isFetched) {
      getList(0);
    }
  }

  // pagnition
  let paginationList = [];
  if (pagination) {
    let active = pagination.current + 1;
    for (let number = 1; number <= pagination.numPages; number++) {
      paginationList.push(
        <Pagination.Item
          key={number}
          active={number === active}
          onClick={e => {
            if (number === active) return;
            getList(number - 1);
          }}
        >
          {number}
        </Pagination.Item>
      );
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-lg-3">
          <div className="list-group">
            <Link to="/userlist" className="list-group-item active">
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
        <div className="col-md-9 col-lg-9">
          {isFetching ? (
            <Spinner
              animation="border"
              variant="light"
              size="sm"
              style={{ marginRight: '10px' }}
            />
          ) : (
            <div className="userlist-table">
              <Table striped bordered hover size="sm" responsive>
                <thead>
                  <tr>
                    <th>Tên tài khoản</th>
                    <th>Loại</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>{list}</tbody>
              </Table>
            </div>
          )}
          <div className="userlist-pagination">
            <Pagination>{paginationList}</Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
