const registerState = {
  fetching: false,
  fetched: false,
  error: '',
  tutor: [
    {
      ID: 1,
      TEN: 'A',
      HO: 'B',
      DIACHI: 'C',
      GIOITINH: 'D',
      AVATARURL: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
    },
    {
      ID: 2,
      TEN: 'AA',
      HO: 'BB',
      DIACHI: 'CC',
      GIOITINH: 'DD',
      AVATARURL: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
    }
  ]
};

const tutorManagement = (state = registerState, action) => {
  switch (action.type) {
    case 'START_GET_DATA': {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: ''
      };
    }
    case 'SUCCESS_GET_DATA': {
      return { ...state, fetching: false, fetched: true, tutor: action.tutor };
    }
    case 'ERROR_GET_DATA': {
      return { ...state, fetching: false, fetched: false, error: action.error };
    }

    default:
      return state;
  }
};

export default tutorManagement;
