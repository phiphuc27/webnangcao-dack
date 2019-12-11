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
    const token = window.sessionStorage.getItem('jwtToken');

    axios({
      method: 'post',
      url: '/users/register',
      headers: {
        Authorization: `Bearer ${token}`
      },
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
        // console.log(response.data.token);
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
        // console.log(response.data.token);
        dispatch(getLoginUser(response.data.token));
      })
      .catch(err => {
        // console.log(err.response);
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

export const logout = {
  type: 'LOG_OUT'
};
/* end of login */

/* User list */
export const startGetList = {
  type: 'GET_LIST_START'
};

export const successGetList = value => ({
  type: 'GET_LIST_SUCCESS',
  value
});

export const errorGetList = error => ({
  type: 'GET_LIST_ERROR',
  error
});

export const getUserList = () => {
  return async dispatch => {
    await dispatch(startGetList);
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'get',
      url: '/users/getUserList',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        dispatch(successGetList(response.data));
      })
      .catch(err => {
        dispatch(errorGetList(err.response.data));
      });
  };
};

/* End User list */

/* User profile */

export const startGetUserProfile = {
  type: 'GET_USER_PROFILE_START'
};

export const successGetUserProfile = value => ({
  type: 'GET_USER_PROFILE_SUCCESS',
  value
});

export const errorGetUserProfile = error => ({
  type: 'GET_USER_PROFILE_ERROR',
  error
});

export const getUserProfile = id => {
  return async dispatch => {
    await dispatch(startGetUserProfile);
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/getUserInfo',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { id }
    })
      .then(async response => {
        // console.log(response);
        dispatch(
          successGetUserProfile(response.data ? response.data : 'Not Found')
        );

        if (response.data) {
          // get user skill
          await dispatch(startGetUserSkill);
          await axios({
            method: 'post',
            url: '/users/getUserSkill',
            headers: {
              Authorization: `Bearer ${token}`
            },
            data: { id }
          })
            .then(response => {
              dispatch(successGetUserSkill(response.data));
            })
            .catch(err => {
              dispatch(errorGetUserSkill(err.response.data));
            });
        }
      })
      .catch(err => {
        // console.log(err);
        dispatch(errorGetUserProfile(err.response ? err.response.data : err));
      });
  };
};

export const startGetUserSkill = {
  type: 'GET_USER_SKILL_START'
};

export const successGetUserSkill = value => ({
  type: 'GET_USER_SKILL_SUCCESS',
  value
});

export const errorGetUserSkill = error => ({
  type: 'GET_USER_SKILL_ERROR',
  error
});

export const getUserSkill = id => {
  return async dispatch => {
    await dispatch(startGetUserSkill);
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/getUserSkill',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { id }
    })
      .then(response => {
        dispatch(successGetUserSkill(response.data));
      })
      .catch(err => {
        dispatch(errorGetUserSkill(err.response.data));
      });
  };
};

export const addNewSkill = (id, skill) => {
  return async dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/insertUserSkill',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { id, skill }
    })
      .then(response => {
        const data = { ID: response.data.insertId, IDND: id, KYNANG: skill };
        dispatch({
          type: 'ADD_NEW_SKILL_SUCCESS',
          value: data
        });
      })
      .catch(err => {
        dispatch(errorGetUserSkill(err.response.data));
      });
  };
};

export const updateSkill = (skill, skillId) => {
  return async dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/updateUserSkill',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { id: skillId, skill }
    })
      .then(response => {
        dispatch({
          type: 'UPDATE_SKILL_SUCCESS',
          value: skill,
          id: skillId
        });
      })
      .catch(err => {
        dispatch(errorGetUserSkill(err.response.data));
      });
  };
};

export const deleteSkill = id => {
  return async dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/deleteUserSkill',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { id }
    })
      .then(response => {
        dispatch({
          type: 'DELETE_SKILL_SUCCESS',
          id: id
        });
      })
      .catch(err => {
        dispatch(errorGetUserSkill(err.response.data));
      });
  };
};

/* End User profile */
