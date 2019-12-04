import { connect } from 'react-redux';
import Login from '../Components/Pages/Login';
import { login } from '../Actions';

const mapStateToProps = state => ({
  isFetching: state.user.fetching,
  isFetched: state.user.loggedIn,
  error: state.user.error
});
const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
