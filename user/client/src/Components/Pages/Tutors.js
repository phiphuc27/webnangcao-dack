import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Tutor from '../TutorList/Tutor';
import TutorList from '../TutorList/TutorList';

export default class Tutors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: ''
    };
  }

  handleChangeSelect = event => {
    this.setState({
      sort: event.target.value
    });
  };

  useQuery = () => {
    return new URLSearchParams(window.location.search);
  };

  render() {
    const { sort } = this.state;
    const query = this.useQuery();
    const search = query.get('search');

    let productList;

    // if (search) {
    //   productList = searchProduct(search);
    // } else {
    //   productList = products;
    // }

    productList = productList.map(product => {
      return <Tutor key={product.id} tutor={product} />;
    });
    return (
      <div style={{ marginBlockEnd: '5em' }}>
        <div style={{ display: 'flex' }}>
          <div className="col-md-3" style={{ paddingLeft: '50px', paddingRight: '10px' }} />
          <div className="col-md-9">
            <div
              style={{
                paddingRight: '50px',
                marginBlockStart: '3em'
              }}
            >
              <div className="row">
                <div className="col-md-10" style={{ display: 'flex', alignItems: 'center' }}>
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
                  className="col-md-2"
                >
                  <InputLabel shrink htmlFor="sort-native-label-placeholder">
                    Sắp xếp
                  </InputLabel>
                  <NativeSelect
                    value={sort}
                    onChange={event => this.handleChangeSelect(event)}
                    inputProps={{
                      name: 'Sắp xếp',
                      id: 'sort-native-label-placeholder'
                    }}
                  >
                    <option value="">Sản phẩm nổi bật</option>
                    <option value={1}>Giá tiền giảm dần</option>
                    <option value={2}>Giá tiền tăng dần</option>
                    <option value={3}>Tên từ A-Z</option>
                    <option value={4}>Tên từ Z-A</option>
                    <option value={6}>Mới nhất</option>
                    <option value={7}>Bán chạy nhất</option>
                  </NativeSelect>
                </FormControl>
                <br />
              </div>

              {productList.length > 0 ? (
                <TutorList products={productList} />
              ) : (
                <h4>Không tìm thấy sản phẩm</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
