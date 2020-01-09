/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { DatePicker } from '@material-ui/pickers';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Form } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/vi';

function CustomTooltip({ payload, label, active, title }) {
  if (active) {
    return (
      <div style={{ backgroundColor: 'rgba(0,0,0,0.1)', padding: '.5em', borderRadius: '.5em' }}>
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

const RevenueTab = ({ tab }) => {
  const contract = useSelector(state => state.contract.contract);
  const { paid } = contract;
  const [monthData, setMonthData] = useState([]);
  const [month, setMonth] = useState(`${moment().month() + 1}`);
  const [yearData, setYearData] = useState([]);
  const [year, setYear] = useState(moment().year());
  useEffect(() => {
    const arr = [
      ...Array(
        moment()
          .month(month - 1)
          .endOf('month')
          .dates()
      )
    ].map((e, i) => {
      const data = {
        name: `${i + 1}`,
        money: 0
      };
      return data;
    });
    if (paid && paid.length > 0) {
      paid.map(item => {
        if (moment(item.NGAYKT).month() + 1 === parseInt(month, 10)) {
          arr[moment(item.NGAYKT).format('D') - 1].money += item.CHITIET.TONGTIEN;
        }
        return item;
      });
    }
    setMonthData(arr);
  }, [month, paid]);

  useEffect(() => {
    const arr = [...Array(12)].map((e, i) => {
      const data = {
        name: `${i + 1}`,
        money: 0
      };
      return data;
    });
    if (paid && paid.length > 0) {
      paid.map(item => {
        if (moment(item.NGAYKT).year() === year) {
          arr[moment(item.NGAYKT).format('M') - 1].money += item.CHITIET.TONGTIEN;
        }
        return item;
      });
    }
    setYearData(arr);
  }, [year, paid]);

  return (
    <div className="profile-info">
      <div className="info-container">
        <div className="profile-header">
          <div className="row">
            <div className="col-12">
              <h3>{`Doanh thu ${tab === 'month' ? 'theo tháng' : 'theo năm'}`}</h3>
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
                    return <option key={i} value={i + 1}>{`Tháng ${i + 1}`}</option>;
                  })}
                </Form.Control>
              ) : (
                <DatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  views={['year']}
                  margin="dense"
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
                <Tooltip content={<CustomTooltip title={tab === 'month' ? 'Ngày' : 'Tháng'} />} />
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTab;
