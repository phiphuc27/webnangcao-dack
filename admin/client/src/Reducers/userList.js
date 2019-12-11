const InitialState = {
  fetching: false,
  fetched: false,
  error: '',
  userList: null
};

const UserList = (state = InitialState, action) => {
  switch (action.type) {
    case 'GET_LIST_START': {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: ''
      };
    }
    case 'GET_LIST_SUCCESS': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        userList: action.value
      };
    }
    case 'GET_LIST_ERROR': {
      return { ...state, fetching: false, fetched: false, error: action.error };
    }
    default:
      return state;
  }
};

export default UserList;
