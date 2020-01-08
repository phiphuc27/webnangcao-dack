import React from 'react';
import { Spinner, Pagination, Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import moment from 'moment';
// import 'moment/locale/en-gb';
// import { makeStyles } from '@material-ui/core/styles';

// import useForm from 'react-hook-form';

const Complain = ({
  isFetching,
  isFetched,
  list,
  pagination,
  getList,
  changeStatus
}) => {
  var List = null;
  if (list !== null && list !== undefined) {
    // console.log(userList);
    List = list.map((item, index) => {
      return (
        <tr key={item.ID}>
          <td>{item.TIEUDE}</td>
          <td>
            {item.GIASU.HO} {item.GIASU.TEN}
          </td>
          <td>
            {item.HOCSINH.HO} {item.HOCSINH.TEN}
          </td>
          <td>{item.NOIDUNG}</td>
          <td>
            <Form.Control
              as="select"
              value={item.TRANGTHAI}
              onChange={e => {
                changeStatus(item.ID, e.target.value);
              }}
            >
              <option value={0}>Chưa xử lý</option>
              <option value={1}>Đã xử lý</option>
            </Form.Control>
          </td>
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
            <Link to="/userlist" className="list-group-item">
              Danh sách tài khoản
            </Link>
            <Link to="/skill" className="list-group-item">
              Quản lý tag kỹ năng
            </Link>
            <Link to="/contract" className="list-group-item">
              Quản lý hợp đồng
            </Link>
            <Link to="/complain" className="list-group-item  active">
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
                    <th>Tiêu đề</th>
                    <th>Người dạy</th>
                    <th>Người học</th>
                    <th>Nội dung</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>{List}</tbody>
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

export default Complain;
