import axios from 'axios';

export const startGetData = {
  type: 'START_GET_DATA'
};

export const successGetData = tutor => ({
  type: 'SUCCESS_GET_DATA',
  tutor
});

export const successGetOneData = tutor => ({
  type: 'SUCCESS_GET_ONE_DATA',
  tutor
});

export const successGetSkills = skills => ({
  type: 'SUCCESS_GET_SKILLS',
  skills
});

export const errorGetData = error => ({
  type: 'ERROR_GET_DATA',
  error
});

export const getAllSkills = () => {
  return dispatch => {
    console.log('get skills');
    dispatch(startGetData);
    axios({
      method: 'get',
      url: '/skills'
    })
      .then(response => {
        dispatch(successGetSkills(response.data.skills));
      })
      .catch(err => {
        dispatch(errorGetData(err));
      });
  };
};

export const getAllTutors = () => {
  return dispatch => {
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
    dispatch(startGetData);
    axios({
      method: 'get',
      url: `/tutors/${data}`
    })
      .then(response => {
        dispatch(successGetOneData(response.data.tutor));
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

export const filterTutor = (name, filter) => ({
  type: 'FILTER_TUTOR',
  name,
  filter
});

export const searchTutor = search => ({
  type: 'SEARCH_TUTOR',
  search
});
