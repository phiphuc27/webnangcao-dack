import axios from 'axios';

export const startRequest = {
  type: 'REQUEST_START'
};

export const successRequest = {
  type: 'REQUEST_SUCCESS'
};

export const successContract = {
  type: 'CONTRACT_SUCCESS'
};

export const successGetRequest = request => ({
  type: 'GET_REQUEST_SUCCESS',
  request
});

export const successGetContract = contract => ({
  type: 'GET_CONTRACT_SUCCESS',
  contract
});

export const errorRequest = error => ({
  type: 'REQUEST_ERROR',
  error
});

export const sendRequest = data => {
  return dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');
    dispatch(startRequest);
    axios({
      method: 'post',
      url: '/users/registerTutor/register',
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        dispatch(successRequest);
      })
      .catch(err => {
        dispatch(errorRequest(err.response.data));
      });
  };
};

export const acceptRequest = data => {
  return dispatch => {
    dispatch(startRequest);
    axios({
      method: 'post',
      url: '/tutors/contract/accept',
      data
    })
      .then(() => {
        dispatch(successRequest);
      })
      .catch(err => {
        dispatch(errorRequest(err.response.data));
      });
  };
};

export const declineRequest = data => {
  return dispatch => {
    dispatch(startRequest);
    axios({
      method: 'post',
      url: '/tutors/registerTutor/update',
      data
    })
      .then(() => {
        dispatch(successRequest);
      })
      .catch(err => {
        dispatch(errorRequest(err.response.data));
      });
  };
};

export const getTutorRequest = id => {
  return dispatch => {
    dispatch(startRequest);
    axios({
      method: 'post',
      url: '/tutors/registerTutor/getList',
      data: { id }
    })
      .then(res => {
        dispatch(successGetRequest(res.data));
      })
      .catch(err => {
        dispatch(errorRequest(err.response.data));
      });
  };
};

export const getTutorContract = id => {
  return dispatch => {
    dispatch(startRequest);
    axios({
      method: 'post',
      url: '/tutors/contract/getList',
      data: { id }
    })
      .then(res => {
        dispatch(successGetContract(res.data));
      })
      .catch(err => {
        dispatch(errorRequest(err.response.data));
      });
  };
};

export const getStudentRequest = id => {
  return dispatch => {
    dispatch(startRequest);
    const token = window.sessionStorage.getItem('jwtToken');
    axios({
      method: 'post',
      url: '/users/registerTutor/getList',
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        dispatch(successGetRequest(res.data));
      })
      .catch(err => {
        dispatch(errorRequest(err.response.data));
      });
  };
};

export const getStudentContract = id => {
  return dispatch => {
    dispatch(startRequest);
    const token = window.sessionStorage.getItem('jwtToken');
    axios({
      method: 'post',
      url: '/users/contract/getList',
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        dispatch(successGetContract(res.data));
      })
      .catch(err => {
        dispatch(errorRequest(err.response.data));
      });
  };
};

export const finishContract = data => {
  return dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');
    dispatch(startRequest);
    axios({
      method: 'post',
      url: '/users/contract/update',
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        dispatch(successContract);
      })
      .catch(err => {
        dispatch(errorRequest(err.response.data));
      });
  };
};

/**
 * data= {
 *  IDND,
 *  IDNH,
 *  DANHGIA,
 *  NOIDUNG
 * } */
export const sendReview = data => {
  return dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');
    dispatch(startRequest);
    axios({
      method: 'post',
      url: '/users/review/send',
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        dispatch(successRequest);
      })
      .catch(err => {
        dispatch(errorRequest(err.response.data));
      });
  };
};

/**
 * data= {
 *  IDND,
 *  IDNH,
 *  TIEUDE,
 *  NOIDUNG
 * } */
export const sendRefund = data => {
  return dispatch => {
    const token = window.sessionStorage.getItem('jwtToken');
    dispatch(startRequest);
    axios({
      method: 'post',
      url: '/users/refund/send',
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        dispatch(successRequest);
      })
      .catch(err => {
        dispatch(errorRequest(err.response.data));
      });
  };
};
