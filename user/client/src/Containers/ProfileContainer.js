import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Profile from '../Components/Pages/Profile';
import { login } from '../Actions/user';

const mapStateToProps = state => ({
  isFetching: state.user.fetching,
  isFetched: state.user.fetched,
  error: state.user.error,
  user: state.user.user
});
const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
