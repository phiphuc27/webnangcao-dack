import { combineReducers } from 'redux';
import user from './user';
import tutor from './tutor';
import contract from './contract';
import chat from './Chat';

const allReducer = combineReducers({
  user,
  tutor,
  contract,
  chat
});

const rootReducer = (state, action) => {
  let newState = { ...state };
  if (action.type === 'LOG_OUT') newState = undefined;
  return allReducer(newState, action);
};

export default rootReducer;
