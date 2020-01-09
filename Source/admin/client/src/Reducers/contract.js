const InitialState = {
  fetching: false,
  fetched: false,
  error: '',
  list: null,
  pagination: null,
  revenue: {
    fetching: false,
    fetched: false,
    error: '',
    contract: null,
    userID: null
  }
};

const UserList = (state = InitialState, action) => {
  switch (action.type) {
    case 'GET_CONTRACT_START': {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: ''
      };
    }
    case 'GET_CONTRACT_SUCCESS': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        list: action.value.list,
        pagination: action.value.pagination
      };
    }
    case 'GET_CONTRACT_ERROR': {
      return { ...state, fetching: false, fetched: false, error: action.error };
    }
    case 'GET_REVENUE_START': {
      return {
        ...state,
        revenue: {
          ...state.revenue,
          fetching: true,
          fetched: false,
          error: ''
        }
      };
    }
    case 'GET_REVENUE_SUCCESS': {
      return {
        ...state,
        revenue: {
          ...state.revenue,
          fetching: false,
          fetched: true,
          contract: action.value.contract,
          userID: action.value.id
        }
      };
    }
    case 'GET_REVENUE_ERROR': {
      return {
        ...state,
        revenue: {
          ...state.revenue,
          fetching: false,
          fetched: false,
          error: action.error
        }
      };
    }
    case 'EDIT_CONTRACT_ERROR': {
      return { ...state, error: action.error };
    }
    case 'UPDATE_CONTRACT_SUCCESS': {
      return {
        ...state,
        list: state.list
          ? state.list.map(item =>
              item.ID === action.id
                ? { ...item, TRANGTHAI: action.status }
                : item
            )
          : state.list
      };
    }
    default:
      return state;
  }
};

export default UserList;
