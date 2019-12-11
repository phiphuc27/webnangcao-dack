const InitialState = {
  fetching: false,
  fetched: false,
  error: '',
  user: null,
  skill: null
};

const UserList = (state = InitialState, action) => {
  switch (action.type) {
    case 'GET_USER_PROFILE_START': {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: ''
      };
    }
    case 'GET_USER_PROFILE_SUCCESS': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.value
      };
    }
    case 'GET_USER_PROFILE_ERROR': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error,
        user: 'Not Found'
      };
    }
    case 'GET_USER_SKILL_START': {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: ''
      };
    }
    case 'GET_USER_SKILL_SUCCESS': {
      return {
        ...state,
        skill: action.value
      };
    }
    case 'GET_USER_SKILL_ERROR': {
      return { ...state, fetching: false, fetched: false, error: action.error };
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
              skill.ID === action.id
                ? { ...skill, KYNANG: action.value }
                : skill
            )
          : state.skill
      };
    }
    case 'DELETE_SKILL_SUCCESS': {
      var i = 0;
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

export default UserList;
