import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Profile from '../Components/Pages/UserProfile';
import {
  login,
  getUserProfile,
  addNewSkill,
  updateSkill,
  deleteSkill
} from '../Actions';

const mapStateToProps = state => ({
  isFetching: state.profile.fetching,
  isFetched: state.profile.fetched,
  error: state.profile.error,
  user: state.profile.user,
  skill: state.profile.skill
});
const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data)),
  getProfile: id => dispatch(getUserProfile(id)),
  updateSkill: (skill, skillId) => dispatch(updateSkill(skill, skillId)),
  addNewSkill: (id, skill) => dispatch(addNewSkill(id, skill)),
  deleteSkill: id => dispatch(deleteSkill(id))
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
