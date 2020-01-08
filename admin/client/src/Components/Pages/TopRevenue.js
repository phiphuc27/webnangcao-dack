import React, { useState } from 'react';
import { Spinner, Table, Form, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
// import { makeStyles } from '@material-ui/core/styles';

import useForm from 'react-hook-form';

const TopRevenue = ({ isFetching, isFetched, getList, list, type, by }) => {
  const [dateType, setDateType] = useState(type);
  const [searchBy, setSearchBy] = useState(by);

  const { handleSubmit } = useForm();

  var tableList = null;

  if (list) {
    if (by === 'tutor') {
      tableList = list.map((item, index) => {
        return (
          <tr key={item.tutor.ID}>
            <td>{index + 1}</td>
            <td>
              <Link to={'/user/' + item.tutor.ID}>
                {item.tutor.HO} {item.tutor.TEN}
              </Link>
            </td>
            <td>
              <NumberFormat
                value={item.revenue}
                displayType="text"
                thousandSeparator
                suffix="₫"
              />
            </td>
          </tr>
        );
      });
    } else {
      tableList = list.map((item, index) => {
        return (
          <tr key={item.skill.ID}>
            <td>{index + 1}</td>
            <td>{item.skill.KYNANG}</td>
            <td>
              <NumberFormat
                value={item.revenue}
                displayType="text"
                thousandSeparator
                suffix="₫"
              />
            </td>
          </tr>
        );
      });
    }
  }

  const onSubmitForm = e => {
    //console.log(e);
    getList(dateType, searchBy);
  };

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
            <Link to="/top-revenue" className="list-group-item active">
              Top doanh thu
            </Link>
          </div>
        </div>
        <div className="col-md-9 col-lg-9">
          <div className="top-revenue-form">
            <h3>Top Doanh thu</h3>
            <Form onSubmit={handleSubmit(onSubmitForm)} id="update-form">
              <Form.Row>
                <Form.Group as={Col} controlId="formGridBy">
                  <Form.Label>Search theo</Form.Label>
                  <Form.Control
                    as="select"
                    value={searchBy}
                    onChange={e => setSearchBy(e.target.value)}
                  >
                    <option value="tutor">Người dạy</option>
                    <option value="skill">Kỹ năng</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridType">
                  <Form.Label>Loại thời gian</Form.Label>
                  <Form.Control
                    as="select"
                    value={dateType}
                    onChange={e => setDateType(e.target.value)}
                  >
                    <option value="month">Tháng</option>
                    <option value="year">Năm</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit">
                Xác nhận
              </Button>
            </Form>
          </div>
          {isFetching ? (
            <Spinner
              animation="border"
              variant="light"
              size="sm"
              style={{ marginRight: '10px' }}
            />
          ) : tableList ? (
            <div className="userlist-table">
              <Table striped bordered hover size="sm" responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{by === 'tutor' ? 'Tên tài khoản' : 'Tên kỹ năng'}</th>
                    <th>Doanh thu</th>
                  </tr>
                </thead>
                <tbody>{tableList}</tbody>
              </Table>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TopRevenue;
