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
      url: '/auth/register',
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
      url: '/auth/login',
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
      photoURL: data.profileObj.imageUrl,
      type: 3
    };
    const request = await axios({
      method: 'post',
      url: '/auth/google',
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
    console.log(data);
    const userData = {
      facebookId: data.userID,
      email: data.email,
      name: data.name,
      photoURL: data.picture.data.url,
      type: 3
    };
    const request = await axios({
      method: 'post',
      url: '/auth/facebook',
      data: userData
    });
    return {
      type: 'SIGN_UP',
      payload: request
    };
  };
};

export const logout = {
  type: 'LOG_OUT'
};
/* end of login */

/* Profile */
export const startEdit = {
  type: 'EDIT_START'
};

export const successEdit = {
  type: 'EDIT_SUCCESS'
};

export const errorEdit = (name, error) => ({
  type: 'EDIT_PROFILE_ERROR',
  name,
  error
});

export const editProfile = data => {
  return dispatch => {
    dispatch(startEdit);
    const token = window.sessionStorage.getItem('jwtToken');
    axios({
      method: 'post',
      url: '/user/profile',
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.statusText === 'OK') {
          dispatch(successEdit);
        }
      })
      .catch(err => {
        dispatch(errorEdit('profile', err));
      });
  };
};

export const editPhoto = data => {
  return async dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');
    await axios({
      method: 'post',
      url: '/user/profile/changePhoto',
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async response => {
        if (response.statusText === 'OK') {
          dispatch(successEdit);
        }
      })
      .catch(err => {
        dispatch(errorEdit('photo', err.response.data));
      });
  };
};

export const uploadPhoto = photo => {
  return async dispatch => {
    dispatch(startEdit);
    await axios
      .post('https://us-central1-carovn-v2.cloudfunctions.net/uploadFile', photo)
      .then(response => {
        dispatch(editPhoto(response.data));
      })
      .catch(err => {
        dispatch(errorEdit('photo', err));
      });
  };
};

/* end of profile */
