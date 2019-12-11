import { connect } from 'react-redux';
import UserList from '../Components/Pages/UserList';
import { getUserList } from '../Actions';

const mapStateToProps = state => ({
  isFetching: state.user.fetching,
  isFetched: state.user.fetched,
  error: state.user.error,
  userList: state.userList.userList
});
const mapDispatchToProps = dispatch => ({
  getList: () => dispatch(getUserList())
});
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
