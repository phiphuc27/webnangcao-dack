import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import { allOptions } from '../../data';
import { getAllSkills, filterTutor } from '../../Actions/tutor';

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center'
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

const Category = () => {
  let skills = useSelector(state => state.tutor.skills);
  const dispatch = useDispatch();

  if (skills.length === 0) {
    dispatch(getAllSkills());
  }

  skills = skills.map(skill => {
    return {
      value: skill.ID,
      label: skill.KYNANG
    };
  });

  const skillSelect = [
    {
      value: -1,
      label: '-Chọn kĩ năng'
    },
    ...skills
  ];

  const [cityOption, setCityOption] = useState(allOptions[0]);
  const [skillOption, setSkillOption] = useState(skillSelect[0]);
  const [price, setPrice] = useState([10000, 500000]);

  useEffect(() => {
    dispatch(filterTutor('SKILL', skillOption.label));
  }, [skillOption, dispatch]);

  useEffect(() => {
    dispatch(filterTutor('CITY', cityOption.label));
  }, [cityOption, dispatch]);

  useEffect(() => {
    dispatch(filterTutor('PRICE', price));
  }, [price, dispatch]);

  return (
    <div>
      <div className="container">
        {/* <div className="row"> */}
        <div>
          <div className="filter-widget" style={{ marginTop: '90px' }}>
            <h2 className="fw-title row" style={{ marginBottom: '10px' }}>
              Bộ lọc
            </h2>
            <br />
            <Select
              defaultValue={allOptions[0]}
              options={allOptions}
              formatGroupLabel={formatGroupLabel}
              isSearchable
              value={cityOption}
              onChange={value => setCityOption(value)}
            />
            <br />
            <Select
              defaultValue={skillSelect[0]}
              options={skillSelect}
              formatGroupLabel={formatGroupLabel}
              isSearchable
              value={skillOption}
              onChange={value => setSkillOption(value)}
            />
          </div>
          <div className="filter-widget mb-0 row">
            <div className="fw-color-choose">
              <Typography className="fw-title" id="range-slider" gutterBottom>
                Giá theo giờ
              </Typography>
              <Slider
                style={{ width: '250px' }}
                max={500000}
                min={10000}
                value={price}
                onChange={(e, newValue) => setPrice(newValue)}
                valueLabelDisplay="off"
                aria-labelledby="range-slider"
              />
              <br />

              <div className="row">
                <NumberFormat
                  className="col-6"
                  style={{ width: '80px' }}
                  value={`${price[0]}`}
                  displayType="text"
                  thousandSeparator
                  suffix="₫"
                />
                <NumberFormat
                  className="col-6"
                  style={{
                    width: '80px',
                    textAlign: 'right'
                  }}
                  value={`${price[1]}`}
                  displayType="text"
                  thousandSeparator
                  suffix="₫"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Category;
