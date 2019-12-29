import React, { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Breadcrumbs, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Tutor from '../Tutor/Tutor';
import TutorList from '../Tutor/TutorList';
import Category from '../Other/Category';
import { sortTutor, getAllTutors } from '../../Actions/tutor';

const Tutors = () => {
  const tutors = useSelector(state => state.tutor.tutors);
  let sortTutors = useSelector(state => state.tutor.sortTutors);

  const dispatch = useDispatch();

  if (tutors.length === 0) {
    dispatch(getAllTutors());
  }

  const [sort, setSort] = useState('');
  useEffect(() => {
    dispatch(sortTutor(sort));
  }, [sort, dispatch]);

  if (sortTutors.length > 0) {
    sortTutors = sortTutors.map(tutor => {
      return <Tutor key={tutor.ID} tutor={tutor} />;
    });
  }

  const handleChangeSelect = event => {
    setSort(event.target.value);
  };

  return (
    <div style={{ marginBlockEnd: '5em', padding: '0' }} className="container">
      <br />
      <Breadcrumbs aria-label="breadcrumb">
        <a href="/">Trang chủ</a>
        <Typography color="textPrimary">Danh sách gia sư</Typography>
      </Breadcrumbs>
      <div style={{ display: 'flex' }}>
        <div className="col-md-3" style={{ paddingRight: '10px' }}>
          <Category />
        </div>
        <div className="col-md-9">
          <div style={{ marginBlockStart: '3em' }}>
            <div className="row">
              <div className="col-md-9" style={{ display: 'flex', alignItems: 'center' }}>
                {/* {search && (
                    <h6 className="row">
                      Kết quả tìm kiếm cho&nbsp;
                      <span style={{ fontWeight: 'bold' }}>"{search}"</span>
                      :&nbsp;
                      <span style={{ fontWeight: 'bold' }}>{productList.length}</span>
                      &nbsp;sản phẩm.
                    </h6>
                  )} */}
              </div>
              <FormControl
                style={{
                  marginBottom: '10px',
                  paddingRight: '18px',
                  marginTop: '0px'
                }}
                className="col-md-3"
              >
                <InputLabel shrink htmlFor="sort-native-label-placeholder">
                  Sắp xếp
                </InputLabel>
                <NativeSelect
                  value={sort}
                  onChange={event => handleChangeSelect(event)}
                  inputProps={{
                    name: 'Sắp xếp',
                    id: 'sort-native-label-placeholder'
                  }}
                >
                  <option value="">Gia sư nổi bật</option>
                  <option value="PRICE_DESC">Giá tiền giảm dần</option>
                  <option value="PRICE_ASC">Giá tiền tăng dần</option>
                  <option value="NAME_DESC">Tên từ A-Z</option>
                  <option value="NAME_ASC">Tên từ Z-A</option>
                </NativeSelect>
              </FormControl>
              <br />
            </div>
            {sortTutors && sortTutors.length > 0 ? (
              <TutorList tutors={sortTutors} />
            ) : (
              <h4>Không tìm thấy gia sư</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutors;
