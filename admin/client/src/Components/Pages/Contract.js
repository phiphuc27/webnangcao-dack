import React, { useState } from 'react';
import { Spinner, Pagination, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/en-gb';

import ContractModal from '../Modal/ContractModal';
// import { makeStyles } from '@material-ui/core/styles';

// import useForm from 'react-hook-form';

const Contract = ({ isFetching, isFetched, list, pagination, getList }) => {
  const [modalEdit, setModalEdit] = useState({
    data: null,
    show: false
  });

  var List = null;
  if (list !== null && list !== undefined) {
    // console.log(userList);
    List = list.map((item, index) => {
      return (
        <tr key={item.ID}>
          <td>
            <button
              type="button"
              className="btn request-title"
              onClick={() =>
                setModalEdit({
                  data: {
                    ...item.CHITIET,
                    ID: item.ID,
                    GIASU: item.GIASU,
                    HOCSINH: item.HOCSINH,
                    TRANGTHAIHD: item.TRANGTHAI
                  },
                  show: true
                })
              }
            >
              {item.CHITIET.TIEUDE}
            </button>
          </td>
          <td>
            {item.GIASU.HO} {item.GIASU.TEN}
          </td>
          <td>
            {item.HOCSINH.HO} {item.HOCSINH.TEN}
          </td>
          <td>{moment(item.NGAYBD).format('DD/MM/YYYY')}</td>
          <td>{moment(item.NGAYKT).format('DD/MM/YYYY')}</td>
          <td>
            {item.TRANGTHAI === 0
              ? 'Đã lập'
              : item.TRANGTHAI === 1
              ? 'Đã hoàn thành chưa thanh toán'
              : 'Đã thanh toán'}
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
            <Link to="/contract" className="list-group-item active">
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
                    <th>Tiêu đề</th>
                    <th>Người dạy</th>
                    <th>Người học</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
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
          {modalEdit.data && (
            <ContractModal
              contract={modalEdit.data}
              show={modalEdit.show}
              onHide={() => setModalEdit({ ...modalEdit, show: false })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Contract;
