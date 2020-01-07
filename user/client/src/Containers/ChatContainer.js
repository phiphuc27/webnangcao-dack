import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Chat from '../Components/Pages/Chat';
import { closeChat } from '../Actions/tutor';

const mapStateToProps = state => ({
  isLoading: state.chat.fetching,
  isFetched: state.chat.fetched,
  error: state.chat.error,
  user: state.user.user,
  receiver: state.chat.receiver,
  history: state.chat.history,
  socket: state.chat.socket
});
const mapDispatchToProps = dispatch => ({
  close: () => dispatch(closeChat())
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));
