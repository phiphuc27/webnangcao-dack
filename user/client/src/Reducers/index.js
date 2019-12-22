import { combineReducers } from 'redux';
import user from './user';
import tutor from './tutor';
import contract from './contract';

const allReducer = combineReducers({
  user,
  tutor,
  contract
});

const rootReducer = (state, action) => {
  let newState = { ...state };
  if (action.type === 'LOG_OUT') newState = undefined;
  return allReducer(newState, action);
};

export default rootReducer;
