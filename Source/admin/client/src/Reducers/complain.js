const InitialState = {
  fetching: false,
  fetched: false,
  error: '',
  list: null,
  pagination: null
};

const UserList = (state = InitialState, action) => {
  switch (action.type) {
    case 'GET_COMPLAIN_START': {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: ''
      };
    }
    case 'GET_COMPLAIN_SUCCESS': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        list: action.value.list,
        pagination: action.value.pagination
      };
    }
    case 'UPDATE_COMPLAIN_SUCCESS': {
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
    case 'GET_COMPLAIN_ERROR': {
      return { ...state, fetching: false, fetched: false, error: action.error };
    }
    case 'EDIT_COMPLAIN_ERROR': {
      return { ...state, error: action.error };
    }
    default:
      return state;
  }
};

export default UserList;
