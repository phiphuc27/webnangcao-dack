import { connect } from 'react-redux';
import Register from '../Components/Pages/Register';
import { register } from '../Actions/user';

const mapStateToProps = state => ({
  isFetching: state.user.fetching,
  isFetched: state.user.fetched,
  error: state.user.error,
  confirmEmail: state.user.confirmEmail
});
const mapDispatchToProps = dispatch => ({
  signup: data => dispatch(register(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
