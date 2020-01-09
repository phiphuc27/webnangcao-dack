import { connect } from 'react-redux';
import Skill from '../Components/Pages/Skill';
import { getSkill, updateSkill, deleteSkill, newSkill } from '../Actions';

const mapStateToProps = state => ({
  isFetching: state.skill.fetching,
  isFetched: state.skill.fetched,
  error: state.skill.error,
  skills: state.skill.skills,
  pagination: state.skill.pagination
});
const mapDispatchToProps = dispatch => ({
  getSkill: page => dispatch(getSkill(page)),
  newSkill: skill => dispatch(newSkill(skill)),
  updateSkill: (skill, skillId) => dispatch(updateSkill(skill, skillId)),
  deleteSkill: id => dispatch(deleteSkill(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(Skill);
