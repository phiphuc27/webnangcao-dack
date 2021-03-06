import { combineReducers } from 'redux';
import user from './user';
import userList from './userList';
import profile from './profile';
import skill from './Skill';
import contract from './contract';
import complain from './complain';
import topRevenue from './topRevenue';

const allReducer = combineReducers({
  user,
  userList,
  profile,
  skill,
  contract,
  complain,
  topRevenue
});

const rootReducer = (state, action) => {
  let newState = { ...state };
  if (action.type === 'LOG_OUT') newState = undefined;
  return allReducer(newState, action);
};

export default rootReducer;
