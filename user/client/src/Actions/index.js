import axios from 'axios';

/* Register */
export const startRegister = {
  type: 'REGISTER_START'
};

export const successRegister = {
  type: 'REGISTER_SUCCESS'
};

export const errorRegister = error => ({
  type: 'REGISTER_ERROR',
  error
});

export const register = data => {
  return dispatch => {
    dispatch(startRegister);
    axios({
      method: 'post',
      url: '/user/register',
      data
    })
      .then(() => {
        dispatch(successRegister);
      })
      .catch(err => {
        dispatch(errorRegister(err.response.data));
      });
  };
};

/* end of register */

export const startLogin = {
  type: 'LOGIN_START'
};

export const successLogin = user => ({
  type: 'LOGIN_SUCCESS',
  user
});

export const errorLogin = error => ({
  type: 'LOGIN_ERROR',
  error
});

export function resetToken() {
  return {
    type: 'RESET_TOKEN'
  };
}

export const getLoginUser = token => {
  return dispatch => {
    dispatch(startLogin);
    axios({
      method: 'get',
      url: '/me',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        window.sessionStorage.setItem('jwtToken', response.data.token);
        dispatch(successLogin(response.data.user));
      })
      .catch(err => {
        window.sessionStorage.removeItem('jwtToken');
        dispatch(errorLogin(err.response.data));
      });
  };
};

export const login = data => {
  return async dispatch => {
    await dispatch(startLogin);
    await axios({
      method: 'post',
      url: '/user/login',
      data
    })
      .then(response => {
        dispatch(getLoginUser(response.data.token));
      })
      .catch(err => {
        dispatch(errorLogin(err.response.data.message));
      });
  };
};

export const googleLogin = data => {
  return async dispatch => {
    await dispatch(startLogin);
    const userData = {
      googleId: data.El,
      email: data.profileObj.email,
      familyName: data.profileObj.familyName,
      givenName: data.profileObj.givenName,
      photoURL: data.profileObj.imageUrl
    };
    const request = await axios({
      method: 'post',
      url: '/user/google',
      data: userData
    });
    return {
      type: 'SIGN_UP',
      payload: request
    };
  };
};

export const facebookLogin = data => {
  return async dispatch => {
    await dispatch(startLogin);
    const userData = {
      email: data.email,
      name: data.name,
      photoURL: data.picture.data.url
    };
    const request = await axios({
      method: 'post',
      url: '/user/facebook',
      data: userData
    });
    return {
      type: 'SIGN_UP',
      payload: request
    };
  };
};
/* end of login */