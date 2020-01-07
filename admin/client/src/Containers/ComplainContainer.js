import { connect } from 'react-redux';
import Complain from '../Components/Pages/Complain';
import { getComplainList } from '../Actions';

const mapStateToProps = state => ({
  isFetching: state.complain.fetching,
  isFetched: state.complain.fetched,
  error: state.complain.error,
  list: state.complain.list,
  pagination: state.complain.pagination
});
const mapDispatchToProps = dispatch => ({
  getList: page => dispatch(getComplainList(page))
});
export default connect(mapStateToProps, mapDispatchToProps)(Complain);
