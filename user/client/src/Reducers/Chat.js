const InitialState = {
  fetching: false,
  fetched: false,
  error: '',
  isOpen: false,
  receiver: null,
  history: [],
  socket: null,
  notification: {
    list: [],
    fetching: false,
    fetched: false,
    error: ''
  }
};

const Chat = (state = InitialState, action) => {
  switch (action.type) {
    case 'START_GET_CHAT': {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: ''
      };
    }

    case 'SUCCESS_GET_CHAT': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        receiver: action.value.receiver,
        history: action.value.history,
        socket: action.value.socket
      };
    }

    case 'TOOGLE_CHAT': {
      return {
        ...state,
        isOpen: !state.isOpen
      };
    }

    case 'OPEN_CHAT': {
      return {
        ...state,
        isOpen: true
      };
    }

    case 'CLOSE_CHAT': {
      return InitialState;
    }

    case 'SUCCESS_GET_ONE_MESSAGE': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        history: state.history ? state.history.concat(action.value) : state.history
      };
    }

    case 'ERROR_GET_CHAT': {
      return { ...state, fetching: false, fetched: false, error: action.error };
    }

    case 'GET_CHAT_NOTIFICATION_START': {
      return {
        ...state,
        notification: {
          ...state.notification,
          fetching: true,
          fetched: false,
          error: ''
        }
      };
    }

    case 'GET_CHAT_NOTIFICATION_SUCCESS': {
      return {
        ...state,
        notification: {
          ...state.notification,
          fetching: false,
          fetched: true,
          list: action.value
        }
      };
    }

    case 'GET_CHAT_NOTIFICATION_ERROR': {
      return {
        ...state,
        notification: {
          ...state.notification,
          fetching: false,
          fetched: false,
          error: action.error
        }
      };
    }

    default:
      return state;
  }
};

export default Chat;
