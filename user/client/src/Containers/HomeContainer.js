import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Home from '../Components/Pages/Home';
import { getAllTutors } from '../Actions/tutor';

const mapStateToProps = state => ({
  isFetching: state.tutor.fetching,
  isFetched: state.tutor.fetched,
  error: state.tutor.error,
  tutors: state.tutor.tutor
});
const mapDispatchToProps = dispatch => ({
  getAllTutors: () => dispatch(getAllTutors)
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
