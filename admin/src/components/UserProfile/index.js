import UserProfile from './UserProfile';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(UserProfile);
