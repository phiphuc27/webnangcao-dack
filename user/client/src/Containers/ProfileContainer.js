/* eslint-disable no-self-assign */
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Profile from '../Components/Pages/Profile';
import {
  editProfile,
  uploadPhoto,
  getUserSkill,
  updateSkill,
  deleteSkill,
  addNewSkills
} from '../Actions/user';

const mapStateToProps = state => ({
  isLoading: state.user.fetching,
  isFetched: state.user.fetched,
  error: state.user.error,
  user: state.user.user,
  profile: state.user.profile,
  skill: state.user.skill
});
const mapDispatchToProps = dispatch => ({
  handleProfileChange: data => {
    dispatch(editProfile(data));
  },
  handlePhotoChange: file => {
    const formData = new FormData();
    formData.append('file', file);
    dispatch(uploadPhoto(formData));
  },
  getUserSkill: id => {
    dispatch(getUserSkill(id));
  },
  handleAddNewSkill: skill => dispatch(addNewSkills(skill)),
  updateSkill: (skill, skillId) => dispatch(updateSkill(skill, skillId)),
  deleteSkill: id => {
    dispatch(deleteSkill(id));
    window.location = window.location;
  }
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
