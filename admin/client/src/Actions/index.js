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
        console.log(response);
        window.sessionStorage.setItem('jwtToken', response.data.token);
        // console.log(response.data.token);
        dispatch(successLogin(response.data.user));
      })
      .catch(err => {
        window.sessionStorage.removeItem('jwtToken');
        dispatch(
          errorLogin(
            err ? (err.response ? err.response.data : err.response) : err
          )
        );
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

export const getUserList = page => {
  return async dispatch => {
    await dispatch(startGetList);
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/getUserList',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { npp: 5, page: page }
    })
      .then(response => {
        // console.log(response);
        dispatch(successGetList(response.data));
      })
      .catch(err => {
        dispatch(errorGetList(err.response.data));
      });
  };
};

export const successChangeStatus = (id, status) => ({
  type: 'CHANGE_STATUS_SUCCESS',
  id,
  status
});

export const errorChangeStatus = error => ({
  type: 'CHANGE_STATUS_ERROR',
  error
});

export const lockAccount = id => {
  return async dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/lock',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { id }
    })
      .then(response => {
        // console.log(response);
        dispatch(successChangeStatus(id, 1));
      })
      .catch(err => {
        dispatch(errorChangeStatus(err.response.data));
      });
  };
};

export const unlockAccount = id => {
  return async dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/unlock',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { id }
    })
      .then(response => {
        // console.log(response);
        dispatch(successChangeStatus(id, 0));
      })
      .catch(err => {
        dispatch(errorChangeStatus(err.response.data));
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

export const errorNewUserSkill = error => ({
  type: 'NEW_USER_SKILL_ERROR',
  error
});

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
        const data = {
          ID: response.data.newId,
          IDND: id,
          KYNANG: skill,
          IDKN: response.data.newId
        };
        dispatch({
          type: 'ADD_NEW_SKILL_SUCCESS',
          value: data
        });
      })
      .catch(err => {
        dispatch(errorNewUserSkill(err.response.data));
      });
  };
};

export const deleteUserSkill = (idkn, idnd) => {
  return async dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/deleteUserSkill',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { idkn, idnd }
    })
      .then(response => {
        dispatch({
          type: 'DELETE_USER_SKILL_SUCCESS',
          id: idkn
        });
      })
      .catch(err => {
        dispatch(errorNewUserSkill(err.response.data));
      });
  };
};

/* End User profile */

/* Manage skill */

export const startGetSkill = {
  type: 'GET_SKILL_START'
};

export const successGetSkill = value => ({
  type: 'GET_SKILL_SUCCESS',
  value
});

export const errorGetSkill = error => ({
  type: 'GET_SKILL_ERROR',
  error
});

export const getSkill = page => {
  return async dispatch => {
    await dispatch(startGetSkill);
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/getSkillList',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { npp: 10, page: page }
    })
      .then(response => {
        // console.log(response);
        dispatch(successGetSkill(response.data));
      })
      .catch(err => {
        dispatch(errorGetSkill(err.response.data));
      });
  };
};

export const errorEditSkill = error => ({
  type: 'EDIT_SKILL_ERROR',
  error
});

export const newSkill = skill => {
  return async dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/insertSkill',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { skill }
    })
      .then(response => {
        const data = {
          ID: response.data.insertId,
          KYNANG: skill
        };
        dispatch({
          type: 'NEW_SKILL_SUCCESS',
          value: data
        });
      })
      .catch(err => {
        dispatch(errorEditSkill(err.response.data));
      });
  };
};

export const updateSkill = (skill, skillId) => {
  return async dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/updateSkill',
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
        dispatch(errorEditSkill(err.response.data));
      });
  };
};

export const deleteSkill = id => {
  return async dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/deleteSkill',
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
        dispatch(errorEditSkill(err.response.data));
      });
  };
};

/* End manage skill */

/* contract */

export const startGetContract = {
  type: 'GET_CONTRACT_START'
};

export const successGetContract = value => ({
  type: 'GET_CONTRACT_SUCCESS',
  value
});

export const errorGetContract = error => ({
  type: 'GET_CONTRACT_ERROR',
  error
});

export const getContractList = page => {
  return async dispatch => {
    await dispatch(startGetContract);
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/contract/getList',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { npp: 5, page: page }
    })
      .then(response => {
        // console.log(response);
        dispatch(successGetContract(response.data));
      })
      .catch(err => {
        dispatch(errorGetContract(err.response.data));
      });
  };
};

/* End contract */

/* complain */

export const startGetComplain = {
  type: 'GET_COMPLAIN_START'
};

export const successGetComplain = value => ({
  type: 'GET_COMPLAIN_SUCCESS',
  value
});

export const errorGetComplain = error => ({
  type: 'GET_COMPLAIN_ERROR',
  error
});

export const getComplainList = page => {
  return async dispatch => {
    await dispatch(startGetComplain);
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/complain/getList',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { npp: 5, page: page }
    })
      .then(response => {
        // console.log(response);
        dispatch(successGetComplain(response.data));
      })
      .catch(err => {
        dispatch(errorGetComplain(err.response.data));
      });
  };
};

export const errorEditComplain = error => ({
  type: 'EDIT_COMPLAIN_ERROR',
  error
});

export const updateComplainStatus = (id, status) => {
  return async dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/complain/updateStatus',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { id, status }
    })
      .then(response => {
        dispatch({
          type: 'UPDATE_COMPLAIN_SUCCESS',
          id,
          status
        });
      })
      .catch(err => {
        dispatch(errorEditComplain(err.response.data));
      });
  };
};

/* End complain */

/* revenue */

export const startGetRevenue = {
  type: 'GET_REVENUE_START'
};

export const successGetRevenue = value => ({
  type: 'GET_REVENUE_SUCCESS',
  value
});

export const errorGetRevenue = error => ({
  type: 'GET_REVENUE_ERROR',
  error
});

export const getRevenue = id => {
  return async dispatch => {
    await dispatch(startGetRevenue);
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/contract/getAll',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { id }
    })
      .then(response => {
        // console.log(response);
        dispatch(successGetRevenue({ id, contract: response.data }));
      })
      .catch(err => {
        dispatch(errorGetRevenue(err.response.data));
      });
  };
};

/* End contract */

/* top revenue */

export const startGetTopRevenue = {
  type: 'GET_TOP_REVENUE_START'
};

export const successGetTopRevenue = value => ({
  type: 'GET_TOP_REVENUE_SUCCESS',
  value
});

export const errorGetTopRevenue = error => ({
  type: 'GET_TOP_REVENUE_ERROR',
  error
});

export const getTopRevenue = (type, by) => {
  return async dispatch => {
    await dispatch(startGetTopRevenue);
    const token = window.sessionStorage.getItem('jwtToken');

    await axios({
      method: 'post',
      url: '/users/topRevenue',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { type, by }
    })
      .then(response => {
        // console.log(response);
        dispatch(successGetTopRevenue({ list: response.data, type, by }));
      })
      .catch(err => {
        dispatch(errorGetTopRevenue(err.response.data));
      });
  };
};

/* end top revenue */
