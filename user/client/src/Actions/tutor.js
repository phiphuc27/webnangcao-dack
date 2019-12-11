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
    console.log('get tutors');
    dispatch(startGetData);
    axios({
      method: 'get',
      url: '/tutors'
    })
      .then(response => {
        dispatch(successGetData(response.data.tutors));
      })
      .catch(err => {
        dispatch(errorGetData(err));
      });
  };
};

export const getTutorById = data => {
  return dispatch => {
    console.log('get tutors');
    dispatch(startGetData);
    console.log(data);
    axios({
      method: 'get',
      url: `/tutors/${data}`
    })
      .then(response => {
        dispatch(successGetData(response.data.tutor));
      })
      .catch(err => {
        dispatch(errorGetData(err));
      });
  };
};

export const sortTutor = name => ({
  type: 'SORT_TUTOR',
  name
});
