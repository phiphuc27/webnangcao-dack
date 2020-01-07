import axios from 'axios';

import socket from './socket';

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

export const searchSkill = search => ({
  type: 'SEARCH_SKILL',
  search
});

// chat
export const toggleChat = () => ({
  type: 'TOGGLE_CHAT'
});

export const openChat = () => ({
  type: 'OPEN_CHAT'
});

export const closeChat = () => ({
  type: 'CLOSE_CHAT'
});

export const startGetChat = {
  type: 'START_GET_CHAT'
};

export const successGetChat = value => ({
  type: 'SUCCESS_GET_CHAT',
  value
});

export const errorGetChat = error => ({
  type: 'ERROR_GET_CHAT',
  error
});

export const addOneChat = value => ({
  type: 'SUCCESS_GET_ONE_MESSAGE',
  value
});

export const getChatHistory = (userID, tutorID) => {
  return async dispatch => {
    await dispatch(startGetChat);
    const token = window.sessionStorage.getItem('jwtToken');
    await axios({
      method: 'post',
      url: '/users/chat/get',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: { id: tutorID }
    })
      .then(response => {
        const value = {
          ...response.data,
          socket: socket(userID, tutorID, value => dispatch(addOneChat(value)))
        };
        // console.log(value.socket);
        dispatch(successGetChat(value));
      })
      .catch(err => {
        dispatch(errorGetChat(err));
      });
  };
};

// end chat
