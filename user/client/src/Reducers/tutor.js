const tutorState = {
  fetching: false,
  fetched: false,
  error: '',
  skills: [],
  tutor: {},
  tutors: [],
  sortTutors: [],
  sortSkill: []
};

const tutorManagement = (state = tutorState, action) => {
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
      return {
        ...state,
        fetching: false,
        fetched: true,
        tutors: action.tutor,
        sortTutors: action.tutor
      };
    }

    case 'SUCCESS_GET_SKILLS': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        skills: action.skills,
        sortSkill: action.skills
      };
    }

    case 'ERROR_GET_DATA': {
      return { ...state, fetching: false, fetched: false, error: action.error };
    }

    case 'SORT_TUTOR': {
      switch (action.name) {
        case 'NAME_DESC': {
          let tmpTutors = [...state.tutors];
          tmpTutors = tmpTutors.sort((a, b) => a.TEN.localeCompare(b.TEN));
          return { ...state, sortTutors: tmpTutors };
        }

        case 'NAME_ASC': {
          let tmpTutors = [...state.tutors];
          tmpTutors = tmpTutors.sort((a, b) => b.TEN.localeCompare(a.TEN));
          return { ...state, sortTutors: tmpTutors };
        }

        case 'PRICE_ASC': {
          let tmpTutors = [...state.tutors];
          tmpTutors = tmpTutors.sort((a, b) => a.GIA - b.GIA);
          return { ...state, sortTutors: tmpTutors };
        }

        case 'PRICE_DESC': {
          let tmpTutors = [...state.tutors];
          tmpTutors = tmpTutors.sort((a, b) => b.GIA - a.GIA);
          return { ...state, sortTutors: tmpTutors };
        }

        default: {
          return state;
        }
      }
    }

    case 'FILTER_TUTOR': {
      switch (action.name) {
        case 'CITY': {
          let tmpTutors = [...state.tutors];
          tmpTutors = tmpTutors.filter(tutor => tutor.THANHPHO === action.filter);
          return { ...state, sortTutors: tmpTutors };
        }

        case 'SKILL': {
          let tmpTutors = [...state.tutors];
          tmpTutors = tmpTutors.filter(tutor =>
            tutor.KYNANG.find(skill => skill.KYNANG === action.filter)
          );
          return { ...state, sortTutors: tmpTutors };
        }

        case 'PRICE': {
          let tmpTutors = [...state.tutors];
          tmpTutors = tmpTutors.filter(
            tutor => tutor.GIA >= action.filter[0] && tutor.GIA <= action.filter[1]
          );
          return { ...state, sortTutors: tmpTutors };
        }

        default: {
          return state;
        }
      }
    }

    case 'SEARCH_SKILL': {
      let tmpSkill = [...state.skills];
      tmpSkill = tmpSkill.filter(skill => skill.KYNANG.includes(action.search));
      return { ...state, sortSkill: tmpSkill };
    }

    default:
      return state;
  }
};

export default tutorManagement;
