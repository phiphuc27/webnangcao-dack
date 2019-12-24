const contractState = {
  fetching: false,
  fetched: false,
  error: '',
  request: {
    all: null,
    sent: null,
    accepted: null
  },
  contract: {
    all: null,
    onGoing: null,
    paid: null
  }
};

const contractManagement = (state = contractState, action) => {
  switch (action.type) {
    case 'REQUEST_START': {
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: ''
      };
    }

    case 'REQUEST_SUCCESS': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: ''
      };
    }

    case 'GET_REQUEST_SUCCESS': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: '',
        request: {
          ...state.request,
          all: action.request,
          sent: action.request.filter(item => item.TRANGTHAI === 0),
          accepted: action.request.filter(item => item.TRANGTHAI === 1)
        }
      };
    }

    case 'GET_CONTRACT_SUCCESS': {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: '',
        contract: {
          ...state.contract,
          all: action.contract,
          onGoing: action.contract.filter(item => item.TRANGTHAI === 0),
          paid: action.contract.filter(item => item.TRANGTHAI === 2)
        }
      };
    }

    case 'REQUEST_ERROR': {
      return { ...state, fetching: false, fetched: false, error: action.error };
    }

    default:
      return state;
  }
};

export default contractManagement;
