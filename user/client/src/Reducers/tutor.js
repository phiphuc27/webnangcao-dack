const registerState = {
  fetching: false,
  fetched: false,
  error: '',
  tutors: []
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
      return { ...state, fetching: false, fetched: true, tutors: action.tutor };
    }
    case 'ERROR_GET_DATA': {
      return { ...state, fetching: false, fetched: false, error: action.error };
    }

    case 'SORT_TUTOR': {
      switch (action.name) {
        case 'NAME_DESC': {
          let tmpTutors = [...state.tutors];
          tmpTutors = tmpTutors.sort((a, b) => a.TEN.localeCompare(b.TEN));
          return { ...state, tutors: tmpTutors };
        }

        case 'NAME_ASC': {
          let tmpTutors = [...state.tutors];
          tmpTutors = tmpTutors.sort((a, b) => b.TEN.localeCompare(a.TEN));
          return { ...state, tutors: tmpTutors };
        }

        case 'PRICE_ASC': {
          let tmpTutors = [...state.tutors];
          tmpTutors = tmpTutors.sort((a, b) => a.GIA - b.GIA);
          return { ...state, tutors: tmpTutors };
        }

        case 'PRICE_DESC': {
          let tmpTutors = [...state.tutors];
          tmpTutors = tmpTutors.sort((a, b) => b.GIA - a.GIA);
          return { ...state, tutors: tmpTutors };
        }

        default: {
          return state;
        }
      }
    }

    default:
      return state;
  }
};

export default tutorManagement;
