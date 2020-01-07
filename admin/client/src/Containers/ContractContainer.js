import { connect } from 'react-redux';
import Contract from '../Components/Pages/Contract';
import { getContractList } from '../Actions';

const mapStateToProps = state => ({
  isFetching: state.contract.fetching,
  isFetched: state.contract.fetched,
  error: state.contract.error,
  list: state.contract.list,
  pagination: state.contract.pagination
});
const mapDispatchToProps = dispatch => ({
  getList: page => dispatch(getContractList(page))
});
export default connect(mapStateToProps, mapDispatchToProps)(Contract);
