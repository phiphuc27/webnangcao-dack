import { connect } from 'react-redux';
import Complain from '../Components/Pages/Complain';
import { getComplainList, updateComplainStatus } from '../Actions';

const mapStateToProps = state => ({
  isFetching: state.complain.fetching,
  isFetched: state.complain.fetched,
  error: state.complain.error,
  list: state.complain.list,
  pagination: state.complain.pagination
});
const mapDispatchToProps = dispatch => ({
  getList: page => dispatch(getComplainList(page)),
  changeStatus: (id, status) => dispatch(updateComplainStatus(id, status))
});
export default connect(mapStateToProps, mapDispatchToProps)(Complain);
