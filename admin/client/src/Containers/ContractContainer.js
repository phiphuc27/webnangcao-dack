import { connect } from 'react-redux';
import Contract from '../Components/Pages/Contract';
import { getContractList, updateContractStatus } from '../Actions';

const mapStateToProps = state => ({
  isFetching: state.contract.fetching,
  isFetched: state.contract.fetched,
  error: state.contract.error,
  list: state.contract.list,
  pagination: state.contract.pagination
});
const mapDispatchToProps = dispatch => ({
  getList: page => dispatch(getContractList(page)),
  changeStatus: (id, status) => dispatch(updateContractStatus(id, status))
});
export default connect(mapStateToProps, mapDispatchToProps)(Contract);
