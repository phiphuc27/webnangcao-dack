const InitialState = {
  fetching: false,
  fetched: false,
  error: '',
  skills: null,
  pagination: null
};

const Skill = (state = InitialState, action) => {
  switch (action.type) {
    case 'GET_SKILL_START': {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: ''
      };
    }
    case 'GET_SKILL_SUCCESS': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        skills: action.value.list,
        pagination: action.value.pagination
      };
    }
    case 'GET_SKILL_ERROR': {
      return { ...state, fetching: false, fetched: false, error: action.error };
    }
    case 'NEW_SKILL_SUCCESS': {
      return {
        ...state,
        skills: state.skills ? state.skills.concat(action.value) : state.skills
      };
    }
    case 'UPDATE_SKILL_SUCCESS': {
      return {
        ...state,
        skills: state.skills
          ? state.skills.map(skill =>
              skill.ID === action.id
                ? { ...skill, KYNANG: action.value }
                : skill
            )
          : state.skills
      };
    }
    case 'DELETE_SKILL_SUCCESS': {
      var i = 0;
      for (i = 0; i < state.skills.length; i++) {
        if (state.skills[i].ID === action.id) break;
      }
      return {
        ...state,
        fetching: false,
        fetched: false,
        skills: [...state.skills.slice(0, i), ...state.skills.slice(i + 1)]
      };
    }
    default:
      return state;
  }
};

export default Skill;
