const InitialState = {
  fetching: false,
  fetched: false,
  error: '',
  list: null,
  type: 'month', // or year
  by: 'tutor' // or skill
};

const TopRevenue = (state = InitialState, action) => {
  switch (action.type) {
    case 'GET_TOP_REVENUE_START': {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: ''
      };
    }
    case 'GET_TOP_REVENUE_SUCCESS': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        list: action.value.list,
        type: action.value.type,
        by: action.value.by
      };
    }
    case 'GET_TOP_REVENUE_ERROR': {
      return { ...state, fetching: false, fetched: false, error: action.error };
    }
    default:
      return state;
  }
};

export default TopRevenue;
