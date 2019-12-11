import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Profile from '../Components/Pages/Profile';
import { editProfile, uploadPhoto } from '../Actions/user';

const mapStateToProps = state => ({
  isLoading: state.user.fetching,
  isFetched: state.user.fetched,
  error: state.user.error,
  user: state.user.user,
  profile: state.user.profile
});
const mapDispatchToProps = dispatch => ({
  handleProfileChange: data => {
    dispatch(editProfile(data));
  },
  handlePhotoChange: file => {
    const formData = new FormData();
    formData.append('file', file);
    dispatch(uploadPhoto(formData));
  }
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
