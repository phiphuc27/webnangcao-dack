const registerState = {
  fetching: false,
  fetched: false,
  loggedIn: false,
  error: '',
  user: null,
  profile: {
    fetching: false,
    fetched: false,
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

    default:
      return state;
  }
};

export default accountManagement;
