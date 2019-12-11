const registerState = {
  fetching: false,
  fetched: false,
  loggedIn: false,
  error: '',
  user: null,
  skill: null,
  profile: {
    fetching: false,
    fetched: false,
    user: null,
    error: {
      profile: '',
      photo: ''
    }
  }
};

const accountManagement = (state = registerState, action) => {
  switch (action.type) {
    case 'REGISTER_START': {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: ''
      };
    }
    case 'REGISTER_SUCCESS': {
      return { ...state, fetching: false, fetched: true };
    }
    case 'REGISTER_ERROR': {
      return { ...state, fetching: false, fetched: false, error: action.error };
    }

    case 'LOGIN_START': {
      return {
        ...state,
        fetching: true,
        loggedIn: false,
        error: ''
      };
    }

    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        fetching: false,
        loggedIn: true,
        error: null,
        user: action.user
      };
    }

    case 'LOGIN_ERROR': {
      return {
        ...state,
        fetching: false,
        loggedIn: false,
        error: action.error
      };
    }

    case 'RESET_TOKEN': {
      return {
        ...state,
        user: '',
        error: '',
        fetching: false
      };
    }
    case 'EDIT_START': {
      return {
        ...state,
        profile: {
          ...state.profile,
          fetching: true,
          fetched: false,
          error: {
            profile: '',
            photo: ''
          }
        }
      };
    }

    case 'EDIT_SUCCESS': {
      return {
        ...state,
        user: { ...state.user, ...action.data },
        profile: {
          ...state.profile,
          fetching: false,
          fetched: true,
          error: {
            profile: '',
            photo: ''
          }
        }
      };
    }

    case 'EDIT_ERROR': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: { ...state.error, [action.name]: action.error }
      };
    }

    case 'GET_START': {
      return {
        ...state,
        profile: {
          ...state.profile,
          fetching: true,
          fetched: false,
          error: {
            profile: '',
            photo: ''
          }
        }
      };
    }

    case 'GET_SUCCESS': {
      return {
        ...state,
        profile: {
          ...state.profile,
          fetching: false,
          fetched: true,
          user: action.value,
          error: {
            profile: '',
            photo: ''
          }
        }
      };
    }

    case 'GET_USER_SKILL_START': {
      return {
        ...state,
        profile: {
          ...state.profile,
          fetching: true,
          fetched: false,
          error: {
            profile: '',
            photo: ''
          }
        }
      };
    }
    case 'GET_USER_SKILL_SUCCESS': {
      return {
        ...state,
        skill: action.value,
        profile: {
          ...state.profile,
          fetching: false,
          fetched: true,
          error: {
            profile: '',
            photo: ''
          }
        }
      };
    }
    case 'GET_USER_SKILL_ERROR': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: { ...state.error, [action.name]: action.error }
      };
    }
    case 'ADD_NEW_SKILL_SUCCESS': {
      return {
        ...state,
        skill: state.skill ? state.skill.concat(action.value) : state.skill
      };
    }
    case 'UPDATE_SKILL_SUCCESS': {
      return {
        ...state,
        skill: state.skill
          ? state.skill.map(skill =>
              skill.ID === action.id ? { ...skill, KYNANG: action.value } : skill
            )
          : state.skill
      };
    }
    case 'DELETE_SKILL_SUCCESS': {
      let i = 0;
      for (i = 0; i < state.skill.length; i++) {
        if (state.skill[i].ID === action.id) break;
      }
      return {
        ...state,
        fetching: false,
        fetched: false,
        skill: [...state.skill.slice(0, i), ...state.skill.slice(i + 1)]
      };
    }
    default:
      return state;
  }
};

export default accountManagement;
