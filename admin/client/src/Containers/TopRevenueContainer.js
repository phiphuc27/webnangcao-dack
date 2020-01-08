import { connect } from 'react-redux';
import TopRevenue from '../Components/Pages/TopRevenue';
import { getTopRevenue } from '../Actions';

const mapStateToProps = state => ({
  isFetching: state.topRevenue.fetching,
  isFetched: state.topRevenue.fetched,
  error: state.topRevenue.error,
  list: state.topRevenue.list,
  type: state.topRevenue.type,
  by: state.topRevenue.by
});
const mapDispatchToProps = dispatch => ({
  getList: (type, by) => dispatch(getTopRevenue(type, by))
});
export default connect(mapStateToProps, mapDispatchToProps)(TopRevenue);
