/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { DatePicker } from '@material-ui/pickers';
import { Breadcrumbs, Typography } from '@material-ui/core';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { Form } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/vi';
import { getRevenue } from '../../Actions/index';

function CustomTooltip({ payload, label, active, title }) {
  if (active) {
    return (
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.1)',
          padding: '.5em',
          borderRadius: '.5em'
        }}
      >
        <p className="label">{`${title} ${label}`}</p>
        <p className="intro">
          Tổng tiền:{' '}
          <span>
            <NumberFormat
              value={payload[0].value}
              displayType="text"
              thousandSeparator
              suffix="₫"
            />
          </span>
        </p>
      </div>
    );
  }

  return null;
}

const Revenue = ({ match, history }) => {
  const revenue = useSelector(state => state.contract.revenue);
  const dispatch = useDispatch();
  const { contract, userID, fetching } = revenue;
  const [monthData, setMonthData] = useState([]);
  const [month, setMonth] = useState(`${moment().month() + 1}`);
  const [yearData, setYearData] = useState([]);
  const [year, setYear] = useState(moment().year());
  const { tab } = match.params;
  const { id } = match.params;
  if (id === undefined || id === null) {
    history.push('/error');
  }
  if (tab === undefined || tab === null) {
    history.push('/error');
  }

  if (!fetching) {
    const ID = parseInt(id, 10);
    if (userID) {
      if (userID !== ID) {
        dispatch(getRevenue(ID));
      }
    } else {
      dispatch(getRevenue(ID));
    }
  }

  useEffect(() => {
    const arr = [
      ...Array(
        moment()
          .month(month - 1)
          .endOf('month')
          .date()
      )
    ].map((e, i) => {
      const data = {
        name: `${i + 1}`,
        money: 0
      };
      return data;
    });
    if (contract && contract.length > 0) {
      contract.map(item => {
        if (moment(item.NGAYKT).month() + 1 === parseInt(month, 10)) {
          arr[moment(item.NGAYKT).format('D') - 1].money +=
            item.CHITIET.TONGTIEN;
        }
        return item;
      });
    }
    setMonthData(arr);
  }, [month, contract]);

  useEffect(() => {
    const arr = [...Array(12)].map((e, i) => {
      const data = {
        name: `${i + 1}`,
        money: 0
      };
      return data;
    });
    if (contract && contract.length > 0) {
      contract.map(item => {
        if (moment(item.NGAYKT).year() === year) {
          arr[moment(item.NGAYKT).format('M') - 1].money +=
            item.CHITIET.TONGTIEN;
        }
        return item;
      });
    }
    setYearData(arr);
  }, [year, contract]);

  return (
    <div className="container">
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">Trang chủ</Link>
        <Link to="/userlist">Danh sách tài khoản</Link>
        <Link to={`/user/${id}`}>Người dùng</Link>
        <Typography color="textPrimary">Doanh thu</Typography>
      </Breadcrumbs>
      <div className="profile-info">
        <div className="info-container">
          <div className="profile-header">
            <div className="row">
              <div className="col-12">
                <h3>{`Doanh thu ${
                  tab === 'month' ? 'theo tháng' : 'theo năm'
                }`}</h3>
              </div>
            </div>
          </div>
          <div className="profile-body">
            <div className="row">
              <div className="col-4">
                {tab === 'month' ? (
                  <Form.Control
                    as="select"
                    name="gender"
                    defaultValue={month}
                    onChange={e => setMonth(e.target.value)}
                  >
                    {[...Array(12)].map((e, i) => {
                      return (
                        <option key={i} value={i + 1}>{`Tháng ${i +
                          1}`}</option>
                      );
                    })}
                  </Form.Control>
                ) : (
                  <DatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    margin="dense"
                    views={['year']}
                    value={moment().year(year)}
                    onChange={value => setYear(value.year())}
                  />
                )}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <LineChart
                  width={600}
                  height={400}
                  data={tab === 'month' ? monthData : yearData}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <Line type="monotone" dataKey="money" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    content={
                      <CustomTooltip
                        title={tab === 'month' ? 'Ngày' : 'Tháng'}
                      />
                    }
                  />
                </LineChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
