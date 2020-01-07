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

export const successJoinTutor = {
  type: 'SUCCESS_JOIN_TUTOR'
};

export const updateType = data => {
  return async dispatch => {
    await axios({
      method: 'post',
      url: '/auth/update/type',
      data
    })
      .then(response => {
        if (response.data.result === 'success') {
          dispatch(successJoinTutor);
        }
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

export const successEdit = data => ({
  type: 'EDIT_SUCCESS',
  data
});

export const errorEdit = (name, error) => ({
  type: 'EDIT_ERROR',
  name,
  error
});

export const startPasswordEdit = {
  type: 'EDIT_PASSWORD_START'
};

export const successPasswordEdit = {
  type: 'EDIT_PASSWORD_SUCCESS'
};

export const errorPasswordEdit = error => ({
  type: 'EDIT_PASSWORD_ERROR',
  error
});

export const editProfile = data => {
  // console.log(data);
  return dispatch => {
    dispatch(startEdit);
    const token = window.sessionStorage.getItem('jwtToken');
    axios({
      method: 'post',
      url: '/users/profile',
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.statusText === 'OK') {
          dispatch(successEdit(data));
        }
      })
      .catch(err => {
        dispatch(errorEdit('profile', err));
      });
  };
};

export const editPassword = data => {
  return dispatch => {
    dispatch(startPasswordEdit);
    const token = window.sessionStorage.getItem('jwtToken');
    axios({
      method: 'post',
      url: '/users/profile/changePassword',
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async response => {
        if (response.statusText === 'OK') {
          await dispatch(successPasswordEdit);
          setTimeout(() => {
            dispatch(getLoginUser(token));
          }, 2000);
        }
      })
      .catch(err => {
        dispatch(errorPasswordEdit(err.response.data));
      });
  };
};

export const editPhoto = data => {
  return async dispatch => {
    dispatch(startEdit);
    const token = window.sessionStorage.getItem('jwtToken');
    await axios({
      method: 'post',
      url: '/users/profile/changePhoto',
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async response => {
        if (response.statusText === 'OK') {
          dispatch(successEdit(response.data));
        }
      })
      .catch(err => {
        dispatch(errorEdit('photo', err));
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

export const startGet = {
  type: 'GET_START'
};

export const successGet = value => ({
  type: 'GET_SUCCESS',
  value
});

export const getProfile = id => {
  return dispatch => {
    dispatch(startGet);
    const token = window.sessionStorage.getItem('jwtToken');
    axios({
      method: 'post',
      url: '/users/getUserInfo',
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.statusText === 'OK') {
          dispatch(successGet(response.data));
        }
      })
      .catch(err => {
        dispatch(errorEdit('profile', err));
      });
  };
};

export const getSkill = id => {
  return dispatch => {
    dispatch(startGet);
    const token = window.sessionStorage.getItem('jwtToken');
    axios({
      method: 'post',
      url: '/users/getUserInfo',
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.statusText === 'OK') {
          dispatch(successGet(response.data));
        }
      })
      .catch(err => {
        dispatch(errorEdit('profile', err));
      });
  };
};

// skill
export const startGetUserSkill = {
  type: 'GET_USER_SKILL_START'
};

export const successGetUserSkill = value => ({
  type: 'GET_USER_SKILL_SUCCESS',
  value
});

export const errorUserSkill = (name, error) => ({
  type: 'GET_USER_SKILL_ERROR',
  name,
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
        dispatch(errorUserSkill('skill', err));
      });
  };
};

export const addNewSkills = skill => {
  console.log(skill);
  return async dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/insertUserSkills',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { skill }
    })
      .then(response => {
        // set ID for new skill
        const list = skill.concat();
        for (let i = 0; i < skill.length; i += 1) {
          list[i].ID = response.data[i];
        }
        dispatch({
          type: 'ADD_NEW_SKILL_SUCCESS',
          value: list
        });
      })
      .catch(err => {
        dispatch(errorUserSkill('skill', err));
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
        dispatch(errorUserSkill('skill', err));
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
        if (response.statusText === 'OK') {
          dispatch({
            type: 'UPDATE_SKILL_SUCCESS',
            value: skill,
            id: skillId
          });
        }
      })
      .catch(err => {
        dispatch(errorUserSkill('skill', err));
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
        if (response.statusText === 'OK') {
          dispatch({
            type: 'DELETE_SKILL_SUCCESS',
            id
          });
        }
      })
      .catch(err => {
        dispatch(errorUserSkill('skill', err));
      });
  };
};

/* end of profile */
