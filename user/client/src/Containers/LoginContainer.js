import { connect } from 'react-redux';
import Login from '../Components/Pages/Login';
import { login, googleLogin, facebookLogin, errorLogin, getLoginUser } from '../Actions';

const mapStateToProps = state => ({
  isFetching: state.user.fetching,
  isFetched: state.user.fetched,
  error: state.user.error
});
const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data)),
  loginGoogle: response => {
    dispatch(googleLogin(response)).then(res => {
      const { payload } = res;
      const { data, status } = payload;
      const { token } = data;
      if (status !== 200) {
        dispatch(errorLogin(payload));
      } else {
        window.sessionStorage.setItem('jwtToken', token);
      }
      dispatch(getLoginUser(token));
    });
  },
  loginFacebook: response => {
    dispatch(facebookLogin(response)).then(res => {
      const { payload } = res;
      const { data, status } = payload;
      const { token } = data;
      if (status !== 200) {
        dispatch(errorLogin(payload));
      } else {
        window.sessionStorage.setItem('jwtToken', token);
      }
      dispatch(getLoginUser(token));
    });
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
