import axios from 'axios';

export const startGetData = {
  type: 'START_GET_DATA'
};

export const successGetData = tutor => ({
  type: 'SUCCESS_GET_DATA',
  tutor
});

export const errorGetData = error => ({
  type: 'ERROR_GET_DATA',
  error
});

export const getAllTutors = () => {
  return dispatch => {
    dispatch(startGetData);
    axios({
      method: 'get',
      url: '/tutor'
    })
      .then(() => {
        dispatch(successGetData);
      })
      .catch(err => {
        dispatch(errorGetData(err.response.data));
      });
  };
};
