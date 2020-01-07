import { connect } from 'react-redux';
import UserList from '../Components/Pages/UserList';
import { getUserList, lockAccount, unlockAccount } from '../Actions';

const mapStateToProps = state => ({
  isFetching: state.userList.fetching,
  isFetched: state.userList.fetched,
  error: state.userList.error,
  userList: state.userList.userList,
  pagination: state.userList.pagination
});
const mapDispatchToProps = dispatch => ({
  getList: page => dispatch(getUserList(page)),
  lock: id => dispatch(lockAccount(id)),
  unlock: id => dispatch(unlockAccount(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
